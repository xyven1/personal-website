<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<div class="flex min-h-full flex-col bg-black text-white">
	<Header />

	<main
		class="flex w-full max-w-6xl flex-grow flex-col items-center justify-center self-center px-8 sm:px-16"
	>
		<slot />
	</main>

	<footer class="text-center">
		<p>Blake Bruell 2022</p>
	</footer>
</div>
