---
title: How I Made My Website
description: How my personal site works, and why I made the technical choices I did.
date: 2023-11-21 EST
updated: 2024-10-05 EST
tags:
  - sveltekit
  - svelte
published: true
---
Frameworks and Tools
--------------------
### SvelteKit
This site is built on [**SvelteKit**](https://github.com/sveltejs/kit) (^1.24.1). The main reasons I chose this framework are as follows:
- **Adapters**: SvelteKit adapters allow for easy integration with many different hosting platforms (including multiple forms of self-hosting) via adapters. This makes the site agnostic to hosting service, but still plug and play with existing solutions like Cloudflare Pages (the current hosting service as of writing)
- **SSR and Prerendering**: Many different frameworks support this, but SvelteKit has first class support for both SSR (`export const ssr = true;`), and pre-rendering (`export const prerender = true;`). These features allow the site to be compiled into pure HTML and CSS wherever possible, speeding up page delivery and reducing redundant computation
- **Optional Hydration**: SvelteKit makes it easy to completely disable the JavaScript runtime (`export const csr = false;`)

### Tailwind
I chose to use [**tailwindcss**](https://github.com/tailwindlabs/tailwindcss) (^3.3.3) for styling on this site, as the localized styling as well as robust documentation and ecosystem made it a breeze to use. The entire site supports both light mode and dark mode, automatically selected based on the user's system preferences.

When setting up the articles portion of this site, I also added [**@tailwindcss/typography**](https://github.com/tailwindlabs/tailwindcss-typography) (^0.5.10) to get access to the `.prose` class which provides the majority of the styling for the very page you are looking at.

### MDSveX
Another key tool is [**MDSveX**](https://github.com/pngwn/MDsveX) (^0.11.0), a tool for generating HTML from markdown files, but with the ability to embed not only HTML but also svelte components. The flexibility this grants ensured that anything I could do with a normal svelte file was possible using the markdown files used to layout these pages.
#### Remark and Rehype
Using MDSveX also opened up a huge ecosystem of **remark** and **rehype** plugins, which allow complex transformations of the AST at both the markdown stage and the HTML stage of the transformation. The plugins used include the following:
- **remark-math** and **rehype-katex**: This combination of plugins allows for beautiful and easy math equations embedded right in the markdown. This plays nicely with markdown editors like obsidian, making editing more ergonomic.
- **rehype-toc**: Along **rehype-autolink-headings** and **rehype-slug**, this plugin provides an elegant way of creating a table of contents for the site.

#### Code Highlighting
Code highlighting was a tough nut to crack, and is actually still one of the pain points of this site. For the first pass of this site I used [**@bitmachina/highlighter**](https://github.com/johnhooks/highlighter) (1.0.0-alpha.7), a plugin designed for use with MDSveX, which made it easy to get functional. Sadly the project is not maintained, and so I switched to an option which was more feature-full and actively maintained, [**rehype-pretty-code**](https://github.com/rehype-pretty/rehype-pretty-code) (^0.14.0). To get this working I created a custom implementation for the highlighter hook that MDSveX provides and reassembled markdown code blocks strings which were then passed to a standard [**unified**](https://github.com/unifiedjs/unified) parsing pipeline with rehype-pretty-code. This solution, while kind of hacky, provides as much functionality as possible without having to modify either MDSveX or rehype-pretty-code.

### Cloudflare Pages
Currently, the site is hosted on Cloudflare using [Cloudflare Pages](https://developers.cloudflare.com/pages/). There are some nice advantages:
- Cloudflare pages support server-less functions, which pair nicely with `+server.ts` routes in SvelteKit
- Continuous deployment is free and plentiful (500 per month on the free plan) and updates are extremely fast
- Integration with SvelteKit is completely automatic using the pre-installed `adapter-auto`
- Setting up multiple domains was easy, and I was already using Cloudflare to manage the relevant DNS
- Active community

### Commenting
While commenting is not a crucial part of this website, I personally find comment sections of great value in the sites that I frequent. As such, I decided to add commenting functionality to my website. While there are many options for adding commenting to sites, I chose to use [**Giscus**](https://giscus.app) as it is open source, easy to use, has a nice UI, is feature rich, and requires logging in with an account on a platform I already use trust, and expect people who are reading this site to have: [**GitHub**](https://github.com). The only downside is that it requires JavaScript to function, making it at the time of writing the *only* feature in the entire site which depends on JavaScript. You can check out how the comments look and operate at the [comments section at the bottom of this page](#comments).

Examples
--------
If you like to check out the source code for any of the following examples you can find it [here]({source}).

### Math
#### Inline Math
Let $f(x) = 1$. $\forall x,y \in \Bbb{Z}$, $x + y = \sum_{i = 1}^{x+y} \frac{f(i)}{\sin^2(i) +\cos ^{2}(i) }$.
#### Math Blocks
$$
\begin{aligned}
a(a^2) &= b^3 \\
a(b^2) &= b^3 \\
(ab^2)b^{-2} &= (bb^2)b^{-2} \\
a(b^2b^{-2}) &= b(b^2b^{-2}) \\
a &= b
\end{aligned}
$$

### Code
#### Basic Block
```svelte
<script lang="ts">
	let data;
</script>
```

#### Title and Highlighting
```ts {1} title="src/route/+page.ts"
import projects from '$lib/projects';
```

#### Highlighting and Line numbers
```ts {1-3, 6,} showLineNumbers{10}
async function getProjects() {
	return projects;
}

export async function GET() {
	const projects = await getProjects();
	return json(projects);
}
```
### Tables
| Tables   |   Second Row   | Still Going |
|:-------- |:--------------:| -----------:|
| col 3 is | aligned  right |       $1600 |


<script>
	export let source;
</script>
