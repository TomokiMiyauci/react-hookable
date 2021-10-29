import { Text } from '@chakra-ui/react'

import Portal from '@/components/Portal'
import { argTypes } from '@story/components/Portal/docs'

import type { Meta } from '@storybook/preact'

import Docs from '@doc/useAnimationFrameEffect.mdx'

export const Demo = (): JSX.Element => {
  return (
    <>
      <Portal>
        <Text>inner portal</Text>
      </Portal>

      <Text>outer portal</Text>
    </>
  )
}

export default {
  title: 'component/Portal',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
