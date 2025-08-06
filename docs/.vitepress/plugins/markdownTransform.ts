import type { Plugin } from 'vite'
import { replacer } from '../../../scripts/utils'
import { getReadingTime } from './../theme/utils'

export function MarkdownTransform(): Plugin {
  return {
    name: 'web-docs-transform',
    enforce: 'pre',
    async transform(code:string, id:string) {
      if (!id.match(/\.md\b/))
        return null
      // convert links to relative
      // code = code.replace(/https?:\/\/.*github\.io\//g, '/')
      /**
       * 2023-11-27
       * 由于github.io域名被墙，所以改为使用自定义域名， 并且针对于个人的项目地址，避免其它github.io域名被替换的情况
       */
      code = code.replace(/https?:\/\/.*github\.io\/web-docs\//g, '/')
      const [_name, i] = id.split('/').slice(-2)

      // convert img
      const imgRegex = /!\[(.+?)\]\((.+?)\)/g
      let imgMatches = imgRegex.exec(code)
      while (imgMatches) {
        const [text, link] = imgMatches.slice(1)
        code = code.replace(imgMatches[0], `<img src="${link}" alt="${text || 'img'}" />`)
        imgMatches = imgRegex.exec(code)
      }

      // convert links to components
      const linkRegex = /\[(.+?)\]\((.+?)\)/g
      let matches = linkRegex.exec(code)
      while (matches) {
        const [text, link] = matches.slice(1)
        code = code.replace(matches[0], `<CustomLink title="${text}" href="${link}" />`)
        matches = linkRegex.exec(code)
      }

      // cut index.md
      if (_name === 'docs' && i === 'index.md')
        return code

      const { footer } = await getDocsMarkdown()
      code = replacer(code, footer, 'FOOTER', 'tail')
      const { readTime, words } = getReadingTime(code)
      code = code
       .replace(
          /^(#\s.+\r?\n)(?!\s*<PageInfo\b)/m,  // 确保后面没有已存在的 PageInfo
          `$1\n<PageInfo readTime="${readTime}" words="${words}"/>\n\n`
        )

      return code
    },
  }
}

export async function getDocsMarkdown() {
  const ContributorsSection = `## Contributors
  <Contributors/>`

  const CopyRightSection = `
  <CopyRight/>`

  // const footer = `${ContributorsSection}\n${CopyRightSection}\n`
  const footer = ''
  return {
    footer,
  }
}
