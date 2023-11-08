import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex'
import rehypePrettyCode from 'rehype-pretty-code';
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],	
	// highlight: {
	// 	highlighter: async (code, lang = 'text') => {
	// 		const highlighter = await shiki.getHighlighter({ theme: 'dark-plus' })
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
	// 		return `{@html \`${html}\` }`
	// 	}
	// },
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'dark-plus'}]],
	layout: {
		_: './src/lib/mdsvex.svelte'
	},
}
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexOptions)
	],
	extensions: ['.svelte', '.md'],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
