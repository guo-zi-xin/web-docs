import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { SearchPlugin } from "vitepress-plugin-search";
import flexSearchIndexOptions from "flexsearch";
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'

const options = {
  ...flexSearchIndexOptions,
  previewLength: 62, // 搜索结果预览长度
  buttonLabel: "搜索",
  placeholder: "搜索关键词",
  allow: [],
  ignore: [],
};
const require = createRequire(import.meta.url)

export default defineConfig(async () => {
  return <UserConfig>{
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      
      // custom
      MarkdownTransform(),
      // plugins
      SearchPlugin(options),
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      UnoCSS(),
    ],
    css: {
      postcss: {
        plugins: [
          require('postcss-nested'),
        ],
      },
    },
  }
})
