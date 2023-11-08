<script lang="ts">
	import Img from '@zerodevx/svelte-img';

	export let data;
</script>

<svelte:head>
	<title>{data.project.name}</title>
	<meta name="description" content={data.project.short_description} />
</svelte:head>
<section class="flex flex-col items-center">
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
			class:flex-grow={true}
			class:w-full={true}
			class="bg-neutral-200"
			title={data.project.name}
			src={data.project.embed_info.path}
			style:max-height={data.project.embed_info.max_height + 'px'}
			style:max-width={data.project.embed_info.max_width + 'px'}
			style:min-height={data.project.embed_info.min_height + 'px'}
		/>
	{:else if data.project.images.length > 0}
		{#if typeof data.project.images[0] === 'string' && data.project.images[0].endsWith('.svg')}
			<img
				src={data.project.images[0]}
				alt={data.project.images[0].substring(data.project.images[0].lastIndexOf('/'))}
			/>
		{:else}
			<Img src={data.project.images[0]} />
		{/if}
	{/if}
	{#if data.project.long_description}
		<div class="text-justify indent-8 text-lg">{@html data.project.long_description}</div>
	{/if}
	{#if data.project.images.length > 1}
		<section class="space-y-8 pt-8">
			<h2 class="text- text-center text-3xl">Images</h2>
			{#each data.project.images as image}
				<div class="flex justify-center">
					{#if typeof image === 'string' && image.endsWith('.svg')}
						<img src={image} alt={image.substring(image.lastIndexOf('/'))} />
					{:else}
						<Img src={image} />
					{/if}
				</div>
			{/each}
		</section>
	{/if}
</section>
