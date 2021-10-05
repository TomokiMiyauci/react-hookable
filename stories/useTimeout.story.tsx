import { Button, HStack, Text } from '@chakra-ui/react'
import Docs from '@doc/useTimeout.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useNumber } from '@/useNumber'
import { useTimeout } from '@/useTimeout'

export const Demo: FunctionalComponent = () => {
  const [timers, { add, clear }] = useTimeout()
  const [count, { inc, set }] = useNumber()

  return (
    <>
      <Text>timers: {count}</Text>

      <HStack my="1.5">
        <Button
          onClick={() => {
            add(inc, 0)
            console.info(timers.current)
          }}
        >
          add
        </Button>
        <Button
          onClick={() => {
            clear()
            set(0)
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
  title: 'utility/useTimeout',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
