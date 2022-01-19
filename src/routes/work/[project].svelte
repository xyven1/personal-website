<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ params, fetch }) => {
		const res = await fetch(`/work/${params.project}.json`);

		if (res.ok) {
			const { project } = await res.json();
			return {
				props: {
					project: project
				}
			};
		}

		const { message } = await res.json();
		return {
			status: res.status,
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import type { Project } from '$lib/projects';

	export let project: Project;
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>
<div class="flex-col">
	<h2 class="text-3xl">{project.name}</h2>
	<p>{project.short_description}</p>
	<picture class="flex justify-center">
		<img src="/{project.image}" alt={project.name} />
	</picture>
</div>
