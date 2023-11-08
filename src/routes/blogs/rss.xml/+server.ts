import type { Post } from '$lib/types/posts';

export async function GET({ fetch }) {
	const response = await fetch('/api/blogs');
	const posts: Post[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Xyven's Blog</title>
				<description>What Xyven is talking and thinking about</description>
				<link>https://xyven.dev</link>
				<atom:link href="https://xyven.dev/blogs/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>https://xyven.dev/blogs/${post.slug}</link>
							<guid isPermaLink="true">https://xyven.dev/blogs/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
}
