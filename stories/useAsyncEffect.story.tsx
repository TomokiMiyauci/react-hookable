import { Text } from '@chakra-ui/react'
import { useState } from 'preact/hooks'

import { useAsyncEffect } from '@/useAsyncEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useAsyncEffect.mdx'

const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms)
  )

export const Demo: FunctionalComponent = () => {
  const [effected, setEffected] = useState<boolean>(false)
  useAsyncEffect(async () => {
    await wait(1000)
    setEffected(true)
  }, [])

  return <Text>effected: {String(effected)}</Text>
}

export default {
  title: 'Enhancement/useAsyncEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Docs>
