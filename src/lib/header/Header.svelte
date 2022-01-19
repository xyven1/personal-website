<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
	import { mdiGithub } from '@mdi/js';

	const routes = [
		{
			name: 'Work',
			path: '/'
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
</script>

<header class="sticky top-0 z-50 flex items-center bg-black overflow-x-hidden h-10 sm:h-min">
	<nav class="grow sm:ml-14">
		<ul class="flex text-2xl sm:text-4xl sm:justify-center">
			{#each routes as route}
				<li class:text-accent={$page.url.pathname === route.path}>
					<a sveltekit:prefetch href={route.path}>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex-none w-14 justify-center hidden sm:flex">
		<a href="https://github.com/Xyven1">
			<Icon size={2} path={mdiGithub} />
		</a>
	</div>
</header>
