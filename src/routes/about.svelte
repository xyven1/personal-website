<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>
<h1 class="text-2xl m-auto text-center">
	I am currently pursuing my bachelor's degree in Computer Science at WPI, with plans to complete
	a 4 year BS/MS program with a focus on ML. I have been coding for nearly 10 years, starting with
	software for Arduino and have been coding avidly since. Nearly all of my programming knowledge
	is self-taught through personal projects and lectures on YouTube, and I have learned new
	languages, techniques, and skills quickly and without help from others.
</h1>