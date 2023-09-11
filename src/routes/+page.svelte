<script lang="ts">
	import projects from '$lib/projects';
</script>

<svelte:head>
	<title>Work</title>
</svelte:head>

<div class="flex flex-col ">
	{#each projects as project}
		<div class="p-4 link">
			<a href="/work/{project.path}">
				<h2 class="text-3xl bg-transparent">{project.name}</h2>
				<p>{project.short_description}</p>
				<picture class="flex justify-center">
					<img src="/images/{project.image}" alt={project.name} />
				</picture>
			</a>
		</div>
	{/each}
</div>
