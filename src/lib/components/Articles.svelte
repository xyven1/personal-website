<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import type { Post, Posts } from '$lib/types';
	import { Icon, Tag } from '$lib/components';
	import { mdiChevronRight, mdiLoading, mdiMagnify, mdiTag, mdiTagOutline } from '@mdi/js';
	import { search, SearchState_ } from '$lib/search';

	export let posts: Post[];
	export let numPosts: number;
	export let query = '';
	export let tags: string[] = [];
	export let allTags: string[];

	const maxNumTags = 10;

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
		class="group/form sticky top-12 space-y-2 bg-stone-300 pb-2 pt-4 dark:bg-neutral-900"
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
		<div class="flex flex-wrap justify-center gap-x-2 gap-y-2">
			<div
				class="flex min-w-0 max-w-[120ch] flex-grow border-b-2 border-current transition-[border-color] focus-within:border-accent dark:focus-within:border-daccent"
			>
				<Icon path={mdiMagnify} class="flex-shrink-0" size={1.5} />
				<input
					bind:this={searchInput}
					size="10"
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
			<button
				type="submit"
				class="uppercase transition-colors hocus:border-accent hocus:text-accent dark:hocus:border-daccent dark:hocus:text-daccent"
			>
				Search
			</button>
		</div>
		<ul class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
			{#each allTags.slice(0, maxNumTags) as tag}
				<li class="group">
					<label
						for={`$tag-${tag}`}
						class="inline-flex cursor-pointer items-center gap-x-[2px] transition-[color] hocus:text-accent dark:hocus:text-daccent"
					>
						<input
							type="checkbox"
							name="tag"
							id={`$tag-${tag}`}
							class="peer hidden"
							value={tag}
							checked={tags.includes(tag)}
							on:input={(e) => {
								e.preventDefault();
								updateSearch(null, { value: tag, checked: e.currentTarget.checked });
							}}
						/>
						<span class="relative">
							<Icon
								path={mdiTagOutline}
								size={1.25}
								class="inline group-has-[input:checked]:hidden"
							/>
							<Icon
								width={0}
								path={mdiTag}
								size={1.25}
								class="hidden group-has-[input:checked]:inline"
							/>
						</span>
						<span>{tag}</span>
					</label>
				</li>
			{/each}
			{#if allTags.length > maxNumTags}
				<li class="group">
					<label
						for="more-tags"
						class="inline-flex cursor-pointer items-center transition-[color] hocus:text-accent dark:hocus:text-daccent"
					>
						<input
							type="checkbox"
							checked={tags.some((t) => allTags.slice(maxNumTags).includes(t))}
							id="more-tags"
							class="peer hidden"
							tabindex="0"
						/>
						<span class="uppercase">More Tags</span>
						<span>
							<Icon
								path={mdiChevronRight}
								size={1.25}
								class="transition-transform group-has-[input:checked]:rotate-90"
							/>
						</span>
					</label>
				</li>
			{/if}
		</ul>
		{#if allTags.length > maxNumTags}
			<div
				class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-has-[#more-tags:checked]/form:grid-rows-[1fr]"
			>
				<div class="overflow-hidden">
					<ul class="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1" id="overflow-tags">
						{#each allTags.slice(maxNumTags) as tag}
							<li class="group">
								<label
									for={`$tag-${tag}`}
									class="inline-flex cursor-pointer items-center gap-x-[2px] transition-[color] hocus:text-accent dark:hocus:text-daccent"
								>
									<input
										type="checkbox"
										name="tag"
										id={`$tag-${tag}`}
										class="peer hidden"
										value={tag}
										checked={tags.includes(tag)}
										on:input={(e) => {
											e.preventDefault();
											updateSearch(null, { value: tag, checked: e.currentTarget.checked });
										}}
									/>
									<span class="relative">
										<Icon
											path={mdiTagOutline}
											size={1.25}
											class="inline group-has-[input:checked]:hidden"
										/>
										<Icon
											width={0}
											path={mdiTag}
											size={1.25}
											class="hidden group-has-[input:checked]:inline"
										/>
									</span>
									<span>{tag}</span>
								</label>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</form>
	{#if loadingAllPosts}
		<div class="flex justify-center gap-x-2">
			<Icon class="animate-spin" size={3} path={mdiLoading} aria-label="loading" />
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
