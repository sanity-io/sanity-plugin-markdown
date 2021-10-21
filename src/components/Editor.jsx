import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import sanityClient from 'part:@sanity/base/client'

import Fieldset from 'part:@sanity/components/fieldsets/default'

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

export default React.forwardRef((props, ref) => {
  const {type, value = ''} = props
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

  return (
    <Fieldset
      markers={props.markers}
      presence={props.presence}
      legend={props.type.title}
      description={props.type.description}
      level={props.level}
    >
      <div className="container">
        <ReactMde
          toolbarCommands={options['toolbar'] || defaultToolbarCommands}
          value={editedValue}
          onChange={setEditedValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => Promise.resolve(<Preview markdown={markdown} />)}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          refs={{textarea: ref}}
          paste={{saveImage}}
        />
      </div>
    </Fieldset>
  )
})
