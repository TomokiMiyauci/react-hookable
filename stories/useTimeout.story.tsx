import { Button, HStack, Text } from '@chakra-ui/react'
import Docs from '@doc/useTimeout.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useNumber } from '@/useNumber'
import { useTimeout } from '@/useTimeout'

export const Demo: FunctionalComponent = () => {
  const { set, clear, _ref: timers } = useTimeout()
  const [count, { inc, set: setCount }] = useNumber()

  return (
    <>
      <Text>timers: {count}</Text>

      <HStack my="1.5">
        <Button
          onClick={() => {
            set(inc, 0)
            console.info(timers.current)
          }}
        >
          add
        </Button>
        <Button
          onClick={() => {
            clear()
            setCount(0)
            console.info(timers.current)
          }}
        >
          clear
        </Button>
      </HStack>

      <Text>See the console for the actual timer</Text>
    </>
  )
}

export default {
  title: 'procedure/useTimeout',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
