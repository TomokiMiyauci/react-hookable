import type { StorybookConfig } from '@storybook/core-common'
import { join } from 'path'

const toPath = (path: string): string => join(process.cwd(), path)

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
          '@': toPath('lib'),
          '@doc': toPath('docs'),
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react')
        }
      }
    }
  }
}

export default config
