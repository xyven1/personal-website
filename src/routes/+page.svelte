<script lang="ts">
	import { blurb, name } from '$lib/info';
</script>

<svelte:head>
	<title>{name} - Software Engineer</title>
	<meta name="description" content={blurb} />
</svelte:head>

<article class="flex max-w-6xl grow flex-col space-y-4">
	<hgroup>
		<h1 class="text-3xl">Welcome to my site.</h1>
		<hr class="border-current" />
	</hgroup>
	<p class="text-xl">
		Checkout my <a href="/projects">projects</a>, my <a href="/articles">articles</a>, and feel free
		to <a href="/contact">contact</a> me for any reason.
	</p>
	<section class="space-y-4 [&>p]:text-justify [&>p]:text-lg">
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
			machine learning, system/network admin, and spending a little too much time configuring
			<a href="https://github.com/xyven1/neovim-config">neovim</a>.
		</p>
	</section>
</article>
