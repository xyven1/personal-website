<script lang="ts">
	import { page } from '$app/stores';
	import { blurb, name } from '$lib/data/info';
	import Articles from '../articles.svelte';

	export let data;

	const query = $page.url.searchParams.get('q') || '';
	const tags = $page.url.searchParams.getAll('tag');
</script>

<svelte:head>
	<title>Articles - {name}</title>
	<meta name="description" content={blurb} />
</svelte:head>

<Articles posts={data.posts} {query} {tags} allTags={data.tags} />
