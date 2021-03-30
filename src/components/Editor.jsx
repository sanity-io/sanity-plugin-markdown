import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import PatchEvent, {set} from 'part:@sanity/form-builder/patch-event'
import sanityClient from 'part:@sanity/base/client'

import Fieldset from 'part:@sanity/components/fieldsets/default'

import useDebounce from '../hooks/useDebounce'

import './Editor.css?raw'
import 'react-mde/lib/styles/css/react-mde-all.css?raw'

const Preview = ({markdown}) => {
  return <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
}

export default function Editor(props) {
  const [value, setValue] = React.useState(props.value)
  const [selectedTab, setSelectedTab] = React.useState('write')
  const debouncedValue = useDebounce(value, 200)

  React.useEffect(() => {
    if (debouncedValue) {
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
          toolbarCommands={[
            ['header', 'bold', 'italic', 'strikethrough'],
            ['link', 'quote', 'code'],
            ['unordered-list', 'ordered-list', 'checked-list'],
          ]}
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => Promise.resolve(<Preview markdown={markdown} />)}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          paste={{ saveImage }}
        />
      </div>
    </Fieldset>
  )
}
