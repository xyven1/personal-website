<script lang="ts">
	import img from '@zerodevx/svelte-img';

	import 'katex/dist/katex.min.css';

	import Giscus from '@giscus/svelte';

	export { img };
</script>

<div class={$$props.class}>
	<section
		class="prose prose-stone min-w-0 max-w-[120ch] break-words md:prose-lg dark:prose-neutral dark:prose-invert"
	>
		<slot />
	</section>
	<section id="comments" class="mx-auto max-w-[80ch] pt-8">
		<noscript>
			<div class="mb-4 mt-8 w-full text-center text-stone-600 dark:text-neutral-400">
				<strong> Unfortunately, the commenting feature requires JavaScript to function. </strong>
				<div class="text-sm">
					Please enable JavaScript for this site if you would like to use the comment feature.
				</div>
			</div>
		</noscript>
		<Giscus
			id=""
			term=""
			repo="xyven1/personal-website"
			repoId="R_kgDOGsqAyA"
			category="Comments"
			categoryId="DIC_kwDOGsqAyM4CjEt3"
			mapping="og:title"
			strict="1"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme="preferred_color_scheme"
			lang="en"
			loading="lazy"
		/>
	</section>
	<div class="flex h-0 flex-wrap">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each Array(6) as _}
			<span class="w-[20ch]"></span>
		{/each}
	</div>
</div>

<style lang="scss">
	.prose :global {
		::marker {
			@apply text-stone-500;
		}
		code[data-theme*=' '],
		code[data-theme*=' '] span {
			@apply text-[var(--shiki-light)] dark:text-[var(--shiki-dark)];
		}
		// Inline Code
		*:not(pre) > code {
			@apply rounded-[4px] border border-stone-400/50 bg-stone-400/20 px-1 py-[.1em] font-mono font-normal before:content-none after:content-none dark:border-neutral-700 dark:bg-neutral-800;
		}
		// Code blocks
		figure[data-rehype-pretty-code-figure] {
			--shiki-dark-selection: #443e3c;
			--shiki-light-selection: #e5d8b2;

			@apply my-0 overflow-clip rounded-lg;

			pre {
				@apply relative overflow-x-hidden rounded-none bg-transparent p-0;
			}

			code {
				--number-width: 5ch;
				@apply grid overflow-x-auto bg-[var(--shiki-light-bg)] py-4 dark:bg-[var(--shiki-dark-bg)];
			}

			figcaption[data-rehype-pretty-code-title] {
				@apply block bg-stone-300 px-4 py-1.5 font-mono text-sm font-bold text-stone-900 content-[attr(data-code-title)] dark:bg-neutral-700 dark:text-neutral-200;
			}

			span[data-line] {
				@apply pl-4;
			}

			span[data-highlighted-line],
			mark[data-highlighted-chars] {
				@apply bg-[var(--shiki-light-selection)] dark:bg-[var(--shiki-dark-selection)];
			}
			mark[data-highlighted-chars] {
				@apply -m-1 rounded-md p-1;
			}

			// Line numbers
			code[data-line-numbers] {
				@apply [counter-reset:line];
				--gutter-width: calc(var(--number-width) + 1rem);
				> span[data-line] {
					@apply ml-[var(--gutter-width)] pl-0;
				}
				> span[data-line]::before {
					// Counter
					@apply content-[counter(line)] [counter-increment:line];
					// Spacing
					@apply absolute -ml-[var(--gutter-width)] w-[var(--gutter-width)] pr-4 text-right;
					// Coloring
					@apply bg-[var(--shiki-light-bg)] text-[#a89984] dark:bg-[var(--shiki-dark-bg)] dark:text-[#7c6f64];
				}
				> span[data-highlighted-line]::before {
					// Highlighted Coloring
					@apply bg-[var(--shiki-light-selection)] text-[#928374] dark:bg-[var(--shiki-dark-selection)] dark:text-[#928374];
				}
			}
		}

		// Headings
		:is(h1, h2, h3, h4, h5, h6) {
			@apply border-stone-400 dark:border-neutral-700;

			> a {
				@apply inline-block pl-2 align-[-0.15em];
				> svg {
					@apply h-[1em] w-[1em] fill-current;
				}
			}
		}
		h2 {
			@apply border-b-[3px];
		}
		h3 {
			@apply border-b-[1.5px] border-opacity-50;
		}
	}
	// Table of Contents
	:global .toc-section {
		@apply mt-4;
		// focus within toc-section, expand it
		&:has(> input[type='checkbox']:checked) > div,
		&:focus-within > div {
			@apply grid-rows-[1fr];
		}
		> label {
			@apply flex cursor-pointer flex-wrap items-center gap-x-2 xl:hidden;
			> svg {
				@apply h-8 w-8 fill-current;
			}
			> span {
				@apply fill-current text-2xl;
			}
		}
		> input[type='checkbox'] {
			@apply hidden;
		}
		> div {
			@apply grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 xl:block;
			> nav {
				@apply overflow-hidden;
			}
		}
		.toc-level {
			@apply border-l-2 border-stone-400 pl-4 dark:border-neutral-700;
		}
		.toc-level-1 {
			@apply border-0 pl-0;
		}
	}
</style>
