import 'easymde/dist/easymde.min.css'

import {useTheme} from '@sanity/ui'
import {type Options as EasyMdeOptions} from 'easymde'
import React, {forwardRef, Ref, useCallback, useMemo} from 'react'
import SimpleMdeReact, {SimpleMDEReactProps} from 'react-simplemde-editor'
import {PatchEvent, set, StringInputProps, unset, useClient} from 'sanity'
import {MarkdownOptions} from '../schema'

export interface MarkdownInputProps extends StringInputProps {
  /**
   * These are passed along directly to
   *
   * Note: MarkdownInput sets certain reactMdeProps.options by default.
   * These will be merged with any custom options.
   * */
  reactMdeProps?: Omit<SimpleMDEReactProps, 'value' | 'onChange'>
}

export const defaultMdeTools: EasyMdeOptions['toolbar'] = [
  'heading',
  'bold',
  'italic',
  '|',
  'quote',
  'unordered-list',
  'ordered-list',
  '|',
  'link',
  'image',
  'code',
  '|',
  'preview',
  'side-by-side',
]

export const MarkdownInput = forwardRef(function MarkdownInput(
  props: MarkdownInputProps,
  ref: Ref<any>
) {
  const {
    value = '',
    onChange,
    elementProps: {onBlur, onFocus},
    reactMdeProps: {options: mdeCustomOptions, ...reactMdeProps} = {},
    schemaType,
  } = props
  const client = useClient({apiVersion: '2022-01-01'})
  const {sanity: studioTheme} = useTheme()
  const {imageUrl} = (schemaType.options as MarkdownOptions | undefined) ?? {}

  const imageUpload = useCallback(
    (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
      client.assets
        .upload('image', file)
        .then((doc) => onSuccess(imageUrl ? imageUrl(doc) : `${doc.url}?w=450`))
        .catch((e) => {
          console.error(e)
          onError(e.message)
        })
    },
    [client, imageUrl]
  )

  const mdeOptions: EasyMdeOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      sideBySideFullscreen: false,
      uploadImage: true,
      imageUploadFunction: imageUpload,
      toolbar: defaultMdeTools,
      ...mdeCustomOptions,
    }
  }, [imageUpload, mdeCustomOptions])

  const handleChange = useCallback(
    (newValue: string) => {
      onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
    },
    [onChange]
  )

  return (
    <div ref={ref} data-color-mode={studioTheme.color.dark ? 'dark' : 'light'}>
      <SimpleMdeReact
        {...reactMdeProps}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        options={mdeOptions}
        spellCheck={false}
      />
    </div>
  )
})
