import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

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
			},
			typography: {
				DEFAULT: {
					css: {
						'th, td': null
					}
				}
			}
		}
	},
	plugins: [
		typography,
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus']);
		})
	]
};
