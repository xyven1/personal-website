<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center">
	<h2 class="text-3xl">
		{$page.error?.message || $page.error}
	</h2>
	<h3 class="text-center text-xl">
		isValidPath("{$page.url.pathname}") == false
		<br />
		<a href="/">navigate("/")</a>
	</h3>
</div>
