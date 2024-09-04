<script lang="ts">
	import { page } from '$app/stores';
	import { blurb, name } from '$lib/info';
	import Articles from '../articles.svelte';

	export let data;

	$: query = $page.url.searchParams.get('q') || '';
</script>

<svelte:head>
	<title>Articles - {name}</title>
	<meta name="description" content={blurb} />
</svelte:head>

<Articles posts={data.posts} {query} />
