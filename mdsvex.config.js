
// MDSvex settings --------------------------------
import { createHighlighter } from '@bitmachina/highlighter';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import { mdiLinkVariant } from '@mdi/js';

import { h } from 'hastscript';
/**
 * @typedef {import('hast').ElementContent} ElementContent
 */
/** @type {import('rehype-autolink-headings').Options} */
const autoLinkOptions = {
	behavior: 'append',
	properties: {
		class: 'article-heading'
	},
	content() {
		return h(
			'svg',
			{
				viewBox: '0 0 24 24',
				style:
					'width: 1rem; height: 1rem; fill: currentColor; margin-left: 0.5rem; display: inline-block'
			},
			[h('path', { d: mdiLinkVariant })]
		);
	}
};


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: await createHighlighter({ theme: 'dark-plus' })
	},
	remarkPlugins: [remarkUnwrapImages, remarkMath],
	rehypePlugins: [
		[rehypeKatex],
		rehypeSlug,
		[rehypeAutoLinkHeadings, autoLinkOptions],
		[
			rehypeToc,
			{
				customizeTOC(node) {
					return h('section', { class: 'toc-section'}, [
						 node
					]);
				} 		
			}
		],
	],
	layout: {
		_: './src/lib/mdsvex.svelte'
	}
};
export default mdsvexOptions;
