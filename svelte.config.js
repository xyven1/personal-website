import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexOptions from './mdsvex.config.js';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexOptions),
		vitePreprocess(),
		sveltePreprocess({
			sourceMap: false,
			babel: false,
			typescript: false,
			scss: false,
			sass: false,
			less: false,
			stylus: false,
			postcss: false,
			coffeescript: false,
			pug: false,
			globalStyle: true
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		alias: {
			$: '.'
		}
	}
};

export default config;
