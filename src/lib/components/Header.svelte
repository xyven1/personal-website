<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '$lib/components';
	import { mdiGithub } from '@mdi/js';

	export let routes: {
		name: string;
		path: string;
	}[];
</script>

<header class="sticky top-0 z-50 flex h-12 overflow-clip overflow-x-hidden bg-inherit shadow">
	<button class="hamb z-10 cursor-pointer sm:hidden" tabindex="-1" aria-label="Menu">
		<span class="hamb-line relative m-5 block h-0.5 w-6"></span>
	</button>

	<span class="grow sm:max-w-[3rem]"></span>

	<nav
		class="pointer-events-none fixed h-full w-full overflow-hidden bg-stone-300
		!bg-opacity-95 opacity-0 transition-[opacity] duration-[400ms]
		supports-[display:grid]:!bg-opacity-50 supports-[display:grid]:backdrop-blur
		sm:pointer-events-auto sm:relative sm:max-h-full sm:w-auto
		sm:grow sm:!bg-transparent sm:opacity-100 sm:transition-none dark:bg-neutral-900"
	>
		<ul
			class="flex h-full flex-col gap-y-2 px-2 pt-12 text-3xl sm:flex-row
			sm:items-center sm:justify-center sm:gap-x-8 sm:px-0 sm:pt-0 md:text-4xl"
		>
			{#each routes as route}
				<li class={$page.url.pathname === route.path ? 'text-accent dark:text-daccent' : ''}>
					<a href={route.path}>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="w-12 justify-center">
		<a href="https://github.com/xyven1" aria-label="Github Account">
			<Icon size={2} path={mdiGithub} />
		</a>
	</div>
</header>

<style lang="postcss">
	@custom-selector :--hamb-focus .hamb:focus, .hamb:has(~ nav a:focus);
	.hamb-line {
		@apply bg-stone-950 transition-[background-color] duration-300 before:top-1.5 after:-top-1.5 dark:bg-neutral-200;
	}
	.hamb-line::before,
	.hamb-line::after {
		@apply absolute block h-full w-full bg-black transition-[transform,top] duration-300 dark:bg-white;
		content: '';
	}

	:global(body:has(.hamb:focus)) {
		@apply overflow-hidden;
	}

	:--hamb-focus ~ nav {
		@apply pointer-events-auto opacity-100;
	}

	:--hamb-focus {
		@apply pointer-events-none;
	}

	:--hamb-focus .hamb-line {
		@apply bg-transparent;
	}

	:--hamb-focus .hamb-line::before {
		@apply top-0 -rotate-45;
	}

	:--hamb-focus .hamb-line::after {
		@apply top-0 rotate-45;
	}
</style>
