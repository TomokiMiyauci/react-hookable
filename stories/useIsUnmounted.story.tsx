import { Alert } from '@chakra-ui/react'
import { useEffect } from 'preact/hooks'

import { useIsUnmounted } from '@/useIsUnmounted'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'


import Docs from '@doc/useIsUnmounted.mdx'

export const Demo: FunctionalComponent = () => {
  const hasUnmounted = useIsUnmounted()
  console.log('unmounted:', hasUnmounted.current)

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log('unmounted:', hasUnmounted.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Alert>See console log</Alert>
}

export default {
  title: 'lifecycle/useIsUnmounted',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
