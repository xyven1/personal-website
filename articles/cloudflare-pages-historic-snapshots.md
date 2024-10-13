---
title: Using Cloudflare Pages for Historic Article Snapshots
description: A walkthrough on implementing a feature of this site providing snapshots of previous versions of an article automatically with Cloudflare Pages.
date: 2024-10-12 EST
tags:
  - cloudflare
  - typescript
  - tutorial
published: true
---
## The Motivation
When browsing the web, you may notice that an article says *"Updated on 2024/10/2"*, or something to that effect. Often, it may be as simple as an added remark placed at the bottom of the page, but it is not clear how much of the article was actually altered. If it is a more serious correction or modification, it can become much harder, or even just unsightly, to make the edits in a way that makes it clear to the reader what has changed, and so as a result, you get no indication as to what has changed (just a note that the page *was* updated).
This situation, albeit not particularly critical, is the inspiration for the history feature on this site.

The goal of a history (or "snapshot") feature is therefore to provide an ergonomic way for a reader to view exactly *how*, *when*, and *why* an article was modified, and even view the older version if desired. In this article, I will walk you through how I implemented this feature for my site (*spoiler: it only takes around 80 lines of code!*).

### The Real Motivation
While the above is all true, I would be remiss if I did not mention the *actual* reasons that I added this feature:
- I thought it would be cool and a fun challenge
- I knew that all historical versions of my site were already publicly available due to how Cloudflare pages works

## The Execution
There are two core parts of getting this all working:
1. Figuring out which commits in the repo contain changes to a specific page
2. Finding the public URLs provided by Cloudflare to those specific commits

I guess there is a third challenge as well: rendering the results ergonomically in a desktop and mobile-friendly way without any JavaScript. The no JS requirement is definitely self imposed, but I don't really believe in JS for things which are purely related to graphics.

I'll delve into the specifics of each of these challenges in the remainder of this section. On a side note: if you ever want complete source code and not just snippets, check out the [source code for this website](https://github.com/xyven1/personal-website).

### Prerequisites
This implementation of the snapshot features relies on a couple of different things relating to the Cloudflare Pages setup:
1. The site should be setup to automatically create a deployment when a new commit is created
2. We need the ability to get an API token for the page in question

Without this, the setup in this article will fail to get live links to older versions of the site, as this relies on deployment links for all relevant commits (commits where an article changes). With that noted, all the code in this article will work just fine even if this isn't the case, but the functionality will be degraded.

### Finding Commits for a File
To find commits in which a file changed, git provides a simple command
```sh
git log path/to/file
```
which outputs something like
```
commit baa9929e12dfde2463a10a438f17860e4e44fc56
Author: xyven1 <git@xyven.dev>
Date:   Sat Oct 5 04:54:07 2024 -0400

    added description of commenting to blog

commit 815048fe63d25a61de7c746bd1d556cf48d4c22e
Author: xyven1 <git@xyven.dev>
Date:   Thu Oct 3 19:15:30 2024 -0400

    update personal-website article, restyle inline code

commit 679af7c63a827e8c969b0ddf0bedbdc45cfdd3a3
Author: xyven1 <git@xyven.dev>
Date:   Fri Sep 27 02:02:55 2024 -0400

    cleanup directory and import structure
```
Now there are immediately some issues with the output of this command. First and foremost, the output contains way more information than we need, and on top of that it is formatted in a way which is not necessarily easy to parse. We can solve both of these problems in one fell swoop using the `--format` argument:
```sh /--format=format:%H%n%ad/
git log --format=format:%H%n%ad path/to/file
```
This argument is very powerful, and you should read it's [full documentation](https://git-scm.com/docs/pretty-formats) on git's website if you are interested in how it works and what it can do. For our purposes though, we just need the `%H`, `%n`, and `%ad` selectors, which give us the commit hash, a newline, and the author date respectively. The command with the format argument will now output
```
baa9929e12dfde2463a10a438f17860e4e44fc56
Sat Oct 5 04:54:07 2024 -0400
815048fe63d25a61de7c746bd1d556cf48d4c22e
Thu Oct 3 19:15:30 2024 -0400
679af7c63a827e8c969b0ddf0bedbdc45cfdd3a3
Fri Sep 27 02:02:55 2024 -0400
```
which is exactly what we need. If you wanted some more information, you could simply modify the format argument to add additional context.

