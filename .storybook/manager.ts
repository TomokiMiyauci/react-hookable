import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'react-hookable',
  brandUrl: 'https://react-hookable.vercel.app/'
})

addons.setConfig({
  theme
})
