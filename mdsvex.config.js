// MDSvex settings --------------------------------
import { createHighlighter } from '@bitmachina/highlighter';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import { mdiLinkVariant, mdiTableOfContents } from '@mdi/js';

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
		return h('svg', { viewBox: '0 0 24 24', width: '1em' }, [h('path', { d: mdiLinkVariant })]);
	}
};

/** @type {import('rehype-toc').Options} */
const tocOptions = {
	customizeTOC(node) {
		if (node.children[0].children.length === 0) return null;
		return h('section', { class: 'toc-section' }, [
			h('label', { for: 'toc-toggle' }, [
				h('svg', { viewBox: '0 0 24 24', width: '2.5em' }, h('path', { d: mdiTableOfContents })),
				h('span', 'Contents')
			]),
			h('input', { type: 'checkbox', id: 'toc-toggle' }),
			h('div', node)
		]);
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
		[rehypeToc, tocOptions]
	],
	layout: {
		_: './src/lib/mdsvex/wrapper.svelte'
	}
};
export default mdsvexOptions;