There is one final issue, though, and that is that this history is incomplete: it is missing commits with changes to the file before the file was renamed. Git understands the importance of being able to track the file through renames, and provides another useful argument `--follow`
```sh /--follow/
git log --follow --format=format:%H%n%ad path/to/file
```
which gets us exactly what we want:
```
baa9929e12dfde2463a10a438f17860e4e44fc56
Sat Oct 5 04:54:07 2024 -0400
815048fe63d25a61de7c746bd1d556cf48d4c22e
Thu Oct 3 19:15:30 2024 -0400
679af7c63a827e8c969b0ddf0bedbdc45cfdd3a3
Fri Sep 27 02:02:55 2024 -0400
fce9a97c3e3068672f5ef00d726746f7085d9cbc
Mon Sep 23 20:10:36 2024 -0400
812a2c5f13dc704c9bbfb53267abdd7d55b4a795
Fri Dec 8 15:44:01 2023 -0500
66b4704bc378a499b5685704857a68fc55d2daa0
Sat Nov 25 18:09:12 2023 -0500
1ffaa425734dfb11ce68ec49c9d4b82c845fd740
Wed Nov 22 23:05:32 2023 -0500
5a511ff414aa9c16c775fd3f1825a6ef078f3e3f
Wed Nov 22 22:10:05 2023 -0500
```
#### Node Implementation
While these git commands work great in the terminal, we need to translate this into code which can actually run in our build process, or in other words, into Node.js. This is done quite easily by using the `exec` and `promisify` functions provided by the standard library.

```ts
import { exec as execRaw } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execRaw);

const fileName = 'articles/example.md'

const { stdout, stderr } = await exec(
    `git log --follow --format=format:%H%n%ad ${fileName}`
);
if (stderr)
    throw new Error("Git log didn't work");
```
We now have the output of the git command in `stdout`, but we need to parse this into a Typescript object:
```ts
const history = stdout
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v.length)
    .reduce((acc, line, i, arr) => {
        if (i % 2 === 0)
            acc.push({
                hash: line,
                date: arr[i + 1]
            });
        return acc;
    }, [] as { hash: string, date: string});
```
This is simply splitting the output into lines, getting rid of unneeded white space, removing empty lines, and then adding each pair of lines to a list as an object. This gives us our final result: a list of every modification to a file, including a commit hash and a date.

#### Dealing with shallow clones in CI
This is a problem that you will very rarely run into, but CI environments almost never clone the full history of a git repository. Rather, they do a shallow clone pulling only what git objects are needed to exactly generate the files at the HEAD of the branch. This saves a *ton* of time in the cloning stage of a CI pipeline for big repositories, such as monorepos. Since we do not have a huge repository, and we need to run `git log` to get the history of a file, this will not do, and so we have to fetch the history during a later stage of the CI build process. Using our `exec` function from before is a one liner:
```ts
await exec('git fetch --depth=2147483647');
```
This git command will fetch the entire git history of the current branch of the repository, allowing us to query it with `git log`. There is a new argument specifically for this, `--unshallow`, but empirical testing revealed that this did not work on the Cloudflare build server.

We only have to run this once, but we must ensure that it runs *before* any of the other git commands are called.

### Getting the URLs from Cloudflare
So now that we have the hashes of each change for a particular article, we need to fetch the deployments from Cloudflare associated with each of these changes. The end goal of this step is to provide a live link for people to view older versions of an article directly on this site, without having to look at source code on GitHub.

