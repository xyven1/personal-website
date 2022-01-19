<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<div class="text-white flex flex-col min-h-screen bg-black">
	<Header />

	<main class="flex-grow px-8 sm:px-16 max-w-6xl mx-auto flex">
		<slot />
	</main>

	<footer class="text-center">
		<p>Blake Bruell 2022</p>
	</footer>
</div>
