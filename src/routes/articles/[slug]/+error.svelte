<script>
	import { page } from '$app/stores';
</script>

<div class="flex max-w-xl flex-col items-center justify-center text-center">
	<h2 class="text-3xl">
		{$page.error?.message || $page.error}
	</h2>
	<h3 class="text-xl">
		"{$page.params.slug}" is not valid article. The article may have been moved or deleted.
		<hr class="border-neutral-700" />
		<a href="/articles">Check here for a list of all my articles.</a>
	</h3>
</div>
