import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

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
  const {type, value = '', markers, presence, readOnly} = props
  const {options = {}} = type
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [editedValue, setEditedValue] = React.useState(value)
  const debouncedValue = useDebounce(editedValue, 100)

  React.useEffect(() => {
    setEditedValue(value)
  }, [value])

  React.useEffect(() => {
    if (!debouncedValue && value) {
      props.onChange(PatchEvent.from([unset()]))
    } else if (debouncedValue !== value) {
      props.onChange(PatchEvent.from([set(debouncedValue)]))
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

  const tex = React.useRef()


  // Style readOnly, awkwardly
  React.useEffect(() => {
    if (tex.current) {
      tex.current.style.backgroundColor = readOnly ? 'rgba(240,240,240)' : 'rgba(255, 255, 255)'
    }
  }, [tex])

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      onFocus={props.onFocus}
    >
      <ReactMde
        ref={ref}
        onFocus={props.onFocus}
        refs={{
          textarea: tex
        }}
        toolbarCommands={options['toolbar'] || defaultToolbarCommands}
        value={editedValue}
        onChange={setEditedValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        readOnly={readOnly}
        generateMarkdownPreview={(markdown) => Promise.resolve(<Preview markdown={markdown} />)}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{saveImage}}
      />
    </FormField>
  )
})
