<script lang="ts">
	import Img from '@zerodevx/svelte-img';
	import type { Picture } from 'imagetools-core';

	export let src: string | Picture;
	export let alt: string = typeof src === 'string' ? src.substring(src.lastIndexOf('/')) : '';
</script>

{#if typeof src === 'string' && src.endsWith('.svg')}
	<img class={$$props.class} {src} {alt} />
{:else}
	<Img {src} class={$$props.class} {alt} />
{/if}
