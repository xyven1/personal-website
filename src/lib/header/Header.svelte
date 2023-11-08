<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
	import { mdiGithub } from '@mdi/js';

	const routes = [
		{
			name: 'Projects',
			path: '/projects'
		},
		{
			name: 'Blogs',
			path: '/blogs'
		},
		{
			name: 'About',
			path: '/about'
		},
		{
			name: 'Contact',
			path: '/contact'
		}
	];
	let sideMenu = false;
	function closeSideMenu() {
		sideMenu = false;
	}
	function openSideMenu() {
		sideMenu = true;
	}
</script>

<header class="sticky top-0 z-50 flex h-12 overflow-clip overflow-x-hidden bg-black">
	<input class="side-menu peer hidden" type="checkbox" id="side-menu" bind:checked={sideMenu} />
	<label class="hamb group z-10 cursor-pointer p-5 sm:hidden" for="side-menu">
		<span
			class="hamb-line relative block h-0.5 w-6 bg-white
			group-checked/menu:bg-red-500
			"
		>
		</span>
	</label>
	<span class="grow sm:w-12 sm:grow-0"></span>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<nav
		class="
			fixed h-full max-h-0 w-full overflow-hidden bg-black
			bg-opacity-80 transition-all duration-300 peer-[.side-menu]:peer-checked:max-h-full
			sm:relative sm:max-h-none sm:bg-transparent
		"
		on:click={closeSideMenu}
	>
		<ul class="pt-12 text-3xl sm:flex sm:justify-center sm:pt-0 md:text-4xl">
			{#each routes as route}
				<li class:text-accent={$page.url.pathname === route.path}>
					<a href={route.path} on:focusin={openSideMenu} on:focusout={closeSideMenu}>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex w-12 justify-center">
		<a href="https://github.com/Xyven1" aria-label="Github Account">
			<Icon size={2} path={mdiGithub} />
		</a>
	</div>
</header>

<style>
	.hamb-line::before,
	.hamb-line::after {
		@apply absolute block h-full w-full bg-white transition-all duration-300;
		content: '';
	}

	.hamb-line::before {
		top: 5px;
	}

	.hamb-line::after {
		top: -5px;
	}

	#side-menu:checked ~ .hamb .hamb-line {
		background: transparent;
	}

	#side-menu:checked ~ .hamb .hamb-line::before {
		transform: rotate(-45deg);
		top: 0;
	}

	#side-menu:checked ~ .hamb .hamb-line::after {
		transform: rotate(45deg);
		top: 0;
	}
</style>
