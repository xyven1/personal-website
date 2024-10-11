// Squelch warnings of image imports from your assets dir
declare module '$lib/data/images/*' {
	const meta;
	export default meta;
}

declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}
