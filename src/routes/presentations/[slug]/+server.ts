import { redirect } from '@sveltejs/kit';
import { presentations } from '../presentations';

export async function GET({ params }) {
	const presentation = presentations[params.slug] ?? '/presentations';
	redirect(302, presentation.href);
}
