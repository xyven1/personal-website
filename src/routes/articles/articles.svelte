<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import type { Post } from '$lib/types';
	import { Icon, Tag } from '$lib/components';
	import ufuzzy from '@leeoniya/ufuzzy';
	import { mdiLoading, mdiMagnify } from '@mdi/js';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';

	export let posts: Post[];
	export let query = '';
	let search: HTMLInputElement;

	const uf = new ufuzzy({
		intraIns: 1
	});

	function formatSearch(search: string) {
		return `/articles${search && `/search?q=${search}`}`;
	}

	$: currentSearch = query;
	$: (async () => {
		if (!browser) return;
		await tick();
		replaceState(formatSearch(currentSearch), {});
	})();
	$: postStrings = posts.map((p) => {
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
	$: shownPosts =
		currentSearch === ''
			? posts
			: (uf.search(postStrings, currentSearch, 1)[0] ?? []).map((i) => posts[i]);

	let allLoaded = query === '';
	let loadingAllPosts = false;
	async function updateSearch(search: string) {
		if (search === currentSearch) return;
		currentSearch = search;
		if (!allLoaded) {
			if (loadingAllPosts) return;
			loadingAllPosts = true;
			const resp = await fetch(`/api/articles`);
			posts = await resp.json();
			loadingAllPosts = false;
			allLoaded = true;
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
			e.preventDefault();
			const input = document.getElementById('q');
			if (!(input instanceof HTMLInputElement)) return;
			input.focus();
		}
	}}
	on:load={() => {
		search.value = query;
	}}
/>

<article class="relative flex w-full flex-grow flex-col">
	<form
		class="sticky top-8 -mt-4 mb-4 flex flex-wrap justify-center gap-4 bg-stone-300 pb-1 pt-6 dark:bg-neutral-900"
		action="/articles/search"
		method="get"
		on:submit={(e) => {
			e.preventDefault();
			replaceState(formatSearch(query), {});
			goto(formatSearch(currentSearch));
		}}
	>
		<div
			class="flex min-w-0 max-w-[120ch] flex-grow border-b-2 border-current transition-[border-color] duration-300 focus-within:border-accent dark:focus-within:border-daccent"
		>
			<Icon path={mdiMagnify} class="flex-shrink-0" size={1} />
			<input
				bind:this={search}
				type="search"
				id="search"
				autocomplete="off"
				name="q"
				class="min-w-0 flex-grow appearance-none text-ellipsis bg-inherit text-current outline-none [&::-webkit-search-cancel-button]:appearance-none"
				placeholder="Search articles"
				value={query}
				on:input={(e) => {
					e.preventDefault();
					updateSearch(e.currentTarget.value);
				}}
			/>
		</div>
		<button
			type="submit"
			class=" uppercase transition-colors hocus:text-accent dark:hocus:text-daccent">Search</button
		>
	</form>
	{#if loadingAllPosts}
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
