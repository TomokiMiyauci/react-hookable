import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react'
import Docs from '@doc/useSafeState.mdx'
import type { ExtendedArgType } from '@story/shared/types'
import type { Meta } from '@storybook/preact'
import { useState } from 'preact/hooks'

import { useSafeState } from '@/useSafeState'
export const Demo = (): JSX.Element => {
  const [state, setState] = useState(0)
  useSafeState()
  return (
    <>
      <Alert>
        <AlertIcon />
        Before updating the value, check if it is unmounted. This avoids no-op
        leaks.
      </Alert>

      <Alert status="warning">
        <AlertIcon />
        <Text>
          <Text>
            This can be used in place of `useState`, but should not replace all
            `useState`.
          </Text>
          <Text>
            It has a very small overhead, so use it only if you want to update
            the state during asynchronous processing.
          </Text>
        </Text>
      </Alert>

      <Text mt="4">state: {state}</Text>
      <Text>
        stateUpdater:
        <Button ml="2" onClick={() => setState((state) => state + 1)}>
          inc
        </Button>
      </Text>
    </>
  )
}

const argTypes: Record<string, ExtendedArgType> = {
  initialState: {
    description:
      'The initial value (or a function that returns the initial value)',

    table: {
      category: 'args',
      type: {
        summary: 'S | () => S'
      }
    }
  },
  state: {
    description: 'Stateful value',
    table: {
      category: 'returns',
      subcategory: '[0]',
      type: {
        summary: 'S'
      }
    }
  },
  stateUpdater: {
    description: 'A function to update stateful value',
    table: {
      category: 'returns',
      subcategory: '[1]',
      type: {
        summary: 'Dispatch<SetStateAction<S>>'
      }
    }
  }
}

export default {
  title: 'enhancement/useSafeState',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  },
  argTypes
} as Meta<typeof Demo>
