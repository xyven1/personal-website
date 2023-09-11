<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center">
	<h2 class="text-3xl">
		{$page.error?.message || $page.error}
  </h2>
	<h3 class="text-xl text-center">
		"{$page.params.project}" is not valid project. The project may have been moved
		or deleted.<a href="/">Check here for a list of all my projects.</a>
	</h3>
</div>