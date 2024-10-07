import { redirect } from '@sveltejs/kit';
import { presentations } from '$lib/data/presentations';

export async function GET({ params }) {
	const presentation = presentations[params.slug] ?? '/presentations';
	redirect(302, presentation.href);
}
