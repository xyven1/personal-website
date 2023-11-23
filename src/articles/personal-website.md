---
title: How I Made My Peronal Website
description: How my personal site works, and why I made the techincal choices I did.
date: 2023-11-21
tags:
  - sveltekit
  - svelte
published: true
---
## Frameworks and Tools
### Svelte-kit
This site is built on [**svelte-kit**](https://github.com/sveltejs/kit) (^1.24.1). Some of the main reasons I chose this framework are as follows:
- **Adapters**: Svelte-kit adapters allow for easy integration with many different hosting platforms (including multiple forms of self-hosting) via adapters. This makes the site agnostic to hosting service, but still plug and play with existing solutions like Cloudflare Pages (the current hosting service as of writing)
- **SSR and Prerendering**: Many different frameworks support this, but svelte-kit has first class support for both SSR (`export const ssr = true;`), and prerendering (`export const prerender = true;`). These features allow the site to be compiled into pure HTML and CSS wherever possible, speeding up page delivery and reducing redundant computation
- **Optional Hydration**: Svelte-kit makes it easy to completely disable the JS runtime (`export const prerender = false;`)

### Tailwind
I chose to use [**tailwindcss**](https://github.com/tailwindlabs/tailwindcss) (^3.3.3) for styling on this site, as the localized styling as well as robust documentation and ecosystem made it a breeze to use.

When setting up the articles portion of this site, I also added [**@tailwindcss/typography**](https://github.com/tailwindlabs/tailwindcss-typography) (^0.5.10) to get access to the `.prose` which provides the majority of the styling for the very page you are looking at.

### MDSveX
Another key tool is [**mdsvex**](https://github.com/pngwn/MDsveX) (^0.11.0), a tool for generating HTML from markdown files, but with the ability to embed not only HTML but also svelte components. The flexibility this grants ensured that anything I could do with a normal svelte file was possible using the markdown files used to layout these pages. 
#### Remark and Rehype
Using MDSveX also opened up a huge ecosystem of **remark** and **rehype** plugins, which allow complex transformations of the AST at both the markdown stage and the HTML stage of the transformation. The plugins used include the following:
- **remark-math** and **rehype-katex**: This combination of plugins allows for beautiful and easy math equations embedded right in the markdown. This plays nicely with markdown editors like obsidian, making editing more ergonomic.
- **rehype-toc**: Along **rehype-autolink-headings** and **rehype-slug**, this plugin provides a very elegant way of creating a table of contents for the site.

#### Code Highlighting
While there are robust rehype based highlighting plugins, there are often issues using them with MDSveX, due to the way certain symbols which are used in svelte source code are encoded. As such I went with [**@bitmachina/highlighter**](https://github.com/johnhooks/highlighter) (1.0.0-alpha.7), a plugin which is intended for use with MDSveX, and thus has no such issues. Under the hood it uses [**shiki**](https://github.com/shikijs/shiki), which itself uses the same tokenization engine as VSCode.

## Examples

If you like to check out the source code for any of the following examples you can find it [here]({source}).

### Math
#### Inline Math
Let $f(x) = 1$. $\forall x,y \in \Bbb{Z}$, $x + y = \sum_{i = 1}^{x+y} \frac{f(i)}{\sin^2(i) +\cos ^{2}(i) }$.
#### Math Blocks
$$
\begin{aligned}
a(a^2) &= b^3 \\
a(b^2) &= b^3 \\
(ab^2)b^{-2} &= (bb^2)b^{-2} \\
a(b^2b^{-2}) &= b(b^2b^{-2}) \\
a &= b
\end{aligned}
$$
### Code 
#### Basic Block
```svelte 
<script lang="ts">
	let data; 
</script>
```

#### Title and Highlighting
```ts {1} title="src/route/+page.ts" 
import projects from '$lib/projects';
```

#### Highlighting and Line numbers 
```ts {1-3, 6,} showLineNumbers{10}
async function getProjects() {
	return projects;
}

export async function GET() {
	const projects = await getProjects();
	return json(projects);
}
```
### Tables
| Tables   |   Second Row   | Still Going |
|:-------- |:--------------:| -----------:|
| col 3 is | aligned  right |       $1600 |


<script lang="module">
	export let source;
</script>