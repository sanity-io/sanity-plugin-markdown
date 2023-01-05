import styled from 'styled-components'
import {Box} from '@sanity/ui'

export const MarkdownInputStyles = styled(Box)`
  & .CodeMirror.CodeMirror {
    color: ${({theme}) => theme.sanity.color.card.enabled.fg};
    border-color: ${({theme}) => theme.sanity.color.card.enabled.border};
    background-color: inherit;
  }

  & .cm-s-easymde .CodeMirror-cursor {
    border-color: ${({theme}) => theme.sanity.color.card.enabled.fg};
  }

  & .editor-toolbar,
  .editor-preview-side {
    border-color: ${({theme}) => theme.sanity.color.card.enabled.border};
  }

  & .CodeMirror-focused .CodeMirror-selected.CodeMirror-selected.CodeMirror-selected {
    background-color: ${({theme}) => theme.sanity.color.selectable.primary.hovered.bg};
  }

  & .CodeMirror-selected.CodeMirror-selected.CodeMirror-selected {
    background-color: ${({theme}) => theme.sanity.color.card.enabled.bg};
  }

  & .editor-toolbar > * {
    color: ${({theme}) => theme.sanity.color.card.enabled.fg};
  }

  & .editor-toolbar > .active,
  .editor-toolbar > button:hover,
  .editor-preview pre,
  .cm-s-easymde .cm-comment {
    background-color: ${({theme}) => theme.sanity.color.card.enabled.bg};
  }

  & .editor-preview {
    background-color: ${({theme}) => theme.sanity.color.card.enabled.bg};

    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: revert;
    }

    & ul,
    li {
      list-style: revert;
      padding: revert;
    }

    & a {
      text-decoration: revert;
    }
  }
`
