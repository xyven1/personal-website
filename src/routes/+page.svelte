<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home page" />
</svelte:head>

<article class="flex grow flex-col space-y-4">
	<hgroup>
		<h1 class="text-4xl">Welcome to my site.</h1>
		<hr />
	</hgroup>
	<p class="text-2xl">
		Checkout my <a href="/projects" class="mx-0">projects</a>, and feel free to
		<a href="/contact" class="mx-0">contact</a>
		me for any reason.
		<!-- and <a href="/articles">articles</a>-->
	</p>
	<section class="space-y-4">
		<hgroup>
			<h2 class="text-3xl">About Me</h2>
			<hr />
		</hgroup>
		<p class="text-center text-2xl sm:text-left">
			I fell in love with programming 10 years ago when being introduced to programming with
			Arduino. The ability to write a few lines of text, which once translated into the language of
			machines could create change in the real world entranced me. It started slow, with just the
			simple task of making an LED blink, but I quickly realized that the potential for programming
			was limitless, and so my journey to learn and do as much as possible began. That journey has
			led me to where I am today, studying computer science at WPI, and coding professionally.
		</p>
		<p class="text-center text-2xl sm:text-left">
			I am currently pursuing my masters's degree in Computer Science at WPI, with plans to complete
			a 4 year BS/MS program with a focus on ML.
		</p>
	</section>
</article>
