export type Post = {
	title: string;
	slug: string;
	date: string;
	readTime: number;
	updated?: string;
	published: boolean;
	description: string;
	tags: string[];
};

export type Posts = {
	posts: Post[];
	tags: string[];
	numPosts: number;
};
