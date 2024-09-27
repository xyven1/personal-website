import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	return {
		origin: url.origin,
		api:
			{
				localhost: '1cb1191f-2cf4-4cb8-a895-2b83e91a2be5',
				'xyven.dev': '5b3ec125-a470-42d7-bda4-1b2f2dc124aa',
				'personal-website-svelte.pages.dev': '5b3ec125-a470-42d7-bda4-1b2f2dc124aa',
				'blake.bruell.com': 'eb0d973f-8562-4ac4-a138-8488d6fac2a0'
			}[url.hostname] || ''
	};
};
