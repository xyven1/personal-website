/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		fontFamily: {
			sans: ['Cutive Mono']
		},
		extend: {
			colors: {
				accent: '#0077c7'
			}
		}
  },
  plugins: [],
}
