<script lang="ts">
	import { Image } from '$lib/components';

	export let data;
</script>

<svelte:head>
	<title>{data.project.name}</title>
	<meta name="description" content={data.project.short_description} />
</svelte:head>
<article class="flex max-w-6xl flex-col items-center">
	<hgroup class="text-center">
		<h1 class="text-4xl sm:text-5xl">
			{data.project.name}
		</h1>
		<p class="text-3xl">
			{#if data.project.github_url}
				(<a class="mx-0" href={data.project.github_url}>Github repo</a>)
			{/if}
		</p>
		{#if data.project.short_description}
			<p class="text-xl">{data.project.short_description}</p>
		{/if}
	</hgroup>
	{#if data.project.embed_info}
		<iframe
			width="100%"
			class="w-full flex-grow dark:bg-neutral-200"
			title={data.project.name}
			src={data.project.embed_info.path}
			style:max-height={data.project.embed_info.max_height + 'px'}
			style:max-width={data.project.embed_info.max_width + 'px'}
			style:min-height={data.project.embed_info.min_height + 'px'}
		></iframe>
	{:else if data.project.images.length > 0}
		<Image src={data.project.images[0]} class="max-h-[80vh]" />
	{/if}
	{#if data.project.long_description}
		<div class="indent-8 text-lg sm:text-justify">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.project.long_description}
		</div>
	{/if}
	{#if data.project.images.length > 1}
		<section class="space-y-8 pt-8">
			<h2 class="text-center text-3xl">Images</h2>
			{#each data.project.images as src}
				<div class="flex justify-center">
					<Image {src} class="max-h-[80vh]" />
				</div>
			{/each}
		</section>
	{/if}
</article>
