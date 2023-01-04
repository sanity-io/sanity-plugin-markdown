import {defineType, StringDefinition} from 'sanity'
import {MarkdownInput} from './components/MarkdownInput'
import {SanityImageAssetDocument} from '@sanity/client'

export const markdownTypeName = 'markdown' as const

export interface MarkdownOptions {
  /**
   * Used to create image url for any uploaded image.
   * The function will be invoked whenever an image is pasted or dragged into the
   * markdown editor, after upload completes.
   *
   * The default implementation uses
   * ```js
   * imageAsset => `${imageAsset.url}?w=450`
   * ```
   * ## Example
   * ```js
   * {
   *   imageUrl: imageAsset => `${imageAsset.url}?w=400&h=400`
   * }
   * ```
   * @param imageAsset
   */
  imageUrl?: (imageAsset: SanityImageAssetDocument) => string
}

/**
 * @public
 */
export interface MarkdownDefinition extends Omit<StringDefinition, 'type' | 'fields' | 'options'> {
  type: typeof markdownTypeName
  options?: MarkdownOptions
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
  components: {input: MarkdownInput},
})
