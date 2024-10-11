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
		const readTime =
			((await (await fetch('/api/articles')).json()) as Posts).posts.find(
				(p) => p.slug === params.slug
			)?.readTime ?? 0;

		return {
			content: post.default,
			meta: {
				...post.metadata,
				readTime,
				slug: params.slug
			}
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
