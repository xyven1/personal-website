<script lang="ts">
	import { page } from '$app/stores';
	import Articles from '../articles.svelte';

	export let data;

	$: query = $page.url.searchParams.get('q') || '';
</script>

<Articles posts={data.posts} {query} />
