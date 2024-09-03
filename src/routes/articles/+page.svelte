<script lang="ts">
	import Tag from '$lib/Tag.svelte';

	export let data;
</script>

<svelte:head>
	<title>Articles - Blake Bruell</title>
	<meta
		name="description"
		content="Blake Bruell is a software engineer persuing a Master's degree in CS with a focus on AI, with an interest in programming languages and systems programming."
	/>
</svelte:head>

<article>
	<ol class="space-y-8">
		{#each data.posts as post}
			<li class="border-b-2 border-neutral-700">
				<a href="/articles/{post.slug}" class="large-anchor sm:flex sm:items-center">
					<div class="grow">
						<h2
							class="large-anchor-link min-w-[min(calc(100vw-32px),400px)] bg-transparent text-3xl"
						>
							{post.title}
						</h2>
						<p class="text-neutral-400">{new Date(post.date).toLocaleDateString()}</p>
						<p>{post.description}</p>
					</div>
					<div class="sm:flex sm:flex-col sm:items-end">
						{#each post.tags.slice(0, 2) as category}
							<Tag text={category} />
						{/each}
					</div>
				</a>
			</li>
		{/each}
	</ol>
</article>
