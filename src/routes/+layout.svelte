<script lang="ts">
	import { Header, Icon } from '$lib/components';
	import '../app.css';
	// This has to come after tailwind
	import '@splidejs/svelte-splide/css';
	// finally override some svelte-splide styles
	import '../splide-overrides.css';
	// preload fonts

	import f from '@fontsource/fira-sans/files/fira-sans-latin-400-normal.woff2';
	import { mdiRss } from '@mdi/js';

	const routes = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Projects',
			path: '/projects'
		},
		{
			name: 'Articles',
			path: '/articles',
			pattern: '/articles(/search)?'
		},
		{
			name: 'Contact',
			path: '/contact'
		}
	];
</script>

<svelte:head>
	<noscript>
		<style>
			.jsonly {
				display: none;
			}
		</style>
	</noscript>
	<link rel="preload" as="font" href={f} type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="app flex min-h-full flex-col">
	<Header {routes} />

	<main
		class="flex w-full flex-grow flex-col items-center justify-center self-center px-4 sm:px-16"
	>
		<slot />
	</main>

	<footer class="text-center">
		<a href="/rss.xml"><Icon path={mdiRss} class="inline" size={1.5} />RSS Feed</a>
		|
		<span>© 2022-2024 Blake Bruell</span>
	</footer>
</div>
