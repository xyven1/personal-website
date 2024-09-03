<script>
	import Tag from '$lib/Tag.svelte';
	import { presentations } from './presentations';
	const ps = Object.entries(presentations).map(([name, presentation]) => ({
		slug: name,
		...presentation
	}));
</script>

<article>
	<ol class="space-y-8">
		{#each ps as p}
			<li class="border-b-2 border-neutral-700">
				<a href="/presentations/{p.slug}" class="large-anchor sm:flex sm:items-center">
					<div class="grow">
						<h2
							class="large-anchor-link min-w-[min(calc(100vw-32px),400px)] bg-transparent text-3xl"
						>
							{p.title}
						</h2>
						<p>{p.description}</p>
					</div>
					<div class="sm:flex sm:flex-col sm:items-end">
						{#each p.tags.slice(0, 2) as category}
							<Tag text={category} />
						{/each}
					</div>
				</a>
			</li>
		{/each}
	</ol>
</article>
