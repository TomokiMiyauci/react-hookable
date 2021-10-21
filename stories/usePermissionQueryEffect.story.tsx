import { Code, Text, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import type {
  DescriptorName,
  UsePermissionQueryEffectOptions
} from '@/usePermissionQueryEffect'
import { usePermissionQueryEffect } from '@/usePermissionQueryEffect'

import type { ExtendedArgType } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/usePermissionQueryEffect.mdx'

// eslint-disable-next-line react/prop-types
const Template: Story<UsePermissionQueryEffectOptions> = ({ permission }) => {
  const deniedRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)
  const grantedRef = useRef<HTMLDivElement>(null)
  const notSupportedRef = useRef<HTMLDivElement>(null)

  const animate = {
    color: 'yellow'
  }
  const toast = useToast({
    position: 'bottom-right'
  })
  usePermissionQueryEffect(
    {
      permission,
      onGranted: () => {
        toast({
          title: 'onGranted',
          description: `${permission} state is granted`,
          status: 'success'
        })

        grantedRef.current?.animate(animate, 200)
      },

      onPrompt: () => {
        toast({
          title: 'onPrompt',
          description: (
            <>
              <Code mr="2">{permission}</Code>state is prompt
            </>
          ),
          status: 'info'
        })
        promptRef.current?.animate(animate, 200)
      },
      onDenied: () => {
        toast({
          title: 'onDenied',
          description: `${permission} state is denied`,
          status: 'warning'
        })
        deniedRef.current?.animate(animate, 200)
      },

      onNotSupported: ({ name, message }) => {
        toast({
          title: name,
          description: message,
          status: 'error'
        })

        notSupportedRef.current?.animate(animate, 200)
      }
    },
    [],
    () => !!permission
  )
  return (
    <>
      <Text ref={grantedRef}>onGranted: toast</Text>
      <Text ref={promptRef}>onPrompt: toast</Text>
      <Text ref={deniedRef}>onDefined: toast</Text>
      <Text ref={notSupportedRef}>onNotSupported: toast</Text>
    </>
  )
}

export const Demo = Template.bind({})

const permissions: DescriptorName[] = [
  'accelerometer',
  'accessibility-events',
  'ambient-light-sensor',
  'background-sync',
  'camera',
  'clipboard-read',
  'clipboard-write',
  'gamepad',
  'geolocation',
  'gyroscope',
  'magnetometer',
  'microphone',
  'midi',
  'notifications',
  'payment-handler',
  'persistent-storage',
  'push',
  'screen-wake-lock',
  'speaker'
]

const argTypes: Record<string, ExtendedArgType> = {
  permission: {
    options: permissions,
    control: { type: 'select' },
    description: 'Name of querying permission',
    type: {
      required: true
    },
    table: {
      category: 'args[0]{}',
      type: {
        summary: 'DescriptorName',
        detail: permissions.join(' | ')
      }
    }
  },
  onGranted: {
    description: 'Called if the status of permission is `granted`',
    table: {
      category: 'args[0]{}',
      type: {
        summary: '() => void'
      }
    }
  },
  onPrompt: {
    description: 'Called if the status of permission is `prompt`',
    table: {
      category: 'args[0]{}',
      type: {
        summary: '() => void'
      }
    }
  },
  onDenied: {
    description: 'Called if the status of permission is `denied`',
    table: {
      category: 'args[0]{}',
      type: {
        summary: '() => void'
      }
    }
  },
  onNotSupported: {
    description:
      'Called if permissions are not supported or if permissions query is not supported',
    table: {
      category: 'args[0]{}',
      type: {
        summary: '(e: TypeError) => void'
      }
    }
  },
  deps: {
    description:
      'If present, effect will only activate if the values in the list change.',
    table: {
      category: 'args[1]',
      type: {
        summary: 'DependencyList'
      }
    }
  },
  condition: {
    description:
      'The conditional function that effect or not. If return `true` effect, otherwise not.',
    table: {
      category: 'args[2]',
      type: {
        summary: '() => Maybe<boolean>'
      }
    }
  }
}

export default {
  title: 'effect/usePermissionQueryEffect',
  component: Template,

  parameters: {
    docs: {
      page: Docs
    }
  },
  argTypes
} as Meta<typeof Demo>
