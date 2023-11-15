<script lang="ts" context="module">
	import img from '@zerodevx/svelte-img';
	export { img };
</script>

<section
	class="prose prose-neutral max-w-[80ch] dark:prose-invert lg:prose-lg prose-code:grid prose-code:py-2 prose-pre:p-0"
>
	<slot />
</section>

<style>
	.prose :global(code[data-line-numbers] > span[data-line-number]::before) {
		content: attr(data-line-number);
		@apply mr-4 inline-block w-4 text-right text-neutral-500;
	}
	.prose :global(:is(h1, h2, h3, h4, h5, h6) a) {
		text-decoration: none;
	}
	.prose :global(code > span[data-highlighted]) {
		@apply border-accent bg-accent bg-opacity-30;
	}
	.prose :global(pre[data-code-title]:before) {
		@apply block bg-neutral-800 px-4 pb-1 pt-2;
		content: attr(data-code-title);
	}
	.prose :global(code > span) {
		@apply border-l-2 border-transparent px-4;
	}
	.prose :global([id]::before) {
		content: '';
		display: block;
		height: 75px;
		margin-top: -75px;
		visibility: hidden;
	}
</style>
