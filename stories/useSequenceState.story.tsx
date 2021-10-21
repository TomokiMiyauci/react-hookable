import { wait } from './utils'

import { Button, Text } from '@chakra-ui/react'

import { useSequenceState } from '@/useSequenceState'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import type { MouseEventHandler } from 'react'

import Docs from '@doc/useSequenceState.mdx'


export const Demo: FunctionalComponent = () => {
  const [pending, sequence] = useSequenceState()

  const handleClick: MouseEventHandler = () => {
    sequence(async () => await wait(2000))
  }
  return (
    <>
      <Text mb="2">pending: {String(pending)}</Text>
      <Button onClick={handleClick} isLoading={pending} disabled={pending}>
        Send
      </Button>
    </>
  )
}

export default {
  title: 'state/useSequenceState',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
