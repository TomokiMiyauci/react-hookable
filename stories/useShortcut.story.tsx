import { Button, HStack, Kbd, Text, useToast } from '@chakra-ui/react'
import Docs from '@doc/useShortcut.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { useBoolean } from '@/useBoolean'
import { useShortcut } from '@/useShortcut'
export const Demo: FunctionalComponent = () => {
  const { bind, unbind } = useShortcut()
  const [hasRegistered, { on, off }] = useBoolean()
  const toast = useToast()
  const handleClick = () => {
    on()
    bind(
      {
        key: 'k',
        cmd: true
      },
      () => {
        toast({
          title: 'Shortcut was pressed'
        })
      }
    )
  }
  return (
    <>
      {hasRegistered ? (
        <Text mb="1.5">
          press <Kbd>commnd</Kbd> + <Kbd>k</Kbd>
        </Text>
      ) : (
        <Text mb="1.5">Bind shortcut dynamically</Text>
      )}
      <HStack space="x-2">
        <Button onClick={handleClick}>bind</Button>
        <Button
          onClick={() => {
            unbind()
            off()
          }}
        >
          unbind
        </Button>
      </HStack>
    </>
  )
}
export default {
  title: 'stateless/useShortcut',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
