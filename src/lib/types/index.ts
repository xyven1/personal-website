export type Commit = {
	hash: string;
	message: string;
	liveUrl: string;
	date: string;
};
export type Post = {
	title: string;
	slug: string;
	date: string;
	readTime: number;
	history: Commit[];
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
