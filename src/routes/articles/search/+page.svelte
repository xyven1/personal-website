<script lang="ts">
	import { page } from '$app/stores';
	import { blurb, name } from '$lib/data/info';
	import { Articles } from '$lib/components';
	export let data;
</script>

<svelte:head>
	<title>Articles - {name}</title>
	<meta name="description" content={blurb} />
</svelte:head>

<Articles
	posts={data.posts}
	numPosts={data.numPosts}
	allTags={data.tags}
	query={$page.url.searchParams.get('q') || ''}
	tags={$page.url.searchParams.getAll('tag')}
/>
