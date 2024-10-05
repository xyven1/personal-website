<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import type { Post, Posts } from '$lib/types';
	import { Icon, Tag } from '$lib/components';
	import { mdiCheck, mdiLoading, mdiMagnify } from '@mdi/js';
	import { search, SearchState_ } from '$lib/search';

	export let posts: Post[];
	export let numPosts: number;
	export let query = '';
	export let tags: string[] = [];
	export let allTags: string[];

	let searchInput: HTMLInputElement;

	const searchState = SearchState_();
	let shownPosts = search(searchState, { posts, tags }, query);

	afterNavigate((e) => {
		if (e.from === null) return;
		console.log('navigate');
		const urlParams = new URLSearchParams(location.search);
		query = currentSearch = urlParams.get('q') ?? '';
		tags = currentTags = urlParams.getAll('tag');
		updateSearch();
	});

	let loadingAllPosts = false;
	let currentSearch = query;
	let currentTags = tags;
	async function updateSearch(
		query: string | null = null,
		tag: { value: string; checked: boolean } | null = null
	) {
		if (query !== null) currentSearch = query;
		if (tag !== null) {
			if (tag.checked) currentTags = [...currentTags, tag.value];
			else currentTags = currentTags.filter((t) => t !== tag.value);
		}
		let loadedPosts: Post[] | null = null;
		if (searchState.posts.length !== numPosts) {
			if (loadingAllPosts) return;
			loadingAllPosts = true;
			const resp: Posts = await (await fetch(`/api/articles`)).json();
			loadedPosts = resp.posts;
			allTags = resp.tags;
			loadingAllPosts = false;
		}
		shownPosts = search(
			searchState,
			{
				posts: loadedPosts !== null ? loadedPosts : undefined,
				tags: searchState.tags != currentTags ? currentTags : undefined
			},
			currentSearch
		);
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
			e.preventDefault();
			searchInput.focus();
		}
	}}
/>

<article class="relative flex w-full flex-grow flex-col">
	<form
		class="sticky top-8 -mt-4 mb-4 flex flex-wrap justify-center gap-2 bg-stone-300 pb-1 pt-6 dark:bg-neutral-900"
		action="/articles/search"
		method="get"
		on:submit={(e) => {
			e.preventDefault();
			const query = new URLSearchParams([
				...currentTags.map((t) => ['tag', t]),
				...(currentSearch != '' ? [['q', currentSearch]] : [])
			]).toString();
			if (query !== location.search) goto(`/articles${query && `/search?${query}`}`);
		}}
	>
		<div class="flex-grow space-y-2">
			<div
				class="flex min-w-0 max-w-[120ch] flex-grow border-b-2 border-current transition-[border-color] duration-300 focus-within:border-accent dark:focus-within:border-daccent"
			>
				<Icon path={mdiMagnify} class="flex-shrink-0" size={1} />
				<input
					bind:this={searchInput}
					size="1"
					type="search"
					id="search"
					autocomplete="off"
					autocapitalize="none"
					spellcheck="false"
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
			<div class="flex flex-wrap justify-center gap-2">
				{#each allTags as tag}
					<label
						for={`$tag-${tag}`}
						class="inline-flex cursor-pointer items-center self-center rounded-full bg-accent !bg-opacity-50 px-3 py-1 text-center text-stone-100 dark:bg-daccent dark:!text-current [&:has(>input:checked)]:!bg-opacity-100"
					>
						<input
							type="checkbox"
							name="tag"
							id={`$tag-${tag}`}
							class="peer"
							value={tag}
							checked={tags.includes(tag)}
							on:input={(e) => {
								e.preventDefault();
								updateSearch(null, { value: tag, checked: e.currentTarget.checked });
							}}
							hidden
						/>
						<div
							class="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 peer-checked:grid-cols-[1fr]"
						>
							<div class="overflow-hidden">
								<Icon path={mdiCheck} size={0.9} class="mr-1" />
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
