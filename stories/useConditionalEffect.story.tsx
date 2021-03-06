import { Button, Code, Text, useToast } from '@chakra-ui/react'

import { useBoolean } from '@/useBoolean'
import { useConditionalEffect } from '@/useConditionalEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'


import Docs from '@doc/useConditionalEffect.mdx'
export const Demo: FunctionalComponent = () => {
  const [state, { toggle }] = useBoolean()
  const toast = useToast()

  useConditionalEffect(
    () => {
      toast({
        title: 'useConditionalEffect',
        description: 'Alert on true'
      })
    },
    [state],
    () => state
  )
  return (
    <>
      <Button mb="2" onClick={toggle}>
        toggle
      </Button>
      <Text>
        state: <Code>{String(state)}</Code>
      </Text>
    </>
  )
}

export default {
  title: 'enhancement/useConditionalEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
