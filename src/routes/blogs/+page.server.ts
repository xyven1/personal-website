import type { Post } from '$lib/types/posts';

export async function load({ fetch }) {
	const response = await fetch('api/blogs');
	const posts: Post[] = await response.json();
	return { posts };
}
