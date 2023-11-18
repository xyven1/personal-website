<script lang="ts" context="module">
	import img from '@zerodevx/svelte-img';
	export { img };
</script>

<section
	class={'prose prose-neutral prose-invert min-w-0 max-w-[80ch] md:prose-lg ' + $$props.class}
>
	<slot />
</section>

<style>
	.prose :global(pre[data-code-title]:before) {
		@apply block bg-neutral-800 px-4 pb-1 pt-2;
		content: attr(data-code-title);
	}
	.prose :global(pre) {
		@apply overflow-x-hidden p-0;
	}
	.prose :global(code) {
		@apply grid overflow-x-auto;
	}
	.prose :global(code > span) {
		@apply border-l-4 border-transparent px-4;
	}
	.prose :global(code > span[data-highlighted]) {
		@apply border-accent bg-accent/30;
	}
	.prose :global(code[data-line-numbers] > span[data-line-number]) {
		@apply ml-10;
	}
	/* Line numbers */
	.prose :global(code[data-line-numbers] > span[data-line-number]::before) {
		content: attr(data-line-number);
		@apply absolute -ml-[61px] inline-block w-10 bg-neutral-950 pr-1 text-right text-neutral-500;
	}
	.prose :global([id]::before) {
		content: '';
		display: block;
		height: 48px;
		margin-top: -48px;
		visibility: hidden;
	}
	.prose :global(:is(h1, h2, h3, h4, h5, h6) a) {
		text-decoration: none;
	}
	.prose :global(h2) {
		@apply border-b-[3px] border-neutral-800;
	}

	:global(.toc-link-active) {
		@apply text-accent;
	}

	:global(.toc-link-inactive) {
		color: inherit !important;
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
</style>
