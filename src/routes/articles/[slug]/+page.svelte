<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { mdiFileCodeOutline } from '@mdi/js';

	export let data;
	let source = `https://github.com/xyven1/personal-website/tree/master/src/articles/${data.meta.slug}.md`;
</script>

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
	<script>
		function clear(tocLinks) {
			tocLinks.forEach((l) => {
				l.classList.remove('toc-link-active');
				l.classList.add('toc-link-inactive');
			});
		}
		function update() {
			if (window.innerWidth < 1280) {
				return;
			}
			const anchors = Array.from(document.querySelectorAll('.article-heading'));
			const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
			if (!anchors || tocLinks.length != anchors.length) return;
			for (let i = 1; i < anchors.length; i++) {
				if (anchors[i].offsetTop > window.scrollY + 65) {
					anchors.forEach((a) => (a.style.color = ''));
					if (tocLinks[i - 1].classList.contains('toc-link-active')) return;
					clear(tocLinks);
					tocLinks[i - 1].classList.add('toc-link-active');
					tocLinks[i - 1].classList.remove('toc-link-inactive');
					window.history.replaceState(
						null,
						null,
						document.location.pathname + '#' + anchors[i - 1].href.split('#').pop()
					);
					return;
				}
			}
		}
		window.onload = update;
		window.addEventListener('scroll', update);
		let prevWindowWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1280 && prevWindowWidth >= 1280) {
				clear(Array.from(document.querySelectorAll('.toc-link')));
			} else if (window.innerWidth >= 1280 && prevWindowWidth < 1280) {
				console.log('update');
				update();
			}
			prevWindowWidth = window.innerWidth;
		});
	</script>
</svelte:head>

<article class="max-w-full">
	<section class="border-b-[3px] border-neutral-800 pb-2">
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<div class="flex flex-wrap">
			<div>
				<p class="text-neutral-400">
					{new Date(data.meta.date).toLocaleDateString()}
					{#if data.meta.updated}
						(<i>Updated: {new Date(data.meta.updated).toLocaleDateString()}</i>)
					{/if}
				</p>
				<div class="-m-1">
					{#each data.meta.tags as category}
						<span class="m-1 inline-block rounded-full bg-sky-800 p-1">{category}</span>
					{/each}
				</div>
			</div>
			<a class="ml-auto self-end" href={source}
				><Icon path={mdiFileCodeOutline} class="inline" />Source</a
			>
		</div>
	</section>
	<div class="xl:flex xl:items-start xl:gap-8">
		<svelte:component this={data.content} class="xl:flex-1" {source} />
	</div>
</article>

<style lang="postcss">
	:global(.toc-section) {
		@apply xl:sticky xl:top-12 xl:max-w-xs xl:flex-initial;
	}
</style>
