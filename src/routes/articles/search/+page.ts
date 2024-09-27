import type { Post } from '$lib/types';
import type { PageLoad } from './$types';

import ufuzzy from '@leeoniya/ufuzzy';

export const prerender = false;
export const csr = true;

const uf = new ufuzzy({
	intraIns: 1
});

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api/articles');
	const allPosts: Post[] = await response.json();
	const postStrings = allPosts.map((p) => {
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
	const q = url.searchParams.get('q');
	if (q === null || q === '') {
		return { posts: allPosts };
	}
	const [idxs, ,] = uf.search(postStrings, q, 1);
	let posts: Post[] = [];
	if (idxs !== null && idxs.length > 0) {
		posts = idxs.map((i) => allPosts[i]);
	}
	return { posts };
};
