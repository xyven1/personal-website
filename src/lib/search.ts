import type { Post } from '$lib/types';
import ufuzzy from '@leeoniya/ufuzzy';

export const postsToStrings = (posts: Post[]): string[] =>
	posts.map((p) => {
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

const uf = new ufuzzy({
	intraIns: 1
});

export type SearchState = {
	// Inputs
	posts: Post[];
	tags: string[];
	// Cache
	postStrings: string[];
	filteredByTags: Post[];
	filteredByTagStrings: string[];
};
export const SearchState_ = (): SearchState => ({
	posts: [],
	tags: [],
	postStrings: [],
	filteredByTags: [],
	filteredByTagStrings: []
});

export function search(
	state: SearchState,
	{
		posts,
		tags
	}: {
		posts?: Post[];
		tags?: string[];
	},
	query: string
) {
	if (posts) {
		state.posts = posts;
		state.postStrings = postsToStrings(posts);
	}

	if (tags || posts) {
		if (tags) state.tags = tags;

		if (state.tags.length === 0) {
			state.filteredByTags = state.posts;
			state.filteredByTagStrings = state.postStrings;
		} else {
			state.filteredByTags = [];
			state.filteredByTagStrings = [];
			for (let i = 0; i < state.posts.length; i++) {
				if (state.posts[i].tags.some((t) => state.tags.includes(t))) {
					state.filteredByTags.push(state.posts[i]);
					state.filteredByTagStrings.push(state.postStrings[i]);
				}
			}
		}
	}

	return query === ''
		? state.filteredByTags
		: (uf.search(state.filteredByTagStrings, query, 1)[0]?.map((i) => state.filteredByTags[i]) ??
				[]);
}
