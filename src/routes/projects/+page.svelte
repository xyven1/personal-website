<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import Img from '@zerodevx/svelte-img';

	export let data;
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="My projects" />
</svelte:head>

<article class="flex w-full flex-col">
	{#each data.projects as project}
		<section class="link p-4">
			<a href="/projects/{project.slug}">
				<h2 class="bg-transparent text-3xl">{project.name}</h2>
				<p>{project.short_description}</p>
			</a>
			{#if project.images.length > 0}
				<Splide
					hasTrack={false}
					options={{
						// autoplay: project.images.length > 1,
						resetProgress: false,
						interval: 5000,
						pauseOnHover: true,
						type: 'loop',
						arrows: project.images.length > 1,
						pagination: project.images.length > 1
					}}
					class="jsonly"
				>
					<SplideTrack>
						{#each project.images as image}
							<SplideSlide class="mb-8 flex justify-center align-middle">
								<a href="/projects/{project.slug}">
									{#if typeof image === 'string' && image.endsWith('.svg')}
										<img class="h-full" src={image} alt={image.substring(image.lastIndexOf('/'))} />
									{:else}
										<Img src={image} />
									{/if}
								</a>
							</SplideSlide>
						{/each}
					</SplideTrack>
					<div class="splide__progress">
						<div class="splide__progress__bar"></div>
					</div>
				</Splide>
				<noscript>
					<a href="/projects/{project.slug}">
						{#if typeof project.images[0] === 'string' && project.images[0].endsWith('.svg')}
							<img class="h-full" src={project.images[0]} />
						{:else}
							<Img src={project.images[0]} />
						{/if}
					</a>
				</noscript>
			{/if}
		</section>
	{/each}
</article>
