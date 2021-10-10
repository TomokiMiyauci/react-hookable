import { Box, Button, HStack, Text } from '@chakra-ui/react'
import Docs from '@doc/useWindowScrollState.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useWindowScrollState } from '@/useWindowScrollState'
export const Demo: FunctionalComponent = () => {
  const [position, { use, disuse }] = useWindowScrollState()

  return (
    <Box position="relative" h="8xl">
      <HStack space="x-2">
        <Button onClick={() => use()}>use</Button>
        <Button onClick={disuse}>disuse</Button>
      </HStack>
      <Box p="2" position="fixed" bottom="0" right="0">
        <Text>scroll value</Text>
        <Text>x: {position.x?.toFixed(0)}</Text>
        <Text>y: {position.y?.toFixed(0)}</Text>
      </Box>
    </Box>
  )
}

export default {
  title: 'stateset/useScroll',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
