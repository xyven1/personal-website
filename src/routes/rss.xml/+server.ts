import type { Post } from '$lib/types/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/api/articles');
	const posts: Post[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Blake Bruell's Articles</title>
				<description>What Blake Bruell is talking and thinking about</description>
				<link>https://xyven.dev/articles</link>
				<atom:link href="https://xyven.dev/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>https://xyven.dev/articles/${post.slug}</link>
							<guid isPermaLink="true">https://xyven.dev/articles/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
};
