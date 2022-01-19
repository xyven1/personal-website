<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import projects from '$lib/projects';
</script>

<svelte:head>
	<title>Work</title>
</svelte:head>

<div>
	{#each projects as project}
		<a href={`work/${project.path}`} class="transition duration-300 mx-4 hover:text-accent">
			<h2 class="text-3xl">{project.name}</h2>
			<p>{project.short_description}</p>
			<picture class="flex justify-center">
				<img src="/{project.image}" alt={project.name} />
			</picture>
		</a>
	{/each}
</div>
