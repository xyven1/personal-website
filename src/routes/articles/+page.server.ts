import type { Post } from '$lib/types/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/articles');
	const posts: Post[] = await response.json();
	return { posts };
};
