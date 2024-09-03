/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Fira Sans']
		},
		extend: {
			colors: {
				accent: '#4077c7'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
