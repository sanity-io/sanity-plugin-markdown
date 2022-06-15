import {MarkdownEditor} from './components/Editor'
import {createPlugin, defineType} from 'sanity'

export {MarkdownEditor}

export const markdownSchema = createPlugin({
  name: 'markdown-editor',
  schema: {
    types: [
      defineType({
        type: 'string',
        name: 'markdown',
        title: 'Markdown',
        components: {
          input: MarkdownEditor,
        },
      }),
    ],
  },
})
