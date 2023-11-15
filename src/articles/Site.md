---
title: How I Made This Site
description: How this site works, and why I made the choices I did.
date: '2023-11-15'
tags:
  - sveltekit
  - svelte
published: true
---
## Contents

## Markdown


For testing right now  
$C_c = 5 \in T$

$$
\begin{align}
C_c &= 5 \in T \\
&= 5 \in T \\
&= 5 \in T \\
&= 5 \in T \\
\end{align}
$$

```js showLineNumbers {6-12}
<svelte:head>
	<title>About</title>
	<meta name="description" content="About me" />
</svelte:head>
<div class="flex h-full flex-col justify-center">
	<p class="text-center text-2xl">
		I am currently pursuing my bachelor's degree in Computer Science at WPI, with plans to complete
		a 4 year BS/MS program with a focus on ML. I start coding nearly 10 years ago, starting with
		software for Arduino and have been coding avidly since. Most of my programming knowledge is
		self-taught through personal projects and lectures on YouTube. I have devloped a strong ability
		to learn new languages, techniques, and skills quickly and without help from others.
	</p>
</div>
```

| Tables asdf asd fasdf asdf | Are asdf asdf asdf | Cool asdf asdf |
| :-------------------------- | :----------------: | -------------: |
| col 3 is                   |       right        |          $1600 |
## Test2

```ts title="Say hello to Shiki highlighting" {1}
import projects from '$lib/projects';
import { json } from '@sveltejs/kit';

async function getProjects() {
	return projects;
}

export async function GET() {
	const projects = await getProjects();
	return json(projects);
}
```
Moew

