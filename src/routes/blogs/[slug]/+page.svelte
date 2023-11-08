<script lang="ts">
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
	<!-- Title -->
	<hgroup>
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<p>Published at {data.meta.date}</p>
	</hgroup>

	<!-- Tags -->
	<div class="space-x-2">
		{#each data.meta.tags as category}
			<span class="rounded-full bg-slate-700 p-1">#{category}</span>
		{/each}
	</div>

	<!-- Post -->
	<div>
		<svelte:component this={data.content} />
	</div>
</article>
