import MDEditor from '@uiw/react-md-editor'
import useDebounce from '../hooks/useDebounce'
import {PatchEvent, SanityClient, set, StringInputProps, unset, useClient} from 'sanity'
import React, {
  ClipboardEvent,
  forwardRef,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  DragEvent,
} from 'react'
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
  const client = useClient({apiVersion: '2022-01-01'})
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

  const {sanity: studioTheme} = useTheme()
  const onPaste = useCallback(
    async (event: ClipboardEvent<HTMLDivElement>) => {
      await onImagePasted(event.clipboardData, setEditedValue, client)
    },
    [setEditedValue, client]
  )

  const onDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (event.dataTransfer) {
        await onImagePasted(event.dataTransfer, setEditedValue, client)
      }
    },
    [setEditedValue, client]
  )

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
          onPaste={onPaste}
          onDrop={onDrop}
        />
      )}
    </div>
  )
})

// https://github.com/uiwjs/react-md-editor/issues/83#issuecomment-1185471844
async function onImagePasted(
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void,
  client: SanityClient
) {
  const files: File[] = []
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index)

    if (file) {
      files.push(file)
    }
  }

  await Promise.all(
    files.map(async (file) => {
      const url = await client.assets.upload('image', file).then((doc) => `${doc.url}?w=450`)
      const insertedMarkdown = insertToTextArea(`![](${url})`)
      if (!insertedMarkdown) {
        return
      }
      setMarkdown(insertedMarkdown)
    })
  )
}

function insertToTextArea(insertString: string) {
  const textarea = document.querySelector('textarea')
  if (!textarea) {
    return null
  }

  let sentence = textarea.value
  const len = sentence.length
  const pos = textarea.selectionStart
  const end = textarea.selectionEnd

  const front = sentence.slice(0, pos)
  const back = sentence.slice(pos, len)

  sentence = front + insertString + back

  textarea.value = sentence
  textarea.selectionEnd = end + insertString.length

  return sentence
}
