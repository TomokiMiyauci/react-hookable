import {
  Box,
  Button,
  Code,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Docs from '@doc/useIdleEffect.mdx'
import type { Meta } from '@storybook/preact'
import type { StateUpdater } from 'preact/hooks'
import { useCallback, useMemo, useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'
import { useIdleEffect } from '@/useIdleEffect'

const initTimeout = 60000

export const Demo = (): JSX.Element => {
  const [timeout, _setTimeout] = useState(initTimeout)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTimeout = useCallback(_setTimeout, [timeout])

  return (
    <>
      <Playground timeout={timeout} onChange={setTimeout} />
      <DocsTable timeout={timeout} onChange={setTimeout} />
    </>
  )
}

const DocsTable = ({
  timeout,
  onChange
}: {
  timeout: number
  onChange: StateUpdater<number>
}): JSX.Element => {
  return (
    <Table>
      <TableCaption>Args</TableCaption>

      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>options</Td>
          <Td>
            <Text mb="2">
              <Code>UseIdleEffectOptions</Code>
            </Text>

            <Text>
              onIdle?: <Code>() ={'>'} void</Code>
            </Text>

            <Text>
              onActive?: <Code>() ={'>'} void</Code>
            </Text>

            <Text>
              onInteract?: <Code>() ={'>'} void</Code>{' '}
              <Box display="inline">fire</Box>
            </Text>

            <Text>
              timeout?: <Code>number</Code>
              <Text ml="4">
                min: <Code>4</Code> max: <Code>2147483647</Code>
                <Text>
                  This is a requirement of
                  <Link
                    ml="2"
                    target="_blank"
                    href="https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value"
                  >
                    <Code color="blue.500">setTimeout</Code>
                  </Link>
                </Text>
              </Text>
              <Input
                value={timeout}
                type="number"
                min="4"
                max="2147483647"
                mt="2"
                onChange={({ currentTarget }) =>
                  onChange(Number(currentTarget.value))
                }
              />
            </Text>
          </Td>
        </Tr>

        <Tr>
          <Td>deps</Td>
          <Td>
            <Code>DependencyList</Code>
          </Td>
        </Tr>

        <Tr>
          <Td>condition</Td>
          <Td>
            <Code>
              () ={'>'} Maybe{'<'}boolean{'>'}{' '}
            </Code>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

const Playground = ({
  timeout,
  onChange
}: {
  timeout: number
  onChange: StateUpdater<number>
}): JSX.Element => {
  const [isIdle, { on, off }] = useBoolean()
  const now = Date.now()
  const [last, setLast] = useState(now)
  const [latest, setLatest] = useState(now)
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
      onInteract: () => {
        if (isIdle) return

        handleLogin()
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

      <Modal isOpen={isIdle} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>useIdleEffect</ModalHeader>
          <ModalBody>
            You have been logged out after {timeout} ms of inactivity.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleLogin()
                onChange(initTimeout)
              }}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default {
  title: 'effect/useIdleEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
