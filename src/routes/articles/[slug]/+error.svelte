<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center text-center">
	<h2 class="text-3xl">
		{$page.error?.message || $page.error}
	</h2>
	<h3 class="text-xl">
		"{$page.params.slug}" is not valid blog. The blog may have been moved or deleted.
		<a href="/articles">Check here for a list of all my posts.</a>
	</h3>
</div>
