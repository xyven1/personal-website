<script lang="ts">
	import { Icon, Tag } from '$lib/components';
	import { mdiFileCodeOutline } from '@mdi/js';
	import { onMount } from 'svelte';

	export let data;
	const source = `https://github.com/xyven1/personal-website/blob/prod/articles/${data.meta.slug}.md`;

	const anchors: HTMLElement[] = [];
	const tocLinks: HTMLElement[] = [];
	function update(scrollY: number) {
		if (anchors.length === 0 || tocLinks.length != anchors.length) return;
		for (let i = 1; i < anchors.length; i++) {
			if (anchors[i].offsetTop > scrollY + 65) {
				anchors.forEach((a) => (a.style.color = ''));
				if (tocLinks[i - 1].classList.contains('toc-link-active')) return;
				tocLinks.forEach((l) => l.classList.remove('toc-link-active'));
				tocLinks[i - 1].classList.add('toc-link-active');
				return;
			}
		}
	}
	let prevWindowWidth = 0;

	onMount(() => {
		anchors.push(
			...[
				...document.querySelectorAll<HTMLElement>('.article-heading-link'),
				...document.querySelectorAll<HTMLElement>('#comments')
			]
		);
		tocLinks.push(...document.querySelectorAll<HTMLElement>('.toc-link'));
		update(scrollY);
	});
</script>

<svelte:window
	on:scroll={(e) => {
		if (e.currentTarget.innerWidth < 1280) return;
		update(e.currentTarget.scrollY);
	}}
	on:resize={(e) => {
		if (e.currentTarget.innerWidth < 1280 && prevWindowWidth >= 1280)
			tocLinks.forEach((l) => l.classList.remove('toc-link-active'));
		else if (e.currentTarget.innerWidth >= 1280 && prevWindowWidth < 1280)
			update(e.currentTarget.scrollY);
		prevWindowWidth = e.currentTarget.innerWidth;
	}}
/>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:url" content={`https://xyven.dev/articles/${data.meta.slug}`} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={new Date(data.meta.date).toISOString()} />
	{#if data.meta.updated}
		<meta property="article:modified_time" content={new Date(data.meta.updated).toISOString()} />
	{/if}
	<meta property="og:locale" content="en_US" />
	<!-- Twitter -->
	<meta property="twitter:title" content={data.meta.title} />
	<meta property="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<article class="max-w-full py-4">
	<section class="relative border-b-[3px] border-neutral-800 pb-2">
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<p class="flex flex-wrap gap-x-2 text-stone-600 dark:text-neutral-400">
			<span>{new Date(data.meta.date).toLocaleDateString()}</span>
			{#if data.meta.updated}
				<span>(<i>Updated: {new Date(data.meta.updated).toLocaleDateString()}</i>)</span>
			{/if}
		</p>
		<div class="flex flex-wrap gap-2">
			<div class="mr-auto">
				<div class="-m-1">
					{#each data.meta.tags as category}
						<Tag text={category} />
					{/each}
				</div>
			</div>
			<a class="self-end" href={source}>
				<Icon path={mdiFileCodeOutline} class="inline" />
				Source
			</a>
		</div>
	</section>
	<div class="xl:flex xl:items-start xl:gap-8">
		<svelte:component this={data.content} class="mt-4 xl:flex-1" {source} />
	</div>
</article>

<style lang="scss">
	:global {
		.toc-section {
			@apply xl:sticky xl:top-16 xl:max-w-[36ch] xl:flex-initial;
		}
		.toc-link-active {
			@apply text-accent dark:text-daccent;
		}
	}
</style>
