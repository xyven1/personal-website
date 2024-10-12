<script lang="ts">
	import { blurb, name } from '$lib/data/info';
	import { Tag } from '../lib/components';

	export let data;
</script>

<svelte:head>
	<title>{name} - Software Engineer</title>
	<meta name="description" content={blurb} />
</svelte:head>

<article class="my-8 flex max-w-6xl grow flex-col space-y-8">
	<section class="space-y-4 [&>p]:text-lg sm:[&>p]:text-justify">
		<hgroup>
			<h2 class="text-2xl">About Me</h2>
			<hr class="border-current" />
		</hgroup>
		<p>
			I began programming over 10 years ago, with the humble task of making an LED blink. This
			proved interesting enough to me that I have not stopped since, leading me to where I am now,
			pursuing a Master's in CS at Worcester Polytechnic Institute, and coding professionally.
		</p>
		<p>
			While I still appreciate making an LED blink every now and then, most of my time these days is
			spent working with <a href="https://github.com/xyven1/nixos-configuration">Nix/NixOS</a>, low
			level/systems programming (often in Rust, but also C/C++, Go, and other languages as well),
			machine learning, system/network admin, and spending a little too much time
			<a href="https://github.com/xyven1/neovim-config">configuring neovim</a>.
		</p>

		<p>
			Checkout my <a href="/projects">projects</a>, my <a href="/articles">articles</a>, and feel
			free to <a href="/contact">contact</a> me for any reason.
		</p>
	</section>

	<section>
		<hgroup class="mb-4">
			<h2 class="text-xl">What I've Been Writing About</h2>
			<hr class="border-current" />
		</hgroup>
		<ol class="flex max-w-[1000px] flex-col items-start space-y-8">
			{#each data.posts.slice(0, 10) as post}
				<li>
					<a href="/articles/{post.slug}" class="large-anchor grow">
						<h2 class="large-anchor-link bg-transparent text-3xl">
							{post.title}
						</h2>
						<p class="text-stone-600 dark:text-neutral-400">
							{new Date(post.date).toLocaleDateString()} ~ {post.readTime} min read
						</p>
						<p>{post.description}</p>
					</a>
					<div class="flex flex-wrap gap-x-3 gap-y-1 p-1">
						{#each post.tags.slice(0, 2) as category}
							<Tag text={category} link={'/articles/search/?tag=' + category} />
						{/each}
					</div>
				</li>
			{/each}
		</ol>
	</section>
</article>
