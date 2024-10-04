import type { Posts } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const resp: Posts = await (await fetch('/api/articles')).json();

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Blake Bruell's Articles</title>
				<description>What Blake Bruell is talking and thinking about</description>
				<link>https://xyven.dev/articles</link>
				<atom:link href="https://xyven.dev/rss.xml" rel="self" type="application/rss+xml"/>
				${resp.posts
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
