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
<div class="flex flex-col items-center">
	<h2 class="text-3xl">
		{project.name}
		{#if project.github_url}
			<a href={project.github_url}>(Github repo)</a>
		{/if}
	</h2>
	<p>{project.short_description}</p>
	{#if project.embed_path}
		<iframe
			class="bg-white"
			title="Dipole Simulation"
			src={project.embed_path}
			height="528"
			width="700"
		/>
	{:else if project.image}
		<picture class="flex justify-center">
			<img src="/images/{project.image}" alt={project.name} />
		</picture>
	{/if}
	{#if project.long_description}
		<p class="text-justify">{project.long_description}</p>
	{/if}
</div>
