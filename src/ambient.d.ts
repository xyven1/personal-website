// Squelch warnings of image imports from your assets dir
declare module '$lib/data/images/*' {
	const meta;
	export default meta;
}
