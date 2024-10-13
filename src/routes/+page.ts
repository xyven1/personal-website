import type { Posts } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }): Promise<Posts> =>
	await (await fetch('/api/articles')).json();
