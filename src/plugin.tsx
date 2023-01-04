import {definePlugin, StringInputProps} from 'sanity'
import {markdownSchemaType} from './schema'
import {ReactElement} from 'react'

export interface MarkdownConfig {
  /**
   * When provided, will replace the default input component.
   *
   * Use this to customize MarkdownInput by wrapping it in a custom component,
   * and provide any custom props for https://github.com/RIP21/react-simplemde-editor#react-simplemde-easymde-markdown-editor
   * via the `reactMdeProps` prop.
   *
   * ### Example
   *
   * ```tsx
   * // CustomMarkdownInput.tsx
   * import { MarkdownInput, MarkdownInputProps } from 'sanity-plugin-markdown'
   *
   * export function CustomMarkdownInput(props) {
   *   const reactMdeProps: MarkdownInputProps['reactMdeProps'] =
   *     useMemo(() => {
   *       return {
   *         options: {
   *           toolbar: ['bold', 'italic'],
   *           // more options available, see:
   *           // https://github.com/Ionaru/easy-markdown-editor#options-list
   *         },
   *         // more props available, see:
   *         // https://github.com/RIP21/react-simplemde-editor#react-simplemde-easymde-markdown-editor
   *       }
   *     }, [])
   *
   *   return <MarkdownInput {...props} reactMdeProps={reactMdeProps} />
   * }
   *
   * // studio.config.ts
   * markdownSchema({input: CustomMarkdownInput})
   * ```
   */
  input?: (props: StringInputProps) => ReactElement
}

export const markdownSchema = definePlugin((config: MarkdownConfig | void) => {
  return {
    name: 'markdown-editor',
    schema: {
      types: [
        config && config.input
          ? {...markdownSchemaType, components: {input: config.input}}
          : markdownSchemaType,
      ],
    },
  }
})
