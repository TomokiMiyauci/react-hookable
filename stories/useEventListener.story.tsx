import { Button, HStack, Text } from '@chakra-ui/react'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

import { useEventListener } from '@/useEventListener'
import type { Maybe } from '@/utils/types'
export const Demo: FunctionalComponent = () => {
  const { add, remove } = useEventListener()
  const [{ x, y }, setPosition] = useState<{
    x: Maybe<number>
    y: Maybe<number>
  }>({ x: undefined, y: undefined })

  return (
    <>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>

      <HStack padding="1.5">
        <Button
          onClick={() =>
            add(window, 'mousemove', ({ x, y }) => {
              setPosition({
                x,
                y
              })
            })
          }
        >
          add
        </Button>
        <Button onClick={remove}>remove</Button>
      </HStack>
    </>
  )
}
export default {
  title: 'stateless/useEventListener',
  component: Demo
} as Meta<typeof Demo>
