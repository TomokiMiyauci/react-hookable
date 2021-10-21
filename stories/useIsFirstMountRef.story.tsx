import { Alert, AlertIcon, Button } from '@chakra-ui/react'
import { useEffect } from 'preact/hooks'

import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useNumber } from '@/useNumber'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useIsFirstMountRef.mdx'
export const Demo: FunctionalComponent = () => {
  const [, { inc }] = useNumber()
  const { isFirstMount } = useIsFirstMountRef()

  useEffect(() => {
    console.info('isFirstMount: ', isFirstMount)
  })

  return (
    <>
      <Alert rounded="md" status="info" mb="2">
        <AlertIcon />
        Check console
      </Alert>
      <Button onClick={() => inc()}>re-render</Button>
    </>
  )
}

export default {
  title: 'ref/useIsFirstMountRef',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
