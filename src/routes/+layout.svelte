<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
// This has to come after tailwind
	import '@splidejs/svelte-splide/css';
	// finally override some svelte-splide styles
	import '../splide-overrides.css';
	// preload fonts

	import f from '@fontsource/cutive-mono/files/cutive-mono-latin-400-normal.woff2';
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
			path: '/articles'
		},
		{
			name: 'Contact',
			path: '/contact'
		}
	];
	routes.push();
</script>

<svelte:head>
	<noscript>
		<style>
			.jsonly {
				display: none;
			}
		</style>
	</noscript>
	<meta name="color-scheme" content="dark" />
	<link rel="preload" as="font" href={f} type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="flex min-h-full flex-col bg-neutral-900 text-neutral-200">
	<Header {routes} />

	<main
		class="flex w-full flex-grow flex-col items-center justify-center self-center px-4 sm:px-16"
	>
		<slot />
	</main>

	<footer class="text-center">
		<a href="/rss.xml"><Icon path={mdiRss} class="inline" size={0.8} />RSS Feed</a>
		|
		<span>© 2022 Blake Bruell</span>
	</footer>
</div>
