import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import classNames from 'classnames'
import {uniqueId, isEqual} from 'lodash'

import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import sanityClient from 'part:@sanity/base/client'

import Fieldset from 'part:@sanity/components/fieldsets/default'
import {BoundaryElementProvider, Layer, Portal, PortalProvider} from '@sanity/ui'

import useDebounce from '../hooks/useDebounce'

import './mde-editor.css?raw'
import 'react-mde/lib/styles/css/react-mde-preview.css?raw'
import 'react-mde/lib/styles/css/react-mde-suggestions.css?raw'
import 'react-mde/lib/styles/css/react-mde-toolbar.css?raw'
import 'react-mde/lib/styles/css/react-mde.css?raw'
import styles from './Editor.module.css'

import {ExpandCollapseButton} from './ExpandCollapseButton'

const Preview = ({markdown}) => {
  return <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
}

const defaultToolbarCommands = [
  ['header', 'bold', 'italic', 'strikethrough'],
  ['link', 'quote', 'code'],
  ['unordered-list', 'ordered-list', 'checked-list'],
]

export default function Editor(props) {
  const {type, value} = props
  const {options = {}} = type
  const activationId = React.useMemo(() => uniqueId('MarkdownInput'), [])

  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [portalElement, setPortalElement] = React.useState(null)
  const [scrollContainerElement, setScrollContainerElement] = React.useState(null)

  const [selectedTab, setSelectedTab] = React.useState('write')
  const [editedValue, setEditedValue] = React.useState(value)
  const debouncedValue = useDebounce(editedValue, 100)

  const handleToggleFullscreen = () => setIsFullscreen(!isFullscreen)

  React.useEffect(() => {
    setEditedValue(value)
  }, [value])

  React.useEffect(() => {
    if (!debouncedValue || debouncedValue === '') {
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

  const mdEditor = React.useMemo(
    () => (
      <>
        <ExpandCollapseButton isFullscreen={false} onToggleFullscreen={handleToggleFullscreen} />
        <ReactMde
          toolbarCommands={options['toolbar'] || defaultToolbarCommands}
          value={editedValue}
          onChange={setEditedValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          minEditorHeight={isFullscreen ? '100vh' : '500'}
          generateMarkdownPreview={(markdown) => Promise.resolve(<Preview markdown={markdown} />)}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          classes={{
            reactMde: classNames('editorBoxContent'),
          }}
          paste={{saveImage}}
        />
      </>
    ),
    [editedValue, selectedTab, saveImage, isFullscreen]
  )

  return (
    <Fieldset
      markers={props.markers}
      presence={props.presence}
      legend={props.type.title}
      description={props.type.description}
      level={props.level}
    >
      {isFullscreen && (
        <Portal key={`portal-${activationId}`}>
          <PortalProvider element={portalElement}>
            <BoundaryElementProvider element={scrollContainerElement}>
              <Layer className={classNames(styles.fullscreenPortal, styles.editorWrapper)}>
                {mdEditor}
              </Layer>
            </BoundaryElementProvider>
          </PortalProvider>
        </Portal>
      )}
      {!isFullscreen && mdEditor}
    </Fieldset>
  )
}
