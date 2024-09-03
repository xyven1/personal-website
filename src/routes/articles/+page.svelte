<script lang="ts">
	import { goto } from '$app/navigation';
	import { type Post } from '$lib/types/posts';
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
	import Tag from '$lib/Tag.svelte';
	import ufuzzy from '@leeoniya/ufuzzy';
	import { mdiLoading, mdiMagnify } from '@mdi/js';

	export let data;

	const query = $page.url.searchParams.get('search') || '';
	const uf = new ufuzzy({
		intraIns: 1
	});

	function calcPostStrings(posts: Post[]) {
		return posts.map((p) => {
			const date = new Date(p.date);
			return [
				p.title,
				p.description,
				...p.tags,
				date.toLocaleDateString(),
				date.toLocaleDateString(undefined, {
					weekday: 'long',
					month: 'long'
				})
			].join(' ');
		});
	}

	let posts = data.posts;
	let postStrings = calcPostStrings(posts);

	let allLoaded = query === '';
	let shownPosts = posts;
	let loading = false;
	async function updatePosts(search: string) {
		if (!allLoaded) {
			if (loading) return;
			loading = true;
			const resp = await fetch(`/api/articles`);
			posts = await resp.json();
			postStrings = calcPostStrings(posts);
			loading = false;
			allLoaded = true;
		}
		if (search === '') {
			shownPosts = posts;
			// await goto(``);
			return;
		}
		// await goto(`?search=${search}`);
		const [idxs, ,] = uf.search(postStrings, search, 1);
		if (idxs === null || idxs.length === 0) {
			shownPosts = [];
			return;
		}
		shownPosts = idxs.map((i) => posts[i]);
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
			e.preventDefault();
			const input = document.getElementById('search');
			if (!(input instanceof HTMLInputElement)) return;
			input.focus();
		}
	}
</script>

<svelte:head>
	<title>Articles - Blake Bruell</title>
	<meta
		name="description"
		content="Blake Bruell is a software engineer persuing a Master's degree in CS with a focus on AI, with an interest in programming languages and systems programming."
	/>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<article class="relative flex w-full flex-grow flex-col">
	<form
		class="sticky top-8 -mt-4 mb-4 flex justify-center gap-x-4 bg-stone-300 pb-1 pt-6 dark:bg-neutral-900"
		action="/articles"
		method="get"
		on:submit={(e) => {
			e.preventDefault();
		}}
	>
		<div
			class="dark:focus-within:border-daccent flex w-full max-w-[120ch] appearance-none border-b-2 border-current bg-inherit transition-all focus-within:border-accent"
		>
			<Icon path={mdiMagnify} class="inline" />
			<input
				type="search"
				id="search"
				autocomplete="off"
				name="search"
				class="flex-grow appearance-none bg-inherit text-current outline-none [&::-webkit-search-cancel-button]:appearance-none"
				placeholder="Search articles"
				value={query}
				on:input={(e) => {
					e.preventDefault();
					if (!(e.target instanceof HTMLInputElement)) return;
					updatePosts(e.target.value);
				}}
			/>
		</div>
		<button type="submit" class="uppercase">Search</button>
	</form>
	{#if loading}
		<div class="flex justify-center gap-x-2">
			<Icon class="animate-spin" size={2} path={mdiLoading} aria-label="loading" />
		</div>
	{:else if shownPosts.length === 0}
		<p class="text-center">No articles found</p>
	{:else}
		<ol class="flex flex-grow flex-col justify-center space-y-8">
			{#each shownPosts as post}
				<li class="border-b-2 border-neutral-700">
					<a href="/articles/{post.slug}" class="large-anchor sm:flex sm:items-center">
						<div class="grow">
							<h2
								class="large-anchor-link min-w-[min(calc(100vw-32px),400px)] bg-transparent text-3xl"
							>
								{post.title}
							</h2>
							<p class="text-stone-600 dark:text-neutral-400">
								{new Date(post.date).toLocaleDateString()}
							</p>
							<p>{post.description}</p>
						</div>
						<div class="sm:flex sm:flex-col sm:items-end">
							{#each post.tags.slice(0, 2) as category}
								<Tag text={category} />
							{/each}
						</div>
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</article>
