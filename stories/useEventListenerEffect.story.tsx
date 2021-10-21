/* eslint-disable react/prop-types */
import { Button, Code, Text, useToast } from '@chakra-ui/react'
import { useMemo, useRef } from 'preact/hooks'

import { useEventListenerEffect } from '@/useEventListenerEffect'
import type { UseEventListenerEffectOptions } from '@/useEventListenerEffect'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Story, Meta } from '@storybook/preact'

import Docs from '@doc/useEventListenerEffect.mdx'

const Template: Story<UseEventListenerEffectOptions<Window, 'click'>> = ({
  type,
  target
}) => {
  const toast = useToast({
    title: 'useEventListenerEffect',
    position: 'bottom-right'
  })

  const isRefActivate = useMemo(() => typeof target === 'string', [target])
  const ref = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  useEventListenerEffect(
    {
      target: isRefActivate ? ref : target,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type: type!,
      listener: (ev) => {
        toast({
          description: ev.type
        })
        textRef.current?.animate(
          {
            color: 'yellow'
          },
          200
        )
      }
    },
    [],
    () => !!type && !!target
  )
  return (
    <>
      <Text>
        target: <Code>window</Code> <Code>document</Code>
        <Button
          colorScheme={isRefActivate ? 'blue' : undefined}
          size="xs"
          ml="2"
          ref={ref}
        >
          ref
        </Button>
      </Text>
      <Text>
        type: <Code>{type}</Code>
      </Text>
      <Text ref={textRef}>listener: toast</Text>
    </>
  )
}

export const Demo = Template.bind({})

type MargedEvent = keyof WindowEventMap &
  keyof HTMLElementEventMap &
  keyof DocumentEventMap

const eventTypes: MargedEvent[] = [
  'blur',
  'click',
  'dblclick',
  'focus',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'resize',
  'touchend',
  'touchmove',
  'touchstart',
  'wheel'
]

const argTypes: ArgTypes = {
  target: {
    description: '`EventListener` target',
    options: ['window', 'document', 'ref'],
    mapping: { window, document },

    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'Target<EventTarget>',
        detail:
          'type Target<T extends EventTarget> = T | (() => T) | RefObject<T>'
      }
    }
  },
  type: {
    options: eventTypes,
    control: {
      type: 'select'
    },
    description: 'Event type',
    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'string | EventMap<T>',
        detail: `type EventMap<T extends EventTarget> = T extends HTMLElement
          ? HTMLElementEventMap
          : T extends SVGElement
          ? SVGElementEventMap
          : T extends Element
          ? ElementEventMap
          : T extends Document
          ? DocumentEventMap
          : T extends Window
          ? WindowEventMap
          : never
          `
      }
    }
  },
  listener: {
    description:
      'The object that receives a notification when an event of the specified type occurs',
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
        summary: '(e: EventMap<T>) => void'
      }
    }
  },
  options: {
    description:
      'An options object specifies characteristics about the event listener',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'AddEventListenerOptions | boolean'
      }
    }
  },

  listeners: {
    description: 'Array of event listener',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '{ type, listener, options }[]'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useEventListenerEffect',
  component: Template,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
