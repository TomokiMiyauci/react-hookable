import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToast
} from '@chakra-ui/react'
import Docs from '@doc/useWait.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useNumber } from '@/useNumber'
import { useWait } from '@/useWait'
export const Demo: FunctionalComponent = () => {
  const { use: wait } = useWait()
  const [ms, { set: setMs }] = useNumber(1000)

  const toast = useToast()
  const handleClick = async () => {
    await wait(ms)
    toast({
      title: 'useWait',
      description: `wait for ${ms}`
    })
  }
  return (
    <>
      <Text>ms: {ms}ms</Text>

      <Box p="3.5">
        <Slider
          onChange={setMs}
          defaultValue={1000}
          value={ms}
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
      <Button onClick={handleClick}>use</Button>
    </>
  )
}

export default {
  title: 'useWait',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
