import { createHighlighter } from '@bitmachina/highlighter';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeKatex from 'rehype-katex-svelte';
import { mdiLinkVariant } from '@mdi/js';

import { h } from 'hastscript';
/**
 * @typedef {import('hast').ElementContent} ElementContent
 */
/** @type {import('rehype-autolink-headings').Options} */
const autoLinkOptions = {
	behavior: 'wrap',
	content(node) {
		return [
      ...node.children,
			h(
				'svg',
				{
					viewBox: '0 0 24 24',
					style: 'width: 1rem; height: 1rem; fill: currentColor; margin-left: 0.5rem; display: inline-block'
				},
				[h('path', { d: mdiLinkVariant })]
			),
		];
	},
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: /* false, */
	{
		highlighter: await createHighlighter({theme: 'dark-plus'})
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }], remarkMath],
	rehypePlugins: [
		[rehypeKatex, { output: 'mathml' }],
		// [rehypePrettyCode, { theme: 'dark-plus' }],
		rehypeSlug,
		[rehypeAutoLinkHeadings, autoLinkOptions]
	],
	layout: {
		_: './src/lib/mdsvex.svelte'
	}
};
export default mdsvexOptions;
