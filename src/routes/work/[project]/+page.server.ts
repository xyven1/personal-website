import Projects from '$lib/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const project = Projects.find((v) => v.path === params.project);
	if (project) {
		return {
			project
		};
	} else {
		throw error(404, 'Project Not Found');
	}
};
