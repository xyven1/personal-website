import type { Post } from '$lib/types';

export const postsToStrings = (posts: Post[]): string[] => {
	return posts.map((p) => {
		const date = new Date(p.date);
		return [
			p.title,
			p.description,
			...p.tags,
			date.toLocaleDateString(),
			date.toLocaleDateString(undefined, {
				weekday: 'long',
				month: 'long'
			})
		].join(' ');
	});
};

export const filterTags = (posts: Post[], tags: string[]): Post[] => {
	return tags.length > 0 ? posts.filter((p) => p.tags.some((t) => tags.includes(t))) : posts;
};
