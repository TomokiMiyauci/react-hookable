/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Text } from '@chakra-ui/react'
import type { Meta, Story } from '@storybook/preact'
import clsx from 'clsx'
import { useMemo } from 'preact/hooks'

import type { SwipeProps } from '@/components/swipe'
import Swipe from '@/components/swipe'
import { useBoolean } from '@/useBoolean'
const threshold = -100

const Template: Story<SwipeProps<HTMLElement>> = (args) => {
  const [isExceed, { on, off }] = useBoolean()
  return (
    <>
      {isExceed && (
        <Button
          onClick={() => {
            off()
          }}
        >
          Reset
        </Button>
      )}
      <Swipe<HTMLDivElement>
        onSwipeEnd={(_, { reset, lengthY }) => {
          if (lengthY < threshold) {
            on()
          }
          reset()
        }}
        {...args}
      >
        {({ isSwiping, lengthY, ref }) => {
          const translateY = useMemo(
            () =>
              isExceed
                ? 'translateY(100%)'
                : `translateY(${-lengthY.toFixed(1)}px)`,
            [lengthY, isExceed]
          )

          const isEx = useMemo(() => lengthY < threshold, [lengthY])
          return (
            <Box
              overflow="hidden"
              className={clsx(
                'relative border flex flex-col rounded-2xl shadow h-screen',
                {
                  'transition duration-300': !isSwiping,
                  'bg-blue-100': isEx
                }
              )}
              style={{
                transform: translateY
              }}
            >
              <Box
                bg="gray.50"
                borderBottom="1px"
                borderColor="gray.200"
                ref={ref}
                className="text-center"
              >
                <span className="w-24 h-1 inline-block animate-pulse rounded-full bg-gray-200" />
                <Text>Swipe down</Text>
              </Box>
              <div className="flex-1 grid place-items-center"></div>
            </Box>
          )
        }}
      </Swipe>
    </>
  )
}

export const Demo = Template.bind({})

export default {
  title: 'component/Swipe',
  component: Swipe
} as Meta<typeof Swipe>

export { Swipe }
