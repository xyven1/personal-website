import type { Project } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const csr = true;

export const load: PageLoad = async ({ fetch }) => {
	const req = await fetch(`/api/projects`);
	const projects: Project[] = await req.json();
	return { projects };
};
