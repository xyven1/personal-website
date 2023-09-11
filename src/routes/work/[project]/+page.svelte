<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.project.name}</title>
</svelte:head>
<div class="flex flex-col items-center">
	<h2 class="text-3xl text-center">
		{data.project.name}
		{#if data.project.github_url}
			(<a class="mx-0" href={data.project.github_url}>Github repo</a>)
		{/if}
	</h2>
	{#if data.project.short_description}
		<p class="text-xl">{data.project.short_description}</p>
	{/if}
	{#if data.project.embed_info}
		<iframe
			class:flex-grow={true}
			class:w-full={true}
			class="bg-neutral-200"
			title={data.project.name}
			src={data.project.embed_info.path}
			style:max-height={data.project.embed_info.max_height + "px"}
			style:max-width={data.project.embed_info.max_width + "px"}
			style:min-height={data.project.embed_info.min_height + "px"}
		/>
	{:else if data.project.image}
		<picture class="flex justify-center">
			<img src="/images/{data.project.image}" alt={data.project.name} />
		</picture>
	{/if}
	{#if data.project.long_description}
		<div class="text-justify text-lg indent-8">{@html data.project.long_description}</div>
	{/if}
</div>
