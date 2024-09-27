import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		fs: {
			allow: ['articles']
		}
	},
	plugins: [sveltekit(), imagetools()]
});
