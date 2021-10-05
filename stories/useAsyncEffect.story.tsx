import { Text } from '@chakra-ui/react'
import Docs from '@doc/useAsyncEffect.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms)
  )

import { useAsyncEffect } from '@/useAsyncEffect'
export const Demo: FunctionalComponent = () => {
  const [effected, setEffected] = useState<boolean>(false)
  useAsyncEffect(async () => {
    await wait(1000)
    setEffected(true)
  }, [])

  return <Text>effected: {String(effected)}</Text>
}

export default {
  title: 'Lifecycle/useAsyncEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Docs>
