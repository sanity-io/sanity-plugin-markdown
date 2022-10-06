import {defineType, StringDefinition} from 'sanity'
import {MarkdownEditor} from './components/Editor'

const markdownTypeName = 'markdown' as const

/**
 * @public
 */
export interface MarkdownDefinition extends Omit<StringDefinition, 'type' | 'fields' | 'options'> {
  type: typeof markdownTypeName
}

declare module '@sanity/types' {
  // makes type: 'markdown' narrow correctly when using defineType/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    markdown: MarkdownDefinition
  }
}

export const markdownSchemaType = defineType({
  type: 'string',
  name: markdownTypeName,
  title: 'Markdown',
  components: {
    input: MarkdownEditor,
  },
})
