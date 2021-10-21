import type { ArgType } from '@storybook/addons'

type Field = {
  summary: string
  detail: string
}

type TableArgTypePolyfill = {
  category: string
  subcategory: string
  type: Partial<Field>
  defaultValue: Partial<Field>
  control: {
    type: unknown
  }
}

type ArgTypePolyfill = {
  type: {
    required: true
  }
  table: Partial<TableArgTypePolyfill>
}

type ExtendedArgType = ArgType & Partial<ArgTypePolyfill>

export type { ExtendedArgType }
