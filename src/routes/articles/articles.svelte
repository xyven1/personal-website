<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import type { Post, Posts } from '$lib/types';
	import { Icon, Tag } from '$lib/components';
	import ufuzzy from '@leeoniya/ufuzzy';
	import { mdiCheck, mdiLoading, mdiMagnify } from '@mdi/js';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { filterTags, postsToStrings } from './search';

	export let posts: Post[];
	export let allTags: string[];

	export let query: string = '';
	export let tags: string[] = [];

	let search: HTMLInputElement;

	const uf = new ufuzzy({
		intraIns: 1
	});

	function formatSearch(search: string, tags: string[]) {
		const query = new URLSearchParams(tags.map((t) => ['tag', t]));
		if (search) query.set('q', search);
		const queryString = query.toString();
		return `/articles${queryString && `/search?${queryString}`}`;
	}

	$: currentSearch = query;
	$: currentTags = tags;

	$: (async () => {
		if (!browser) return;
		await tick();
		replaceState(formatSearch(currentSearch, currentTags), {});
	})();

	$: filteredPosts = filterTags(posts, currentTags);
	$: postStrings = postsToStrings(filteredPosts);
	$: shownPosts =
		currentSearch === ''
			? filteredPosts
			: (uf.search(postStrings, currentSearch, 1)[0] ?? []).map((i) => filteredPosts[i]);

	let allLoaded = query === '' && tags.length === 0;
	let loadingAllPosts = false;
	async function updateSearch(
		search: string | null = null,
		tag: { value: string; checked: boolean } | null = null
	) {
		const staleSearch = search === null || search === currentSearch;
		const staleTag =
			tag === null ||
			(tag.checked ? currentTags.includes(tag.value) : !currentTags.includes(tag.value));
		if (staleSearch && staleTag) return;
		if (!staleSearch) currentSearch = search;
		if (!staleTag) {
			if (tag.checked) currentTags = [...currentTags, tag.value];
			else currentTags = currentTags.filter((t) => t !== tag.value);
		}
		if (!allLoaded) {
			if (loadingAllPosts) return;
			loadingAllPosts = true;
			const resp: Posts = await (await fetch(`/api/articles`)).json();
			posts = resp.posts;
			allTags = resp.tags;
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
		class="sticky top-8 -mt-4 mb-4 flex flex-wrap justify-center gap-2 bg-stone-300 pb-1 pt-6 dark:bg-neutral-900"
		action="/articles/search"
		method="get"
		on:submit={(e) => {
			e.preventDefault();
			replaceState(formatSearch(query, tags), {});
			goto(formatSearch(currentSearch, currentTags));
		}}
	>
		<div class="flex-grow space-y-2">
			<div class="flex flex-wrap justify-center gap-4">
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
			</div>
			<div class="space-x-2">
				{#each allTags as tag}
					<label
						for={`$tag-${tag}`}
						class="inline-flex cursor-pointer items-center gap-1 self-center rounded-full bg-accent !bg-opacity-50 px-3 py-1 text-center text-stone-100 dark:bg-daccent dark:!text-current [&:has(>input:checked)]:!bg-opacity-100"
					>
						<input
							type="checkbox"
							name="tag"
							id={`$tag-${tag}`}
							class="peer"
							value={tag}
							checked={currentTags.includes(tag)}
							on:change={(e) => {
								e.preventDefault();
								updateSearch(null, { value: tag, checked: e.currentTarget.checked });
							}}
							hidden
						/>
						<div
							class="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 peer-checked:grid-cols-[1fr]"
						>
							<div class="overflow-hidden">
								<Icon path={mdiCheck} size={0.9} />
							</div>
						</div>
						<span>{tag}</span>
					</label>
				{/each}
			</div>
		</div>
		<button
			type="submit"
			class="self-start uppercase transition-colors hocus:border-accent hocus:text-accent dark:hocus:border-daccent dark:hocus:text-daccent"
		>
			Search
		</button>
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
