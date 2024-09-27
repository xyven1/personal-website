import type { Project } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
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
