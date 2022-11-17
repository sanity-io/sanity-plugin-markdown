import {MarkdownEditor as Editor} from './components/Editor'
import {definePlugin} from 'sanity'
import {markdownSchemaType, MarkdownDefinition} from './schema'

// re-exporting MarkdownEditor directly explodes @parcel/transformer-typescript-types :shrug:
const MarkdownEditor = Editor

export {MarkdownEditor, markdownSchemaType}
export type {MarkdownDefinition}

export const markdownSchema = definePlugin({
  name: 'markdown-editor',
  schema: {
    types: [markdownSchemaType],
  },
})
