import { Box, Button, Flex, HStack, Text, useToast } from '@chakra-ui/react'
import Docs from '@doc/useUnmount.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useBoolean } from '@/useBoolean'
import { useNumber } from '@/useNumber'
import { useUnmount } from '@/useUnmount'

const Children: FunctionalComponent = () => {
  const { use, disuse } = useUnmount()
  const [count, { inc, set }] = useNumber()
  const toast = useToast()
  const defineToast = () =>
    toast({
      title: `Unmount ${count}`,
      description: 'Fire on unmount'
    })
  return (
    <Box>
      <Text mb="1.5">use: {count}</Text>
      <HStack space="x-2">
        <Button
          onClick={() => {
            inc()
            use(defineToast)
          }}
        >
          use
        </Button>
        <Button
          onClick={() => {
            disuse()
            set(0)
          }}
        >
          disuse
        </Button>
      </HStack>
    </Box>
  )
}
export const Demo: FunctionalComponent = () => {
  const [isShow, { toggle }] = useBoolean(true)
  return (
    <Flex experimental_spaceX="4">
      <Button onClick={toggle}>{isShow ? 'Unmount' : 'Mount'}</Button>

      {isShow && <Children />}
    </Flex>
  )
}

export default {
  title: 'procedure/useUnmount',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
