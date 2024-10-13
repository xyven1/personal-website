<script lang="ts">
	import { Icon, Tag } from '$lib/components';
	import { mdiChevronRight, mdiFileCodeOutline } from '@mdi/js';
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
	<meta property="og:image" content="https://xyven.dev/favicon.png" />
	<!-- Twitter -->
	<meta property="twitter:title" content={data.meta.title} />
	<meta property="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<article class="max-w-full py-8">
	<section class="border-b-[3px] border-neutral-800 pb-2">
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<p class="flex flex-wrap gap-x-2 text-stone-600 dark:text-neutral-400">
			<span>{new Date(data.meta.date).toLocaleDateString()}</span>
			{#if data.meta.updated}
				<span>(<i>Updated: {new Date(data.meta.updated).toLocaleDateString()}</i>)</span>
			{/if}
			<span>~ {data.meta.readTime} min read</span>
		</p>
		{#if data.meta.history.length > 0}
			<div class="group">
				<label
					class="flex cursor-pointer items-center text-stone-600 hocus:text-accent dark:text-neutral-400 hocus:dark:text-daccent"
					for="history"
				>
					<input type="checkbox" id="history" hidden />
					<span>History</span>
					<Icon
						path={mdiChevronRight}
						size={1.35}
						class="transition-[transform] group-focus-within:rotate-90 group-has-[input:checked]:rotate-90"
					/>
				</label>
				<div
					class="grid grid-rows-[0fr] transition-[grid-template-rows] group-focus-within:grid-rows-[1fr] group-has-[input:checked]:grid-rows-[1fr]"
				>
					<div class="overflow-hidden">
						<ol class="px-1">
							{#each data.meta.history as commit}
								<li
									class="mb-3 border-l-2 border-stone-600 px-1 leading-snug dark:border-neutral-400"
								>
									<div>
										{new Date(commit.date).toLocaleString()} - {commit.message}
									</div>
									<div class="space-x-1">
										{#if commit.liveUrl !== ''}
											<a href={`${commit.liveUrl}`}> Live Link </a>
										{/if}
										<a href={`https://github.com/xyven1/personal-website/commit/${commit.hash}`}>
											View Diff
										</a>
									</div>
								</li>
							{/each}
						</ol>
					</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-wrap gap-2">
			<div class="mr-auto flex flex-wrap gap-2">
				{#each data.meta.tags as category}
					<Tag text={category} link={`/articles/search/?tag=${category}`} />
				{/each}
			</div>
			<a class="self-end" href={source}>
				<Icon path={mdiFileCodeOutline} class="inline" size={1.5} />
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
