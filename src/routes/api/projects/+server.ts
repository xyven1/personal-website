import projects from '$lib/projects';
import { json } from '@sveltejs/kit';

export const prerender = true;

async function getProjects() {
	return projects;
}

export async function GET() {
	const projects = await getProjects();
	return json(projects);
}
