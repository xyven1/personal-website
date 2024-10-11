import type { Posts } from '$lib/types';
import { search, SearchState_ } from '$lib/search';
import type { PageLoad } from './$types';

export const prerender = 'auto';
export const csr = true;

export const load: PageLoad = async ({ fetch, url }) => {
	const resp: Posts = await (await fetch(`/api/articles`)).json();
	resp.posts = search(
		SearchState_(),
		{
			posts: resp.posts,
			tags: url.searchParams.getAll('tag')
		},
		url.searchParams.get('q') ?? ''
	);
	return resp;
};
