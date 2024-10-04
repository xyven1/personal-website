import type { Posts } from '$lib/types';
import { filterTags, postsToStrings } from '../search';
import type { PageLoad } from './$types';

import ufuzzy from '@leeoniya/ufuzzy';

export const prerender = false;
export const csr = true;

const uf = new ufuzzy({
	intraIns: 1
});

export const load: PageLoad = async ({ fetch, url }) => {
	const resp: Posts = await (await fetch(`/api/articles`)).json();
	// Filter posts by tags
	resp.posts = filterTags(resp.posts, url.searchParams.getAll('tag'));
	// Search posts by query
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return resp;
	}
	const postStrings = postsToStrings(resp.posts);
	const [idxs, ,] = uf.search(postStrings, q, 1);
	if (idxs !== null && idxs.length > 0) {
		resp.posts = idxs.map((i) => resp.posts[i]);
	}
	return resp;
};
