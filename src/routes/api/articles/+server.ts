import type { Commit, Post, Posts } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import type { RequestHandler } from './$types';
import { readFile } from 'fs/promises';
import markdownReadingTime from '$lib/markdownReadingTime';
import { exec as execRaw } from 'child_process';
import { promisify } from 'util';
import Cloudflare from 'cloudflare';

const exec = promisify(execRaw);

export const prerender = true;

const readingTime = markdownReadingTime({
	regex: /\w+/g,
	wpm: 225
});

const cloudflare = new Cloudflare({
	apiToken: import.meta.env.VITE_CLOUDFLARE_API
});

const deployments: Cloudflare.Pages.Projects.Deployment[] = [];
for (let i = 1; ; i++) {
	const page = await cloudflare.pages.projects.deployments.list(
		'personal-site',
		{ account_id: import.meta.env.VITE_CLOUDFLARE_ACCOUNT },
		{ query: { page: i } }
	);
	if (!page.result.length) break;
	deployments.push(...page.result.filter((d) => d.url));
}

await exec('git fetch --depth=2147483647');

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob<SvelteComponent>('/articles/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		const { stdout, stderr } = await exec(
			`git log --follow --format=format:%H%n%ad%n%s articles/${slug}.md`
		);
		if (stderr) {
			throw new Error("Git log didn't work");
		}

		const history = stdout
			.split('\n')
			.map((v) => v.trim())
			.filter((v) => v.length)
			.reduce((acc, _, i, arr) => {
				if (i % 3 === 0) {
					const info = {
						hash: arr[i],
						date: arr[i + 1],
						message: arr[i + 2]
					};
					const deployment = deployments.find(
						(r) => r.deployment_trigger?.metadata?.commit_hash === info.hash
					);
					acc.push({
						...info,
						liveUrl: deployment?.url?.length ? `${deployment.url}/articles/${slug}` : ''
					});
				}
				return acc;
			}, [] as Commit[]);

		const readTime = await readingTime(await readFile('.' + path));

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'history' | 'slug' | 'readTime'>;
			const post = { ...metadata, readTime, history, slug };
			if (post.published || import.meta.env.DEV) posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export const GET: RequestHandler = async () => {
	const posts = await getPosts();
	const tags = [
		...posts
			.flatMap((p) => p.tags)
			.reduce((acc, tag) => {
				acc.set(tag, (acc.get(tag) || 0) + 1);
				return acc;
			}, new Map())
			.entries()
	]
		.toSorted(([k1, v1], [k2, v2]) => v2 - v1 || k1.localeCompare(k2))
		.map(([k]) => k);
	const data: Posts = {
		posts,
		tags,
		numPosts: posts.length
	};
	return json(data);
};
