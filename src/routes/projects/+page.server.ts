import type { Project } from '$lib/projects';

export async function load({ fetch }) {
	const req = await fetch(`/api/projects`);
	const projects: Project[] = await req.json();
	return { projects };
}
