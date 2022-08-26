import {MarkdownEditor as Editor} from './components/Editor'
import {createPlugin, defineType} from 'sanity'

// re-exporting MarkdownEditor directly explodes @parcel/transformer-typescript-types :shrug:
const MarkdownEditor = Editor

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
