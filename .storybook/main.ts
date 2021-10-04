import { StorybookConfig, CoreConfig, Options } from '@storybook/core-common'
import { UserConfig } from 'vite'
import { Weaken } from 'utilitypes'
import { resolve } from 'path'
import preact from '@preact/preset-vite'
interface CustomizedCoreConfig extends Weaken<CoreConfig, 'builder'> {
  builder: CoreConfig['builder'] | 'storybook-builder-vite'
}
interface CustomizedStorybookConfig extends Weaken<StorybookConfig, 'core'> {
  core: CustomizedCoreConfig
  viteFinal?: (
    config: UserConfig,
    options: Options
  ) => UserConfig | Promise<UserConfig>
}

const config: CustomizedStorybookConfig = {
  stories: [
    '../stories/**/*.story.mdx',
    '../stories/**/*.story.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite'
  },
  viteFinal: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.build.chunkSizeWarningLimit = 1700
    }

    config.plugins = [...config.plugins, preact()]
    config.esbuild = {
      ...config.esbuild
    }

    config.resolve.alias = {
      '@': resolve(__dirname, '..', 'lib')
    }

    return config
  }
}

export default config
