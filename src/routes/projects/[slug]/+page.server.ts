import type { Project } from '$lib/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const projects: Project[] = await fetch(`/api/projects`).then((r) => r.json());
	const project = projects.find((p) => p.slug === params.slug);
	if (project) {
		return {
			project
		};
	} else {
		error(404, 'Project not found');
	}
};
