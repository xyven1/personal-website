import type { Post, Posts } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async function ({
	params,
	fetch
}): Promise<{ content: SvelteComponent; meta: Post }> {
	try {
		const post = await import(`$/articles/${params.slug}.md`);
		const postData = import.meta.env.DEV
			? {
					history: [
						{
							hash: 'dummy',
							message: 'test message',
							liveUrl: 'https://example.com',
							date: 'Fri Sep 27 02:02:55 2024 -0400'
						}
					],
					readTime: -1
				}
			: ((await (await fetch('/api/articles')).json()) as Posts).posts.find(
					(p) => p.slug === params.slug
				);
		if (!postData) throw new Error('Post data not found');
		const { readTime, history } = postData;
		const metadata: Omit<Post, 'readTime' | 'history' | 'slug'> = post.metadata;
		return {
			content: post.default,
			meta: {
				...metadata,
				readTime,
				history,
				slug: params.slug
			}
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
