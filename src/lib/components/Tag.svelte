<script lang="ts">
	import { Icon } from '$lib/components';
	import { mdiTag } from '@mdi/js';
	export let text: string;
	export let link: string = '';
</script>

{#if link.length > 0}
	<a
		href={link}
		class={'not-link inline-flex cursor-pointer items-center gap-x-[2px] transition-[color] hocus:text-accent dark:hocus:text-daccent ' +
			$$props.class}
	>
		<Icon width={0} path={mdiTag} size={1.25} />
		{text}
	</a>
{:else}
	<p class={'inline-flex items-center gap-x-[2px] ' + $$props.class}>
		<Icon width={0} path={mdiTag} size={1.25} />
		{text}
	</p>
{/if}
