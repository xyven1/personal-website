<script lang="ts">
	import { Icon, Tag } from '$lib/components';
	import { mdiFileCodeOutline } from '@mdi/js';

	export let data;
	const source = `https://github.com/xyven1/personal-website/blob/prod/articles/${data.meta.slug}.md`;
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
			});
		}
		const anchors = [];
		Array.from(document.querySelectorAll('.article-heading'));
		const tocLinks = [];
		Array.from(document.querySelectorAll('.toc-link'));
		function update() {
			if (window.innerWidth < 1280) {
				return;
			}
			if (anchors.length === 0 || tocLinks.length != anchors.length) return;
			for (let i = 1; i < anchors.length; i++) {
				if (anchors[i].offsetTop > window.scrollY + 65) {
					anchors.forEach((a) => (a.style.color = ''));
					if (tocLinks[i - 1].classList.contains('toc-link-active')) return;
					clear(tocLinks);
					tocLinks[i - 1].classList.add('toc-link-active');
					return;
				}
			}
		}
		window.onload = () => {
			anchors.push(...document.querySelectorAll('.article-heading'));
			tocLinks.push(...document.querySelectorAll('.toc-link'));
			update();
		};
		window.addEventListener('scroll', update);
		let prevWindowWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1280 && prevWindowWidth >= 1280) {
				clear(Array.from(document.querySelectorAll('.toc-link')));
			} else if (window.innerWidth >= 1280 && prevWindowWidth < 1280) {
				update();
			}
			prevWindowWidth = window.innerWidth;
		});
	</script>
</svelte:head>

<article>
	<section class="relative border-b-[3px] border-neutral-800 pb-2">
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<div class="flex flex-wrap">
			<div>
				<p class="text-stone-600 dark:text-neutral-400">
					{new Date(data.meta.date).toLocaleDateString()}
					{#if data.meta.updated}
						(<i>Updated: {new Date(data.meta.updated).toLocaleDateString()}</i>)
					{/if}
				</p>
				<div class="-m-1">
					{#each data.meta.tags as category}
						<Tag text={category} />
					{/each}
				</div>
			</div>
			<a class="ml-auto self-end" href={source}>
				<Icon path={mdiFileCodeOutline} class="inline" />
				Source
			</a>
		</div>
	</section>
	<div class="xl:flex xl:items-start xl:gap-8">
		<svelte:component this={data.content} class="my-4 xl:flex-1" {source} />
	</div>
</article>

<style lang="postcss">
	:global(.toc-section) {
		@apply xl:sticky xl:top-12 xl:max-w-[36ch] xl:flex-initial;
	}
</style>
