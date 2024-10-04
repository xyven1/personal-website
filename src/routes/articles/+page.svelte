<script lang="ts">
	import { blurb, name } from '$lib/data/info';
	import Articles from './articles.svelte';
	export let data;
</script>

<svelte:head>
	<title>Articles - {name}</title>
	<meta name="description" content={blurb} />
</svelte:head>

<Articles posts={data.posts} tags={[]} allTags={data.tags} />
