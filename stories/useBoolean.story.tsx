import { Button, HStack, Text } from '@chakra-ui/react'
import type { Meta } from '@storybook/preact'
import type { FunctionComponent } from 'preact'

import { useBoolean } from '@/useBoolean'

const Demo: FunctionComponent = () => {
  const [state, { toggle, on, off }] = useBoolean()

  return (
    <>
      <Text mb="1.5">Value: {String(state)}</Text>
      <HStack spacing="1.5">
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={on}>On</Button>
        <Button onClick={off}>Off</Button>
      </HStack>
    </>
  )
}

const meta: Meta<typeof Demo> = {
  title: 'hooks/useBoolean',
  component: Demo
}

export default meta
export { Demo }
