import MDEditor from '@uiw/react-md-editor'
import useDebounce from '../hooks/useDebounce'
import {StringInputProps, PatchEvent, set, unset} from 'sanity'
import React, {forwardRef, Ref, useEffect, useState} from 'react'
import {Card, useTheme} from '@sanity/ui'
import rehypeSanitize from 'rehype-sanitize'

export const MarkdownEditor = forwardRef(function MarkdownEditor(
  props: StringInputProps,
  ref: Ref<any>
) {
  const {
    value = '',
    onChange,
    elementProps: {onBlur, onFocus},
    readOnly,
  } = props
  const [editedValue, setEditedValue] = useState<string | undefined>(value)
  const debouncedValue = useDebounce(editedValue, 100)
  // const client = useClient({apiVersion: '2021-03-25'})

  useEffect(() => {
    setEditedValue(value)
  }, [value])

  useEffect(() => {
    if (!debouncedValue && value) {
      onChange(PatchEvent.from([unset()]))
    } else if (debouncedValue !== value) {
      onChange(PatchEvent.from([set(debouncedValue)]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, onChange])

  /*  const saveImage = async function* (data: any) {

    let success = true
    const result = await client.assets
      .upload('image', data)
      .then((doc) => `${doc.url}?w=450`)
      .catch(() => {
        success = false
        return `Error: Could not upload file. Only images are supported.`
      })

    yield result
    return success
  }*/

  const {sanity: studioTheme} = useTheme()
  return (
    <div ref={ref} data-color-mode={studioTheme.color.dark ? 'dark' : 'light'}>
      {readOnly ? (
        <Card border padding={3}>
          <MDEditor.Markdown source={value} rehypePlugins={[[rehypeSanitize]]} />
        </Card>
      ) : (
        <MDEditor
          value={editedValue}
          onChange={setEditedValue}
          onBlur={onBlur}
          onFocus={onFocus}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          preview="edit"
        />
      )}
    </div>
  )
})
