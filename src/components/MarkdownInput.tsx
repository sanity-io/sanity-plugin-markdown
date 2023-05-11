import {type Options as EasyMdeOptions} from 'easymde'
import React, {Suspense, useCallback, useMemo} from 'react'
// dont import non-types here, it will break SSR on next
import type {SimpleMDEReactProps} from 'react-simplemde-editor'
import {PatchEvent, set, StringInputProps, unset, useClient} from 'sanity'
import {MarkdownOptions} from '../schema'
import {MarkdownInputStyles} from './MarkdownInputStyles'
import {useSimpleMdeReact} from './useSimpleMdeReact'
import {Box, Text} from '@sanity/ui'

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

export function MarkdownInput(props: MarkdownInputProps) {
  const {
    value = '',
    onChange,
    elementProps: {onBlur, onFocus, ref},
    reactMdeProps: {options: mdeCustomOptions, ...reactMdeProps} = {},
    schemaType,
  } = props
  const client = useClient({apiVersion: '2022-01-01'})
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
      status: false,
      ...mdeCustomOptions,
    }
  }, [imageUpload, mdeCustomOptions])

  const handleChange = useCallback(
    (newValue: string) => {
      onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
    },
    [onChange]
  )

  const SimpleMdeReact = useSimpleMdeReact()

  return (
    <MarkdownInputStyles>
      {SimpleMdeReact && (
        <Suspense
          fallback={
            <Box padding={3}>
              <Text>Loading editor...</Text>
            </Box>
          }
        >
          <SimpleMdeReact
            {...reactMdeProps}
            ref={ref}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            options={mdeOptions}
            spellCheck={false}
          />
        </Suspense>
      )}
    </MarkdownInputStyles>
  )
}
