import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {useId} from '@reach/auto-id'

import useDebounce from '../hooks/useDebounce'
import 'react-mde/lib/styles/css/react-mde-all.css'
import {PatchEvent, set, unset} from 'sanity/form'
import {StringInputProps, useClient} from 'sanity'
import React, {
  FC,
  forwardRef,
  PropsWithChildren,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {ToolbarCommands} from 'react-mde/lib/definitions/types'
import styled from 'styled-components'
import {Theme, useTheme} from '@sanity/ui'

const Preview = ({markdown}: {markdown: string}) => {
  return <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
}

const defaultToolbarCommands = [
  ['header', 'bold', 'italic', 'strikethrough'],
  ['link', 'quote', 'code'],
  ['unordered-list', 'ordered-list', 'checked-list'],
]

type SanityTheme = Theme['sanity']

type Style = PropsWithChildren<{
  studioTheme: SanityTheme
}>

// !important is used whenever we need to override inline styles for an element
const MarkdownTheme: FC<Style> = styled.div`
  & .react-mde {
    border-color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.border};
  }

  & .mde-text {
    background: ${({studioTheme}: Style) => studioTheme.color.input.default.enabled.bg} !important;
    color: ${({studioTheme}: Style) => studioTheme.color.input.default.enabled.fg} !important;
  }

  & .mde-header {
    background: ${({studioTheme}: Style) => studioTheme.color.card.enabled.bg};
    color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.fg};
    border-color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.border};

    & button,
    .mde-header-item.mde-header-item.mde-header-item button {
      color: ${({studioTheme}: Style) => studioTheme.color.button.bleed.default.enabled.fg};
    }

    & button.selected {
      border-color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.border};
    }
  }

  & .image-tip {
    background: ${({studioTheme}: Style) => studioTheme.color.card.enabled.bg};
    color: ${({studioTheme}: Style) => studioTheme.color.muted.default.enabled.fg};
    font-family: ${({studioTheme}: Style) => studioTheme.fonts.text.family};
    border-color: ${({studioTheme}: Style) => studioTheme.color.card.enabled.border};
  }
`

export const MarkdownEditor = forwardRef(function MarkdownEditor(
  props: StringInputProps,
  ref: Ref<any>
) {
  const {schemaType: type, value = '', onBlur, onChange, onFocus, readOnly} = props
  const options: {toolbar?: ToolbarCommands} | undefined = type.options as any
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  const [editedValue, setEditedValue] = useState(value)
  const debouncedValue = useDebounce(editedValue, 100)
  const textarea = useRef<HTMLTextAreaElement>(null)
  const sanityClient = useClient()

  // Conditionally update textarea styles based on read only access.
  // It's also possible to define inline styles via `childProps.textArea.style` on `<ReactMde />`,
  // but this will override any dynamically created styles provided by the component itself.
  useEffect(() => {
    if (textarea.current) {
      textarea.current.style.backgroundColor = readOnly ? 'rgba(240,240,240)' : 'rgba(255,255,255)'
    }
  }, [textarea, readOnly])

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

  const saveImage = async function* (data: any) {
    const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

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
  }

  const generatePreview = useCallback(
    (markdown: string) => Promise.resolve(<Preview markdown={markdown} />),
    []
  )

  const inputId = useId()
  const {sanity: studioTheme} = useTheme()
  /*
   Assign our forwarded ref to a wrapper element.
   Ideally, this should be assigned to the textarea inside <ReactMde /> component.
   Whilst `react-mde` does allow you to target individual sub-components' refs,
   it will complain if you try and assign a forwarded ref.
  */
  return (
    <div ref={ref}>
      <MarkdownTheme studioTheme={studioTheme}>
        <ReactMde
          toolbarCommands={options?.toolbar || defaultToolbarCommands}
          value={editedValue}
          onChange={setEditedValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          readOnly={readOnly}
          generateMarkdownPreview={generatePreview}
          childProps={{
            textArea: {
              id: inputId,
              onBlur,
              onFocus,
            },
            writeButton: {
              tabIndex: -1,
            },
          }}
          paste={{saveImage}}
          refs={{textarea}}
        />
      </MarkdownTheme>
    </div>
  )
})
