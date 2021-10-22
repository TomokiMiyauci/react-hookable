import { Box, Button, Code, Text, useToast } from '@chakra-ui/react'
import { useCallback, useRef } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useFetchEffect } from '@/useFetchEffect'
import type { UseFetchEffectOptions } from '@/useFetchEffect'
import { deps, condition } from '@story/shared/constants'

import { VFn } from '@/utils/types'
import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'
import type { RefObject } from 'preact'

import Docs from '@doc/useFetchEffect.mdx'

const Children = ({
  url,
  resolve,
  reject,
  abort,
  final
}: {
  url: string
  resolve: VFn
  reject: VFn
  abort: VFn
  final: VFn
}): JSX.Element => {
  const [isPending, { on, off }] = useBoolean()

  const toast = useToast({
    position: 'bottom-right'
  })

  useFetchEffect(
    {
      input: url,

      onResolve: async (res) => {
        resolve()
        if (res.ok) {
          toast({
            title: 'Success',
            description: 'Success http request',
            status: 'success'
          })
        } else {
          const result = await res.json()

          toast({
            title: 'Error',
            description: result,
            status: 'error'
          })
        }
      },
      onAbort: () => {
        abort()
        toast({
          title: 'Abort',
          description: 'Http request has aborted',
          status: 'error'
        })
      },

      onReject: ({ name, message }: Error) => {
        reject()
        toast({
          title: name,
          description: message,
          status: 'error'
        })
      },

      onFinally: () => {
        off()
        final()
      }
    },
    [isPending],
    () => isPending
  )
  return (
    <Box
      borderWith="1px"
      borderRadius="lg"
      borderColor="gray.200"
      borderStyle="solid"
      width="40"
      height="40"
      bg="blue.500"
      className="grid place-items-center"
    >
      <Button disabled={isPending} isLoading={isPending} onClick={on}>
        fetch
      </Button>
    </Box>
  )
}

// eslint-disable-next-line react/prop-types
const Template: Story<UseFetchEffectOptions> = ({ input }) => {
  const animate = (ref: RefObject<HTMLDivElement>) =>
    ref.current?.animate(
      {
        color: 'yellow'
      },
      200
    )
  const [isShow, { toggle }] = useBoolean(true)
  const resolveRef = useRef<HTMLDivElement>(null)
  const rejectRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)

  const resolve = useCallback(() => animate(resolveRef), [])
  const reject = useCallback(() => animate(rejectRef), [])
  const abort = useCallback(() => animate(abortRef), [])
  const final = useCallback(() => animate(finalRef), [])

  return (
    <>
      <Button mb="4" onClick={toggle}>
        {isShow ? 'Unmount' : 'Mount'}
      </Button>

      {isShow && (
        <Children
          {...{ resolve, reject, abort, final }}
          url={input.toString()}
        />
      )}

      <Text mt="3">
        init: <Code>{input}</Code>
      </Text>
      <Text ref={resolveRef}>onResolve: toast</Text>
      <Text ref={rejectRef}>onReject: toast</Text>
      <Text ref={abortRef}>onAbort: toast</Text>
      <Text ref={finalRef}>onFinally: loading off</Text>
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {
  input: {
    description: 'This defines the resource that you wish to fetch',
    control: {
      type: 'text'
    },

    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'RequestInfo'
      }
    }
  },
  init: {
    description:
      'An object containing any custom settings that you want to apply to the request',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'RequestInit'
      }
    }
  },
  onResolve: {
    description: 'Called when the fetch request succeeds',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '(res: Response) => PromiseLike<void> | void'
      }
    }
  },
  onAbort: {
    description: 'Called when fetch request has aborted',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '(e: Error) => PromiseLike<void> | void'
      }
    }
  },
  onReject: {
    description: 'Called when a fetch request fails except for abort',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '(reason: any) => PromiseLike<void> | void'
      }
    }
  },
  onFinally: {
    description: 'Called at the end of the promise chain',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '() => PromiseLike<void> | void'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useFetchEffect',
  component: Template,
  argTypes,
  args: {
    input:
      'https://react-hookable-tomoki-miyauci.vercel.app/api/v1/debug?wait=3000'
  },
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
