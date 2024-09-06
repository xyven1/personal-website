import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import customSelectors from 'postcss-custom-selectors';

export default {
	plugins: [
		tailwindcss(),
		autoprefixer(),
		customSelectors()
		// {
		//   postcssPlugin: true,
		//   Declaration: {
		//     'font-display': (node) => {
		//       if (node.parent.name === 'font-face' && node.parent.type === 'atrule') node.value = 'fallback'
		//     }
		//   }
		// }
	]
};
