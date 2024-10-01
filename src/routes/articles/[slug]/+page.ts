import type { Post } from '$lib/types';
import { error, type Load } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const load: Load = async function ({ params }): Promise<{ content: Component; meta: Post }> {
	try {
		const post = await import(`$/articles/${params.slug}.md`);

		return {
			content: post.default,
			meta: {
				...post.metadata,
				slug: params.slug
			}
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
