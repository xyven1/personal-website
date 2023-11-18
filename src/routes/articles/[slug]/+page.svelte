<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		function update() {
			const anchors = Array.from(document.querySelectorAll('.article-heading'));
			const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
			if (!anchors || tocLinks.length != anchors.length) return;
			for (let i = 1; i < anchors.length; i++) {
				if (anchors[i].offsetTop > window.scrollY + 65) {
					anchors.forEach((a) => (a.style.color = ''));
					if (tocLinks[i - 1].classList.contains('toc-link-active')) return;
					tocLinks.forEach((l) => {
						l.classList.remove('toc-link-active');
						l.classList.add('toc-link-inactive');
					});
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
		update();
		window.addEventListener('scroll', update);
	});

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="max-w-full">
	<section>
		<h1 class="text-4xl sm:text-5xl">{data.meta.title}</h1>
		<p class="text-neutral-400">{data.meta.date}</p>
		<div class="-m-1">
			{#each data.meta.tags as category}
				<span class="m-1 inline-block rounded-full bg-sky-800 p-1">{category}</span>
			{/each}
		</div>
	</section>
	<div class="xl:flex xl:items-start xl:gap-8">
		<svelte:component this={data.content} class="xl:flex-1" />
	</div>
</article>

<style lang="postcss">
	:global(.toc-section) {
		@apply xl:sticky xl:top-12 xl:max-w-xs xl:flex-initial;
	}
</style>
