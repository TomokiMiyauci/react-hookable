import {
  Box,
  Button,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'
import Docs from '@doc/useDebounce.mdx'
import type { Meta } from '@storybook/preact'
import { FunctionalComponent } from 'preact'

import { useDebounce } from '@/useDebounce'
import { useNumber } from '@/useNumber'
import { useUpdateEffect } from '@/useUpdateEffect'
import type { AnyFn } from '@/utils/types'

export const Demo: FunctionalComponent = () => {
  const [count, { inc, dec, set }] = useNumber()
  const [clickCount, { inc: clickCountUp }] = useNumber()
  const [invokeCount, { inc: invoked }] = useNumber()
  const [duration, { set: setDuration }] = useNumber(1000)

  const { use } = useDebounce()

  const countUpFn = (fn: AnyFn) => {
    clickCountUp()
    fn()
  }

  useUpdateEffect(invoked, [count])

  return (
    <>
      <Text>clicked: {clickCount}</Text>
      <Text>invoked: {invokeCount}</Text>
      <Text>count: {count}</Text>
      <Text>duration: {duration}ms</Text>

      <Box p="3.5">
        <Slider
          onChange={setDuration}
          defaultValue={1000}
          value={duration}
          min={0}
          max={2000}
          step={500}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>

      <HStack padding="1.5">
        <Button onClick={() => countUpFn(() => use(inc, duration))}>
          Increment
        </Button>
        <Button onClick={() => countUpFn(() => use(dec, duration))}>
          Decrement
        </Button>
        <Button onClick={() => countUpFn(() => use(() => inc(5), duration))}>
          Increment(5)
        </Button>
        <Button onClick={() => countUpFn(() => use(() => dec(5), duration))}>
          Decrement(5)
        </Button>
        <Button onClick={() => countUpFn(() => use(() => set(100), duration))}>
          Set(100)
        </Button>
      </HStack>
    </>
  )
}

export default {
  title: 'procedure/useDebounce',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta
