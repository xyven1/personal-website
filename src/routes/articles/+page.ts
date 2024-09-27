import type { Post } from '$lib/types/posts';
import type { PageLoad } from './$types';

export const csr = true;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/articles');
	const posts: Post[] = await response.json();
	return { posts };
};
