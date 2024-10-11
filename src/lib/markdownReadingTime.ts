import { visit } from 'unist-util-visit';
import { type Processor, unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import type { Code, Root, Text } from 'mdast';
import type { Compatible } from 'vfile';
type Options = {
	regex: RegExp;
	wpm: number;
};

function remarkReadingTime(
	this: Processor<undefined, undefined, undefined, Root, string>,
	options: Readonly<Options> | null | undefined
): undefined {
	const regex = options ? options.regex : null;

	this.compiler = (tree) => {
		let total = 0;
		visit(tree, ['code', 'text'], (para) => {
			const data: string = (para as Code | Text).value;
			total += (regex ? (data.match(regex) ?? []) : data.split(' ')).length;
		});
		return `${total}`;
	};
}

export default function (options: Options) {
	const wordCountProcessor = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkReadingTime, options);
	return async (data: Compatible | undefined) =>
		Math.ceil(Number(await wordCountProcessor.process(data)) / options.wpm);
}
