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
	const tags = [...new Set(posts.flatMap((p) => p.tags))];
	const data: Posts = {
		posts,
		tags,
		numPosts: posts.length
	};
	return json(data);
}
