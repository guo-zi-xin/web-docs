import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData, useRoute } from 'vitepress'
import type { EnhanceAppContext, Theme } from 'vitepress'
import { h, onMounted, watch, nextTick } from 'vue'
import busuanzi from 'busuanzi.pure.js'

import './styles/index.scss'
import 'uno.css'

let homePageStyle: HTMLStyleElement | undefined

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }: EnhanceAppContext) {
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/web-docs/',
          ),
        { immediate: true },
      )
    }
    if (inBrowser) {
      router.onAfterRouteChanged = (to) => {
        // 卜算子插件
        busuanzi.fetch()
      }
    }
  },
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props)
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // Should there be a new?
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}


export default theme


