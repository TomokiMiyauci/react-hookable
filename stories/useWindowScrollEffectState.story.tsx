import { Box, Text } from '@chakra-ui/react'

import { useWindowScrollEffectState } from '@/useWindowScrollEffectState'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta } from '@storybook/preact'

import Docs from '@doc/useWindowScrollEffectState.mdx'

export const Demo = (): JSX.Element => {
  const [{ scrollY, scrollX }] = useWindowScrollEffectState({}, [])
  return (
    <>
      <div className="h-[200vh] w-[200vw]"></div>

      <Box p="2" position="fixed" top="0.5" left="0.5">
        <Text>scrollX: {scrollX.toFixed(0)}</Text>
        <Text>scrollY: {scrollY.toFixed(0)}</Text>
      </Box>
    </>
  )
}

const argTypes: ArgTypes = {
  options: {
    description: 'EventListener options',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'AddEventListenerOptions | boolean'
      }
    }
  },
  deps,
  condition,
  scrollX: {
    description: '`window.scrollX`',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'number'
      },
      defaultValue: {
        summary: 0
      }
    }
  },
  scrollY: {
    description: '`window.scrollY`',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'number'
      },
      defaultValue: {
        summary: 0
      }
    }
  },
  '...': {
    table: {
      category: 'returns',
      subcategory: '[1]{ stateUpdaters }'
    }
  }
}

export default {
  title: 'effectstate/useWindowScrollEffectState',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
