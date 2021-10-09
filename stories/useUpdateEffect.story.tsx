import { Button, Text, useToast } from '@chakra-ui/react'
import Docs from '@doc/useUpdateEffect.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useBoolean } from '@/useBoolean'
import { useUpdateEffect } from '@/useUpdateEffect'
export const Demo: FunctionalComponent = () => {
  const [state, { toggle }] = useBoolean()
  const toast = useToast()

  useUpdateEffect(() => {
    toast({
      title: 'useUpdateEffect Demo',
      description: 'The deps updated',
      status: 'success',
      isClosable: true
    })
  }, [state])

  return (
    <>
      <Text mb="1.5">state: {String(state)}</Text>

      <Button onClick={toggle}>Toggle</Button>
    </>
  )
}

export default {
  title: 'Enhancement/useUpdateEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