The basic idea here is to leverage the [Cloudflare API](https://developers.cloudflare.com/api/) to fetch all deployments, and then search for the deployment associated with a specific commit. We need to begin by fetching the deployments, which can be done in a type safe way using [Cloudflare's Typescript SDK](https://github.com/cloudflare/cloudflare-typescript). Obviously this will require an API key, which can be acquired according to [this tutorial](https://developers.cloudflare.com/pages/configuration/api/#get-an-api-token).

```ts
import Cloudflare from 'cloudflare';

const cloudflare = new Cloudflare({
	apiToken: import.meta.env.CLOUDFLARE_API_TOKEN
});

const deployments: Cloudflare.Pages.Projects.Deployment[] = [];
for (let i = 1; ; i++) {
	const page = await cloudflare.pages.projects.deployments.list(
		'personal-site',
		{ account_id: import.meta.env.CLOUDFLARE_ACCOUNT },
		{ query: { page: i } }
	);
	if (!page.result.length) break;
	deployments.push(...page.result.filter((d) => d.url));
}
```
Now I should note here that the reason for iterating through the pages like this is that there is a [hard capped limit of 25 items per page](https://community.cloudflare.com/t/pages-deployments-api-doesnt-support-per-page-query-parameter/575193/4). The Cloudflare Typescript interface also provides some tempting functions for making this iteration easy (`page.iterPages()` in particular), but these do not seem to work as the `list()` function returns a `DeploymentsSinglePage`, which has empty implementations for these functions, hence the traditional for loop.


#### Tying It Together
There is one last step, which is to combine the results from these queries with the results from the git commands from earlier, which only requires a few modifications to the parsing shown before.
```ts {7-9, 13-14}
const history = stdout
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v.length)
    .reduce((acc, line, i, arr) => {
        if (i % 2 === 0) {
            const deployment = deployments.find(
                (r) => r.deployment_trigger?.metadata?.commit_hash === line
            );
            acc.push({
                hash: line,
                date: arr[i + 1],
                liveurl: deployment?.url ? `${deployment.url}/path/to/article` : '',
                message: deployment?.deployment_trigger?.metadata?.commit_message ?? ''
            });
        }
        return acc;
    }, [] as Commit[]);

type Commit = {
	hash: string;
	message: string;
	liveUrl: string;
	date: string;
};
```

### The UI
Finally we need to provide a nice UI for this data, which for me means no JavaScript, pleasing but unobtrusive animations, and functionality with no CSS. Using tailwind and svelte this might look something like this (without any coloring, spacing, or aesthetic tweaks):
```svelte
<div class="group">
    <label class="flex cursor-pointer items-center" for="history">
        <input type="checkbox" id="history" hidden />
        <span>History</span>
        <span class="transition-[transform]
                     group-focus-within:rotate-90
                     group-has-[input:checked]:rotate-90"
        > > </span>
    </label>
    <div class="grid grid-rows-[0fr] transition-[grid-template-rows]
                group-focus-within:grid-rows-[1fr]
                group-has-[input:checked]:grid-rows-[1fr]">
        <div class="overflow-hidden">
            <ol>
                {#each history as commit}
                    <li>
                        <div>
                            {new Date(commit.date).toLocaleString()} - {commit.message}
                        </div>
                        <div>
                            {#if commit.liveUrl !== ''}
                                <a href={`${commit.liveUrl}`}> Live Link </a>
                            {/if}
                            <a href={`https://github.com/user/repo/commit/${commit.hash}`}>
                                View Diff
                            </a>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    </div>
</div>
```
The basic idea of this code is to use the `grid` CSS class to provided a smooth transition for the list by animating the `grid-template-rows` property, using a checkbox to store the state of the pop-up, and using the tailwind `group` feature to allow the aforementioned checkbox and list to be placed in very different places in the DOM. As long as the both the `checkbox` and the `div` containing the list have a common ancestor with the `group` class, everything will just work!

Note here that the diff view for the article is simply provided via a link to GitHub at the commit in question. This could be easily modified to work with self hosted git repositories, or without git repositories at all. In my case it works well, is free, and is already setup for me.

#### Browser Compatibility
If one wanted the best browser compatibility, they could use the `supports-[grid]:` selector provided by tailwind to check if grids are supported, and if not fall back on simple `hidden`/`block` styling. The animation of grid tracks is also a newer feature, but it automatically acts as progressive-enhancement, as if it is not supported the UI still functions!

#### Accessibility
The `group-focus-within` selector may seem random, but is actually crucial, as it ensures that if someone is using tab indexing to navigate the site, the list will still be shown, even if the checkbox is not checked. Finally, semantic html is used to increase accessibility of the site, and improve rendering without CSS.

## Closing Thoughts
While I'm not sure how practical or useful this technique is, being able to provide automatic historic snapshots of my articles (and website in general) with only around ~50 lines of back-end code and ~30 lines of front-end code seemed like too cool of an opportunity to pass up.

One side affect of note is that by using the deployment specific website URL that Cloudflare provides, we are not just providing a snapshot of the article at that commit, but the rest of site as well! This last point may be a big deal for some people, but since this site's source code is in a public repository already, the accessibility of historic snapshots of the site is not of any concern in my use case. And secondly, since I am not hosting the historic versions of the site, I don't have to worry (much) about the old versions of libraries used in that deployment having vulnerabilities that could be exploited.

Checkout how this actually works in practice by looking at the title section of this article, or if you want to see an article with more history check out my article about [how I made the rest of this site](/articles/personal-website).

Let me know if this was interesting or useful to you.
