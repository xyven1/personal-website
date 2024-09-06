<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
	import { mdiGithub } from '@mdi/js';

	export let routes: {
		name: string;
		path: string;
	}[];
</script>

<header class="sticky top-0 z-50 flex h-12 overflow-clip overflow-x-hidden bg-inherit shadow">
	<button class="hamb z-10 cursor-pointer sm:hidden" tabindex="-1">
		<span class="hamb-line relative m-5 block h-0.5 w-6" />
	</button>

	<span class="grow sm:max-w-[3rem]"></span>

	<nav
		class="fixed h-full max-h-0 w-full overflow-hidden
		bg-stone-300 !bg-opacity-90 shadow-[0_1px] shadow-current transition-[max-height] duration-300
		sm:relative sm:max-h-none sm:w-auto
		sm:grow sm:!bg-transparent dark:bg-neutral-900"
	>
		<ul
			class="flex h-full flex-col gap-y-2 px-2 pt-12 text-3xl sm:flex-row sm:items-center sm:justify-center sm:gap-x-8 sm:px-0 sm:pt-0 md:text-4xl"
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

	<div class=" w-12 justify-center">
		<a href="https://github.com/Xyven1" aria-label="Github Account">
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

	:--hamb-focus ~ nav {
		@apply max-h-full;
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
