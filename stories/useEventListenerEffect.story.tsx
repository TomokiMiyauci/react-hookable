import { Button, Code, HStack, Text, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useEventListenerEffect } from '@/useEventListenerEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useEventListenerEffect.mdx'
export const Demo: FunctionalComponent = () => {
  const toast = useToast({ title: 'useEventListenerEffect' })
  const ref = useRef<HTMLButtonElement>(null)
  const [disabled, { toggle }] = useBoolean(true)
  useEventListenerEffect(
    {
      target: ref,
      type: 'click',
      listener: (ev) => {
        toast({
          description: ev.type
        })
      }
    },
    [disabled],
    () => !disabled
  )
  return (
    <>
      <HStack mb="2" space="x-2">
        <Button onClick={toggle}>{disabled ? 'use' : 'disuse'}</Button>

        <Text>
          use: <Code>{String(!disabled)}</Code>
        </Text>
      </HStack>
      <Button disabled={disabled} ref={ref}>
        alert
      </Button>
    </>
  )
}

export default {
  title: 'effect/useEventListenerEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
