import {
  Alert,
  AlertIcon,
  Code,
  Input,
  InputGroup,
  InputLeftAddon,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Docs from '@doc/useHash.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useBoolean } from '@/useBoolean'
import { useHash } from '@/useHash'

export const Demo: FunctionalComponent = () => {
  const [hashMark, { toggle }] = useBoolean(true)
  const [hash, setHash] = useHash(undefined, { hashMark })

  return (
    <>
      <Alert status="warning" rounded="md">
        <AlertIcon />
        Due to storybook limitations, the URL hash will not change
      </Alert>

      <Text mt="1.5">Options</Text>
      <Table maxW="md" size="sm">
        <Thead>
          <Tr>
            <Th>key</Th>
            <Th>value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Code>hashMark</Code>
            </Td>
            <Td>
              <Switch isChecked={hashMark} onChange={toggle} size="sm" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Text mt="2">hash: {hash}</Text>
      <InputGroup>
        <InputLeftAddon>#</InputLeftAddon>
        <Input
          placeholder="Enter hash"
          onChange={({ currentTarget }) => setHash(currentTarget.value as any)}
        />
      </InputGroup>
    </>
  )
}
export default {
  title: 'state/useHash',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
