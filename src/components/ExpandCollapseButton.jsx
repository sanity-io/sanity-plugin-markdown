import FullscreenExitIcon from 'part:@sanity/base/fullscreen-exit-icon'
import Button from 'part:@sanity/components/buttons/default'
import FullscreenIcon from 'part:@sanity/base/fullscreen-icon'
import styles from './Editor.module.css'
import React from 'react'

const IS_MAC =
  typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)

export function ExpandCollapseButton(props) {
  const {isFullscreen, onToggleFullscreen} = props

  return (
    <Button
      icon={isFullscreen ? FullscreenExitIcon : FullscreenIcon}
      className={styles.fullscreenButton}
      kind="simple"
      onClick={onToggleFullscreen}
      padding="small"
      title={`Open in fullscreen (${IS_MAC ? 'cmd' : 'ctrl'}+enter)`}
    ></Button>
  )
}
