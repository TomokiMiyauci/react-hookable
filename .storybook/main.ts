import type { StorybookConfig } from '@storybook/core-common'
import { join } from 'path'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.story.mdx',
    '../stories/**/*.story.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': join(process.cwd(), 'lib/'),
          '@emotion/core': join(process.cwd(), 'node_modules/@emotion/react'),
          'emotion-theming': join(process.cwd(), 'node_modules/@emotion/react')
        }
      }
    }
  }
}

export default config
