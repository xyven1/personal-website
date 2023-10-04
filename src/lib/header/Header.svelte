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

<header class="sticky top-0 z-50 flex h-10 items-center overflow-clip overflow-x-hidden bg-black">
	<nav class="grow sm:ml-14">
		<ul class="flex text-2xl sm:justify-center sm:text-4xl">
			{#each routes as route}
				<li class:text-accent={$page.url.pathname === route.path}>
					<a href={route.path}>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="w-14 flex-none justify-center sm:flex">
		<a href="https://github.com/Xyven1" aria-label="Github Account">
			<Icon size={2} path={mdiGithub} />
		</a>
	</div>
</header>
