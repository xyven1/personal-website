<script lang="ts" context="module">
	import img from '@zerodevx/svelte-img';
	import 'katex/dist/katex.min.css';

	export { img };
</script>

<svelte:head>
	<!-- <link rel="preload" as="font" href={f} type="font/woff2" crossorigin="anonymous" /> -->
</svelte:head>

<section class={'prose prose-neutral prose-invert min-w-0 max-w-full md:prose-lg ' + $$props.class}>
	<slot />
</section>

<style lang="postcss">
	.prose :global(code) {
		font-family: 'JetBrains Mono', monospace;
		--number-width: 5ch;
		@apply font-normal;
	}
	/* Code blocks */
	.prose :global(pre) {
		@apply relative overflow-x-hidden p-0;
	}
	.prose :global(pre[data-code-title]:before) {
		@apply block bg-neutral-800 px-4 py-1.5 content-[attr(data-code-title)];
	}
	.prose :global(pre > code) {
		@apply grid overflow-x-auto py-4;
	}
	.prose :global(pre[data-code-title] > code) {
		@apply pt-0;
	}
	.prose :global(pre > code > span) {
		@apply border-l-[3px] border-transparent px-4;
	}
	.prose :global(pre > code > span[data-highlighted]) {
		@apply border-accent bg-accent/30;
	}
	.prose :global(pre > code[data-line-numbers] > span[data-line-number]) {
		@apply ml-[var(--number-width)] pl-2;
	}
	.prose :global(pre > code[data-line-numbers] > span[data-highlighted]) {
		@apply border-transparent;
	}
	.prose :global(pre > code[data-line-numbers] > span[data-line-number]::before) {
		@apply absolute -ml-[calc(var(--number-width)+3px+.5rem)] w-[var(--number-width)] border-r-[3px] border-transparent bg-neutral-950 pr-1 text-right text-neutral-500 content-[attr(data-line-number)];
	}
	.prose :global(pre > code[data-line-numbers] > span[data-highlighted]::before) {
		@apply border-accent;
	}
	/* Headings */
	.prose :global([id]::before) {
		@apply invisible -mt-12 block h-12 content-[''];
	}
	.prose :global(h2) {
		@apply border-b-[3px] border-neutral-800;
	}
	:global(.article-heading) {
		@apply inline-block pl-2 align-[-0.15em];
	}
	:global(.article-heading > svg) {
		@apply h-[1em] w-[1em] fill-current;
	}
	/* Table of Contents */
	:global(.toc-link-active) {
		@apply text-accent;
	}
	:global(.toc-link-inactive) {
		/* @apply !text-inherit hover:!text-accent/100; */
	}
	:global(.toc-level) {
		@apply border-l-2 border-neutral-700 pl-4;
	}
	:global(.toc-level-1) {
		@apply border-0 pl-0;
	}
	:global(.toc-section) {
		@apply my-4;
	}
	:global(.toc-section > label) {
		@apply flex cursor-pointer items-center gap-x-2 xl:hidden;
	}
	:global(.toc-section > label > svg) {
		@apply h-8 w-8 fill-current;
	}
	:global(.toc-section > label > span) {
		@apply fill-current text-2xl;
	}
	:global(.toc-section > input[type='checkbox']) {
		@apply hidden;
	}
	:global(.toc-section > div) {
		@apply grid grid-rows-[0fr] transition-all duration-200 ease-in-out;
	}
	:global(.toc-section > div) {
		@apply xl:block;
	}
	:global(.toc-section > div > nav) {
		@apply overflow-hidden;
	}
	:global(.toc-section:has(> input[type='checkbox']:checked) > div) {
		@apply grid-rows-[1fr];
	}
</style>
