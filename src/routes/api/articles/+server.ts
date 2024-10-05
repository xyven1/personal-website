import type { Post, Posts } from '$lib/types';
import { json } from '@sveltejs/kit';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/articles/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published || import.meta.env.DEV) posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
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
}
