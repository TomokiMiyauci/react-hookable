/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text
} from '@chakra-ui/react'
import { useCallback, useMemo, useRef, useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'
import { useIdleEffect, oneMinute, userInteractions } from '@/useIdleEffect'
import type { UseIdleEffectOptions } from '@/useIdleEffect'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'
import type { StateUpdater } from 'preact/hooks'

import Docs from '@doc/useIdleEffect.mdx'

const Template: Story<UseIdleEffectOptions> = ({
  timeout: ts = oneMinute,
  events = userInteractions
}) => {
  const [timeout, _setTimeout] = useState(ts)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTimeout = useCallback(_setTimeout, [timeout])

  return (
    <>
      <Playground events={events} timeout={timeout} onChange={setTimeout} />
    </>
  )
}

export const Demo = Template.bind({})

const Playground = ({
  timeout,
  events
}: {
  timeout: number
  events: typeof userInteractions
  onChange: StateUpdater<number>
}): JSX.Element => {
  const [isIdle, { on, off }] = useBoolean()
  const now = Date.now()
  const [last, setLast] = useState(now)
  const [latest, setLatest] = useState(now)
  const ref = useRef<HTMLDivElement>(null)
  useIdleCallbackEffect(
    {
      callback: () => {
        setLatest(Date.now)
      }
    },
    [latest],
    () => diff < timeout
  )

  const diff = useMemo(() => {
    return latest - last
  }, [last, latest])

  const ratio = useMemo(() => {
    const r = timeout - diff
    return r < 0 ? 0 : r
  }, [diff, timeout])

  useIdleEffect(
    {
      onIdle: on,
      timeout,
      events,
      onInteract: () => {
        if (isIdle) return

        handleLogin()
        ref.current?.animate(
          {
            color: 'yellow'
          },
          20
        )
      }
    },
    []
  )

  const handleLogin = () => {
    const now = Date.now()

    setLast(now)
    setLatest(now)
    off()
  }
  return (
    <>
      <Progress max={timeout} hasStripe value={ratio} />
      <Text mt="3">onIdle: dialog</Text>
      <Text ref={ref}>onInteract: updateState</Text>

      <Modal isOpen={isIdle} onClose={() => {}}>
        <ModalOverlay className="backdrop-blur-md" />
        <ModalContent>
          <ModalHeader>useIdleEffect</ModalHeader>
          <ModalBody>
            You have been logged out after {timeout} ms of inactivity.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const argTypes: ArgTypes = {
  onIdle: {
    description: 'Called the first time the `timeout` period has been exceeded',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '() => void'
      }
    }
  },
  onActive: {
    description: 'Called the first time there is user activity after an Idle',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '() => void'
      }
    }
  },
  onInteract: {
    description: 'Called every time there is user activity',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '() => void'
      }
    }
  },
  timeout: {
    description: 'User activity timeout',
    control: {
      type: 'number',
      min: 2000,
      max: 2147483647
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'number | undefined'
      },
      defaultValue: {
        summary: oneMinute
      }
    }
  },
  events: {
    description: 'Events that listen to for detected user activity',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '(keyof WindowEventMap)[] | undefined'
      },
      defaultValue: {
        summary: userInteractions.join(' | ')
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useIdleEffect',
  component: Template,
  argTypes,
  args: {
    timeout: oneMinute,
    events: userInteractions
  },
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
