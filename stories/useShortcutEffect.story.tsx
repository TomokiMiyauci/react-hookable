import {
  Alert,
  Box,
  Code,
  Kbd,
  Switch,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react'

import { useBoolean } from '@/useBoolean'
import { useShortcutEffect } from '@/useShortcutEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'


import Docs from '@doc/useShortcutEffect.mdx'

// eslint-disable-next-line react/prop-types
const WithPlus: FunctionalComponent = ({ children }) => <>{children} + </>
export const Demo: FunctionalComponent = () => {
  const [enableMeta, { toggle: toggleMeta }] = useBoolean(false)
  const [enableShift, { toggle: toggleShift }] = useBoolean()
  const [enableCtrl, { toggle: toggleCtrl }] = useBoolean()
  const [enableOption, { toggle: toggleOption }] = useBoolean()
  const toast = useToast()

  const maybeTrue = (val: boolean): true | undefined => (val ? true : undefined)
  useShortcutEffect(
    {
      keyMap: {
        code: 'KeyK',
        cmd: maybeTrue(enableMeta),
        shift: maybeTrue(enableShift),
        ctrl: maybeTrue(enableCtrl),
        option: maybeTrue(enableOption)
      },
      onShortcut: () =>
        toast({
          title: 'useShortcutEffect',
          description: 'onShortcut'
        })
    },
    [enableMeta, enableShift, enableCtrl, enableOption]
  )
  return (
    <>
      <Alert>
        <Box as="span" mr="2">
          Press
        </Box>
        {enableMeta && (
          <WithPlus>
            <Kbd>cmd</Kbd>
          </WithPlus>
        )}
        {enableShift && (
          <WithPlus>
            <Kbd>shift</Kbd>
          </WithPlus>
        )}
        {enableCtrl && (
          <WithPlus>
            <Kbd>ctrl</Kbd>
          </WithPlus>
        )}
        {enableOption && (
          <WithPlus>
            <Kbd>option</Kbd>
          </WithPlus>
        )}
        <Kbd>K</Kbd>
      </Alert>

      <Table mt="6">
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
                <Code>UseShortcutEffectOptions</Code>
              </Text>
              <Text>keyMap:</Text>
              <Box pl="4">
                <Text>
                  cmd: <Switch isChecked={enableMeta} onChange={toggleMeta} />{' '}
                  <Code>{String(enableMeta)}</Code>
                </Text>
                <Text>
                  shift:
                  <Switch isChecked={enableShift} onChange={toggleShift} />{' '}
                  <Code>{String(enableShift)}</Code>
                </Text>
                <Text>
                  ctrl:
                  <Switch isChecked={enableCtrl} onChange={toggleCtrl} />{' '}
                  <Code>{String(enableCtrl)}</Code>
                </Text>
                <Text>
                  option:
                  <Switch
                    isChecked={enableOption}
                    onChange={toggleOption}
                  />{' '}
                  <Code>{String(enableOption)}</Code>
                </Text>
                <Text>
                  code:
                  <Code>KeyK</Code>
                </Text>
              </Box>
              <Text>onShortcut: toast</Text>
              <Text>
                target: () ={'>'} <Code>window</Code>
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
    </>
  )
}

export default {
  title: 'effect/useShortcutEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
