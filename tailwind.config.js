/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Fira Sans']
		},
		extend: {
			colors: {
				daccent: '#4077c7',
				accent: '#7ea3d9'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
