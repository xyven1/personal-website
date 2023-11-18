<script>
	import { page } from '$app/stores';
</script>

<section class="flex max-w-xl flex-col items-center justify-center text-center">
	<h2 class="text-3xl">
		{$page.error?.message || $page.error}
	</h2>
	<h3 class="text-xl">
		"{$page.params.slug}" is not valid project. The project may have been moved or deleted.
		<hr class="border-neutral-700" />
		<a href="/projects">Check here for a list of all my projects.</a>
	</h3>
</section>
