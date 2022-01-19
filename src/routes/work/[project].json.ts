import type { RequestHandler } from '@sveltejs/kit';
import Projects from '$lib/projects';

export const get: RequestHandler = async ({ params }) => {
	const project = Projects.find((v) => v.path === params.project);
	if (project) {
		return {
			body: {
				project
			}
		};
	}
};
