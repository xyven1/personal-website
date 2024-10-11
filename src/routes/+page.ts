import type { Posts } from '$lib/types';
import type { PageLoad } from './$types';

export const csr = true;

export const load: PageLoad = async ({ fetch }): Promise<Posts> =>
	await (await fetch('/api/articles')).json();
