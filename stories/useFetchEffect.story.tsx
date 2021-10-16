import {
  Box,
  Button,
  Code,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast
} from '@chakra-ui/react'
import Docs from '@doc/useFetchEffect.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useFetchEffect } from '@/useFetchEffect'

const Children: FunctionalComponent<{
  url: string
  // eslint-disable-next-line react/prop-types
}> = ({ url }) => {
  const [isPending, { on, off }] = useBoolean()

  const input = useMemo<string>(() => `https://${url}`, [url])
  const toast = useToast()

  useFetchEffect(
    {
      input,

      onResolve: (res) => {
        if (res.ok) {
          toast({
            title: 'Success',
            description: 'Success http request',
            status: 'success'
          })
        } else {
          toast({
            title: 'Error',
            description: 'Fail to fetch',
            status: 'error'
          })
        }
      },
      onAbort: () => {
        toast({
          title: 'Abort',
          description: 'Http request has aborted',
          status: 'error'
        })
      },

      onReject: ({ name, message }: Error) => {
        toast({
          title: name,
          description: message,
          status: 'error'
        })
      },

      onFinally: off
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
export const Demo: FunctionalComponent = () => {
  const [isShow, { toggle }] = useBoolean(true)
  const [url, setUrl] = useState('react-hookable.vercel.app/api/v1/debug')

  return (
    <>
      <Button mb="4" onClick={toggle}>
        {isShow ? 'Unmount' : 'Mount'}
      </Button>

      {isShow && <Children url={url} />}

      <Text mt="4">
        input:
        <InputGroup size="sm">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input
            placeholder="url"
            spellCheck="false"
            value={url}
            onChange={({ currentTarget }) => setUrl(currentTarget.value)}
          />
        </InputGroup>
      </Text>
      <Text>
        init: <Code>RequestInit</Code>
      </Text>
      <Text>onResolve: toast</Text>
      <Text>onReject: toast</Text>
      <Text>onAbort: toast</Text>
      <Text>onFinally: loading off</Text>
    </>
  )
}

export default {
  title: 'useFetchEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
