import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    {
      postcssPlugin: true,
      Declaration: {
        'font-display': (node) => {
          if (node.parent.name === 'font-face' && node.parent.type === 'atrule') node.value = 'fallback'
        }
      }
    }
  ],
}
