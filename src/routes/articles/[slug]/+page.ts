import type { Post } from '$lib/types/posts.js';
import { error } from '@sveltejs/kit';
import type { ComponentType } from 'svelte';

export async function load({
	params
}): Promise<{ content: InstanceType<ComponentType<any>>; meta: Post }> {
	try {
		const post = await import(`../../../articles/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
