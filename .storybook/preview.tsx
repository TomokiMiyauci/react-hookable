import 'tailwindcss/tailwind.css'

import { ChakraProvider } from '@chakra-ui/react'

import type { BaseDecorators, Parameters } from '@storybook/addons'
export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    hideNoControlsWarning: true
  }
}

export const decorators: BaseDecorators<JSX.Element> = [
  (Story: () => JSX.Element): JSX.Element => (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  )
]
