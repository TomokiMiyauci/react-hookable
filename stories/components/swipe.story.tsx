/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text } from '@chakra-ui/react'
import type { Meta, Story } from '@storybook/preact'
import clsx from 'clsx'
import { useMemo } from 'preact/hooks'

import type { SwipeProps } from '@/components/swipe'
import Swipe from '@/components/swipe'
import { useBoolean } from '@/useBoolean'
const threshold = -100

const Template: Story<SwipeProps> = (args) => {
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
      <Swipe
        onSwipeEnd={(_, { reset, lengthY }) => {
          if (lengthY < threshold) {
            on()
          }
          reset()
        }}
        {...args}
      >
        {({ isSwiping, lengthY }) => {
          const translateY = useMemo(
            () =>
              isExceed
                ? 'translateY(100%)'
                : `translateY(${-lengthY.toFixed(1)}px)`,
            [lengthY, isExceed]
          )

          const isEx = useMemo(() => lengthY < threshold, [lengthY])
          return (
            <div
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
              <div className="text-center">
                <span className="w-24 h-1 inline-block rounded-full bg-gray-200" />
              </div>
              <div className="flex-1 grid place-items-center">
                <Text>Swipe down</Text>
              </div>
            </div>
          )
        }}
      </Swipe>
    </>
  )
}

export const Demo = Template.bind({})

export default {
  title: 'component/swipe',
  component: Swipe
} as Meta<typeof Swipe>

export { Swipe }
