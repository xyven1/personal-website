<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="My writing" />
</svelte:head>

<article class="flex flex-col">
	{#each data.posts as post}
		<section class="link p-4">
			<a href="/blogs/{post.slug}">
				<h2 class="bg-transparent text-3xl">{post.title}</h2>
				<p>{post.description}</p>
			</a>
		</section>
	{/each}
</article>
