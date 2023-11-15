<script lang="ts">
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="max-w-full">
	<section>
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<p class="text-neutral-400">{data.meta.date}</p>
		<div class="-m-1">
			{#each data.meta.tags as category}
				<span class="m-1 inline-block rounded-full bg-sky-800 p-1">{category}</span>
			{/each}
		</div>
	</section>

	<svelte:component this={data.content} />
</article>
