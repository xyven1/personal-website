<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center text-center">
	<h1 class="text-3xl">
		{$page.error?.message || $page.error}
	</h1>
	{#if $page.status === 404}
		<p class="text-xl">
			isValidPath("{$page.url.pathname}") == false
			<br />
			<a href="/">navigate("/")</a>
		</p>
	{:else if $page.status === 500}
		<p class="text-xl">How strange...</p>
	{/if}
</div>
