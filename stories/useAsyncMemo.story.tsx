import { EmailIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import Docs from '@doc/useAsyncMemo.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

import { useAsyncMemo } from '@/useAsyncMemo'
export const Demo: FunctionalComponent = () => {
  const [email, setEmail] = useState<string>('')
  const [imported, setImported] = useState<boolean>(false)
  const isInValid = useAsyncMemo(async () => {
    if (!email) return
    const { default: isEmail } = await require('is-email')
    setImported(true)
    return !isEmail(email) as boolean
  }, [email])

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          spellCheck="false"
          placeholder="Enter email"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          isInvalid={isInValid}
          type="email"
          errorBorderColor="red.300"
        ></Input>
      </InputGroup>

      <Text>imported: {String(imported)}</Text>
      <Text>isInValid: {String(isInValid)}</Text>
    </>
  )
}

export default {
  title: 'Enhancement/useAsyncMemo',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Docs>
