import type { Post } from '$lib/types/posts';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const response = await fetch('/api/articles');
	const posts: Post[] = await response.json();
	return { posts };
};
