<script lang="ts">
	import projects from '$lib/projects';
	import Img from '@zerodevx/svelte-img';
</script>

<svelte:head>
	<title>Work</title>
	<meta name="description" content="My work" />
</svelte:head>

<div class="flex flex-col">
	{#each projects as project}
		<div class="link p-4">
			<a href="/work/{project.path}">
				<h2 class="bg-transparent text-3xl">{project.name}</h2>
				<p>{project.short_description}</p>
				<Img class="flex justify-center" src={project.image} alt="Project image" />
			</a>
		</div>
	{/each}
</div>
