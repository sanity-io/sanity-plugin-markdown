import {lazy, useEffect, useState} from 'react'

export const SimpleMdeReact = lazy(() => import('react-simplemde-editor'))

export function useSimpleMdeReact() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return mounted ? SimpleMdeReact : null
}
