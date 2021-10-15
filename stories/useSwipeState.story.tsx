import { Box, Button, Code, Text } from '@chakra-ui/react'
import Docs from '@doc/useSwipeState.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'

import { useSwipeState } from '@/useSwipeState'
export const Demo: FunctionalComponent = () => {
  const [
    { isSwiping, direction, lengthX, lengthY, coordsEnd, coordsStart },
    { use, disuse, reset }
  ] = useSwipeState()
  const ref = useRef<HTMLDivElement>(null)

  const exceed = useMemo<boolean>(() => lengthX > 70, [lengthX])

  const [left, setLeft] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!ref.current) return
    use(ref.current, {
      onSwipe: () => {
        if (lengthX > 0) {
          setLeft(`${Math.abs(lengthX).toFixed(0)}px`)
        }
      },
      onSwipeEnd: () => {
        if (lengthX > 70) {
          setLeft('100%')
        } else {
          setLeft('0')
        }
      }
    })

    return disuse
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lengthX])
  return (
    <>
      <Box
        overflow="hidden"
        p="2"
        bg={exceed ? 'green.500' : 'blackAlpha.800'}
        textAlign="center"
        position="relative"
      >
        <Button
          onClick={() => {
            setLeft('0')
            reset()
          }}
        >
          reset
        </Button>

        <Box
          bg="blue.400"
          position="absolute"
          top="0"
          width="full"
          height="full"
          textAlign="center"
          style={{
            left,
            transition: isSwiping ? undefined : 'all 75ms'
          }}
          ref={ref}
        >
          Swipe Right
        </Box>
      </Box>
      <Text>
        isSwipeing: <Code>{String(isSwiping)}</Code>
      </Text>
      <Text>direction: {direction}</Text>
      <Text>lengthX: {lengthX}</Text>
      <Text>lengthY: {lengthY}</Text>
      <Text>coordsStart: {JSON.stringify(coordsStart)}</Text>
      <Text>coordsEnd: {JSON.stringify(coordsEnd)}</Text>
    </>
  )
}

export default {
  title: 'useSwipeState',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
