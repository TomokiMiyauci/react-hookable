import { Alert, Button, HStack, useToast } from '@chakra-ui/react'
import Docs from '@doc/useFetch.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useBoolean } from '@/useBoolean'
import { useFetch } from '@/useFetch'
import { useSequenceState } from '@/useSequenceState'
const Children: FunctionalComponent = () => {
  const { use } = useFetch()
  const [pending, sequence] = useSequenceState()
  const toast = useToast()
  return (
    <>
      <Button
        isLoading={pending}
        disabled={pending}
        onClick={() =>
          sequence(() =>
            use('https://httpbin.org/get')
              .then(() => {
                toast({
                  title: 'Success',
                  description: 'Success http request',
                  status: 'success'
                })
              })
              .catch(({ name, message }: Error) => {
                if (name === 'AbortError') {
                  toast({
                    title: name,
                    description: message,
                    status: 'error'
                  })
                }
              })
          )
        }
      >
        use
      </Button>
    </>
  )
}

export const Demo: FunctionalComponent = () => {
  const [isShow, { toggle }] = useBoolean(true)

  return (
    <>
      <Alert status="warning" mb="2">
        If the http response is too fast, please use your browser network
        simulation to use a slower environment
      </Alert>
      <HStack space="x-2">
        <Button onClick={toggle}>{isShow ? 'Unmount' : 'Mount'}</Button>
        {isShow && <Children />}
      </HStack>
    </>
  )
}

export default {
  title: 'procedure/useFetch',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
