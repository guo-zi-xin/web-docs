import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext, Theme } from 'vitepress'
import { onMounted } from 'vue'
import '../styles/index.scss'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
  },
  setup() {
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // Should there be a new?
    }
    onMounted(() => {
      initZoom()
    })
  },
}

export default theme


