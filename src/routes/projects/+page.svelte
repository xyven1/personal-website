<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { Image } from '$lib/components';
	import { blurb, name } from '$lib/data/info';

	export let data;
</script>

<svelte:head>
	<title>Projects - {name}</title>
	<meta name="description" content={blurb} />
</svelte:head>

<article class="flex w-full max-w-6xl flex-col">
	{#each data.projects as project}
		<section class="link p-4">
			<a href="/projects/{project.slug}">
				<h2 class="bg-transparent text-3xl">{project.name}</h2>
				<p>{project.short_description}</p>
			</a>
			{#if project.images.length > 1}
				<Splide
					hasTrack={false}
					options={{
						autoplay: project.images.length > 1,
						resetProgress: false,
						interval: 5000,
						pauseOnHover: true,
						type: 'loop',
						arrows: project.images.length > 1,
						pagination: project.images.length > 1
					}}
					class="jsonly [&:not(.is-initialized)]:h-[80vh]"
				>
					<SplideTrack class="overflow-hidden rounded-xl bg-stone-400 dark:bg-neutral-800">
						{#each project.images as src}
							<SplideSlide class="mb-8 flex justify-center align-middle">
								<a href="/projects/{project.slug}">
									<Image {src} class="max-h-[80vh]" />
								</a>
							</SplideSlide>
						{/each}
					</SplideTrack>
				</Splide>
				<noscript>
					<a href="/projects/{project.slug}">
						<Image src={project.images[0]} class="max-h-[80vh]" />
					</a>
				</noscript>
			{:else if project.images.length === 1}
				<a href="/projects/{project.slug}">
					<Image src={project.images[0]} class="max-h-[80vh]" />
				</a>
			{/if}
		</section>
	{/each}
</article>
