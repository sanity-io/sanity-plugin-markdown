import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {useId} from '@reach/auto-id'

import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import sanityClient from 'part:@sanity/base/client'
import {FormField} from '@sanity/base/components'

import useDebounce from '../hooks/useDebounce'

import 'react-mde/lib/styles/css/react-mde-all.css?raw'

const Preview = ({markdown}) => {
  return <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
}

const defaultToolbarCommands = [
  ['header', 'bold', 'italic', 'strikethrough'],
  ['link', 'quote', 'code'],
  ['unordered-list', 'ordered-list', 'checked-list'],
]

export default React.forwardRef(function MarkdownEditor(props, ref) {
  const {type, value = '', markers, onBlur, onChange, onFocus, presence, readOnly} = props
  const {options = {}} = type
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [editedValue, setEditedValue] = React.useState(value)
  const debouncedValue = useDebounce(editedValue, 100)
  const textarea = React.useRef()

  // Conditionally update textarea styles based on read only access.
  // It's also possible to define inline styles via `childProps.textArea.style` on `<ReactMde />`,
  // but this will override any dynamically created styles provided by the component itself.
  React.useEffect(() => {
    if (textarea.current) {
      textarea.current.style.backgroundColor = readOnly ? 'rgba(240,240,240)' : 'rgba(255,255,255)'
    }
  }, [textarea])

  React.useEffect(() => {
    setEditedValue(value)
  }, [value])

  React.useEffect(() => {
    if (!debouncedValue && value) {
      onChange(PatchEvent.from([unset()]))
    } else if (debouncedValue !== value) {
      onChange(PatchEvent.from([set(debouncedValue)]))
    }
  }, [debouncedValue])

  const saveImage = async function* (data) {
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

  // Generate a random ID to link our FormField label and input component
  const inputId = useId()

  return (
    <FormField
      description={type.description} // Creates description from schema
      inputId={inputId} // A unique ID for this input
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
    >
      {/*
        Assign our forwarded ref to a wrapper element.

        Ideally, this should be assigned to the textarea inside <ReactMde /> component.
        Whilst `react-mde` does allow you to target individual sub-components' refs,
        it will complain if you try and assign a forwarded ref.
      */}
      <div ref={ref}>
        <ReactMde
          toolbarCommands={options['toolbar'] || defaultToolbarCommands}
          value={editedValue}
          onChange={setEditedValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          readOnly={readOnly}
          generateMarkdownPreview={(markdown) => Promise.resolve(<Preview markdown={markdown} />)}
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
      </div>
    </FormField>
  )
})
