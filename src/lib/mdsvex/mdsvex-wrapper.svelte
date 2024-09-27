<script lang="ts" context="module">
	import Layout from './mdsvex.svelte';
</script>

<Layout class={$$props.class}>
	<slot />
</Layout>
