import { Alert, AlertIcon, Code, Text } from '@chakra-ui/react'
import { useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'
import { condition, deps } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta } from '@storybook/preact'

import Docs from '@doc/useIdleCallbackEffect.mdx'

const Timestamp = (): JSX.Element => {
  const [ts, setTs] = useState<number>(Date.now())
  useIdleCallbackEffect(
    {
      callback: () => setTs(Date.now()),
      fallback: () => {
        const id = requestAnimationFrame(() => setTs(Date.now()))
        return () => cancelAnimationFrame(id)
      }
    },
    [ts]
  )
  return (
    <>
      <Text>{ts}</Text>
      <Text>callback: updateState</Text>
      <Text>fallback: call on not supported browser</Text>
    </>
  )
}
export const Demo = (): JSX.Element => {
  const [isSupported, { on, off }] = useBoolean(true)
  useIdleCallbackEffect(
    {
      callback: on,
      fallback: off
    },
    []
  )
  return (
    <>
      {!isSupported && (
        <Alert status="error">
          <AlertIcon />
          <Text>
            <Text>
              This browser is not support{' '}
              <Code ml="2">requestIdleCallback</Code>.
            </Text>
            <Text>
              Use <Code>requestAnimationFrame</Code> instead.
            </Text>
          </Text>
        </Alert>
      )}
      <Timestamp />
    </>
  )
}

const argTypes: ArgTypes = {
  callback: {
    description:
      'A reference to a function that should be called in the near future, when the event loop is idle',
    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'IdleRequestCallback'
      }
    }
  },

  fallback: {
    description: 'Called if `requestIdleCallback` is not supported',

    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'EffectCallback'
      }
    }
  },
  options: {
    description: 'Contains optional configuration parameters',

    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'IdleRequestOptions'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useIdleCallbackEffect',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
