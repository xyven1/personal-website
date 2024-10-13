import { unified } from 'unified';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

/**
 * Escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
 *
 * [reference](https://github.com/pngwn/MDsveX/blob/6c60fe68c335fce559db9690fbf5e69ef539d37d/packages/mdsvex/src/transformers/index.ts#L571)
 * @param {string} str
 * @returns {string}
 */
const escape_svelty = (str) =>
	str
		.replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[c])
		.replace(/\\([trn])/g, '&#92;$1');

/**
 * @param {string} code
 * @param {string} lang
 * @param {string} meta
 * @returns {string}
 */
const makeSource = (code, lang, meta) => `\`\`\`${lang} ${meta}\n${code}\n\`\`\``;

/**
 * @typedef {import('rehype-pretty-code').Options} Options
 * @param {Options} options
 * @returns {(raw: string, inputLang: string, metastring?: string) => Promise<string>}
 */
export function createHighlighter(options) {
	return async function highlighter(raw, inputLang, metastring) {
		const html = await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypePrettyCode, options)
			.use(rehypeStringify)
			.process(makeSource(raw, inputLang, metastring || ''));
		return escape_svelty(String(html));
	};
}

// MDSvex settings --------------------------------
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import { mdiLinkVariant, mdiTableOfContents } from '@mdi/js';
import { h } from 'hastscript';
import fs from 'fs';

/**
 * @typedef {import('hast').ElementContent} ElementContent
 */
/** @type {import('rehype-autolink-headings').Options} */
const autoLinkOptions = {
	behavior: 'append',
	properties: {
		'aria-hidden': true,
		tabindex: -1,
		class: 'article-heading-link'
	},
	content() {
		return h('svg', { viewBox: '0 0 24 24', width: '1em' }, [h('path', { d: mdiLinkVariant })]);
	}
};

/** @type {import('rehype-toc').Options} */
const tocOptions = {
	customizeTOC(node) {
		if (node.children[0].children.length === 0) return null;
		node.children[0].children.push(
			h('li', { class: 'toc-item toc-item-h2' }, [
				h('a', { class: 'toc-link toc-link-h2', href: '#comments' }, 'Comments')
			])
		);
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

/** @type {import('rehype-pretty-code').Options} */
const rehypeOptions = {
	theme: {
		dark: JSON.parse(fs.readFileSync('./themes/gruvbox-dark.json', 'utf-8')),
		light: JSON.parse(fs.readFileSync('./themes/gruvbox-light.json', 'utf-8'))
	}
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: createHighlighter(rehypeOptions)
	},
	remarkPlugins: [remarkUnwrapImages, remarkMath],
	rehypePlugins: [
		[rehypeKatex],
		rehypeSlug,
		[rehypeAutoLinkHeadings, autoLinkOptions],
		[rehypeToc, tocOptions]
	],
	layout: './src/lib/mdsvex/wrapper.svelte'
};
export default mdsvexOptions;
