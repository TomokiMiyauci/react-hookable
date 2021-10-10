import {
  Box,
  Button,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToast
} from '@chakra-ui/react'
import Docs from '@doc/useTimeout.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

import { useTimeout } from '@/useTimeout'

export const Demo: FunctionalComponent = () => {
  const { use, disuse } = useTimeout()
  const [duration, setDuration] = useState(1000)
  const toast = useToast()

  return (
    <>
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

      <HStack my="1.5">
        <Button
          onClick={() => {
            use(
              () =>
                toast({
                  title: 'useTimeout',
                  description: `Timeout: ${duration}`
                }),
              duration
            )
          }}
        >
          use
        </Button>
        <Button onClick={disuse}>disuse</Button>
      </HStack>
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
