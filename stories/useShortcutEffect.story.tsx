/* eslint-disable react/prop-types */
import {
  Alert,
  AlertIcon,
  Box,
  Kbd,
  useToast,
  Text,
  HStack
} from '@chakra-ui/react'
import { useRef, useMemo } from 'preact/hooks'

import { useShortcutEffect } from '@/useShortcutEffect'
import type { UseShortcutEffectOptions, Code } from '@/useShortcutEffect'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useShortcutEffect.mdx'

const codes: Code[] = [
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'Backspace',
  'Enter',
  'Escape',
  'KeyA',
  'KeyB',
  'KeyC',
  'KeyD',
  'KeyE',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyI',
  'KeyJ',
  'KeyK',
  'KeyL',
  'KeyM',
  'KeyN',
  'KeyO',
  'KeyP',
  'KeyQ',
  'KeyR',
  'KeyS',
  'KeyT',
  'KeyU',
  'KeyV',
  'KeyW',
  'KeyX',
  'KeyY',
  'KeyZ',
  'Space'
]

const Template: Story<UseShortcutEffectOptions['keyMap']> = ({
  cmd,
  shift,
  ctrl,
  option,
  code
}) => {
  const toast = useToast()
  const ref = useRef<HTMLDivElement>(null)

  const bindKeyNumber = useMemo<number>(
    () =>
      [cmd, shift, ctrl, option, code].reduce((acc, cur) => {
        if (cur) {
          acc = acc + 1
        }
        return acc
      }, 0),
    [cmd, shift, ctrl, option, code]
  )
  const hasBindKey = useMemo<boolean>(() => !!bindKeyNumber, [bindKeyNumber])

  useShortcutEffect(
    {
      keyMap: {
        code,
        cmd,
        shift,
        ctrl,
        option
      },
      onShortcut: () => {
        toast({
          title: 'useShortcutEffect',
          description: 'onShortcut',
          position: 'bottom-right'
        })
        ref.current?.animate(
          {
            color: 'yellow'
          },
          200
        )
      }
    },
    [hasBindKey],
    () => hasBindKey
  )
  return (
    <>
      <Alert>
        <AlertIcon />
        <HStack space="x-1">
          <Box as="span">{hasBindKey ? 'Press' : 'Bind keys'}</Box>
          {cmd && <Kbd>cmd</Kbd>}
          {shift && <Kbd>shift</Kbd>}
          {ctrl && <Kbd>ctrl</Kbd>}
          {option && <Kbd>option</Kbd>}
          {code && <Kbd>{code}</Kbd>}
        </HStack>
      </Alert>

      <Text
        position="fixed"
        color="gray.500"
        className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        focus this area
      </Text>

      <Text ref={ref} mt="2">
        onShortcut: toast
      </Text>
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {
  onShortcut: {
    description: 'Call on keydown shortcut keys',
    control: {
      type: null
    },
    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '(ev: KeyboardEvent) => void'
      }
    }
  },
  ctrl: {
    description: 'Bind `ctrl` | `control` key or not',
    control: {
      type: 'boolean'
    },
    table: {
      category: 'args',
      subcategory: 'keyMap*{ keys }',
      type: {
        summary: 'true | undefined'
      }
    }
  },
  cmd: {
    description: 'Bind `cmd` | `command` key or not',
    control: {
      type: 'boolean'
    },
    table: {
      category: 'args',
      subcategory: 'keyMap*{ keys }',
      type: {
        summary: 'true | undefined'
      }
    }
  },
  option: {
    description: 'Bind `option` key or not',
    control: {
      type: 'boolean'
    },
    table: {
      category: 'args',
      subcategory: 'keyMap*{ keys }',
      type: {
        summary: 'true | undefined'
      }
    }
  },
  shift: {
    description: 'Bind `shift` key or not',
    control: {
      type: 'boolean'
    },
    table: {
      category: 'args',
      subcategory: 'keyMap*{ keys }',
      type: {
        summary: 'true | undefined'
      }
    }
  },
  code: {
    description: 'Bind key code',
    control: {
      type: 'select'
    },
    options: codes,

    table: {
      category: 'args',
      subcategory: 'keyMap*{ keys }',
      type: {
        summary: 'Code | undefined',
        detail: codes.join(' | ')
      }
    }
  },
  target: {
    description: 'Target of attaching event listener',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'Target<Window | Document | HTMLElement | SVGElement>',
        detail:
          'type Target<T extends EventTarget> = T | (() => T) | RefObject<T>'
      },
      defaultValue: {
        summary: '() => window'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useShortcutEffect',
  component: Template,
  argTypes,
  args: {
    ctrl: false,
    cmd: false,
    option: false,
    shift: false,
    code: undefined
  },
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
