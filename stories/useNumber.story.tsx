import { Button, HStack, Text } from '@chakra-ui/react'

import { useNumber } from '@/useNumber'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useNumber.mdx'


export const Demo: FunctionalComponent = () => {
  const [state, { inc, dec, set }] = useNumber()

  return (
    <>
      <Text>Number: {state}</Text>

      <HStack padding="1.5">
        <Button onClick={() => inc()}>Increment</Button>
        <Button onClick={() => dec()}>Decrement</Button>
        <Button onClick={() => inc(5)}>Increment(5)</Button>
        <Button onClick={() => dec(5)}>Decrement(5)</Button>
        <Button onClick={() => set(100)}>Set(100)</Button>
      </HStack>
    </>
  )
}

export default {
  title: 'state/useNumber',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
