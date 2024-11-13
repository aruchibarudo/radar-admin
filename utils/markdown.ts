import MarkdownIt from 'markdown-it'
import insert from 'markdown-it-ins'

export const mdParser = new MarkdownIt().use(insert)
