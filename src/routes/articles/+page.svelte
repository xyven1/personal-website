<script lang="ts">
	import Articles from './articles.svelte';
	export let data;
</script>

<svelte:head>
	<title>Articles - Blake Bruell</title>
	<meta
		name="description"
		content="Blake Bruell is a software engineer persuing a Master's degree in CS with a focus on AI, with an interest in programming languages and systems programming."
	/>
</svelte:head>

<Articles posts={data.posts} />
