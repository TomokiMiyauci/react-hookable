import type { ArgType } from '@storybook/addons'

type Field = {
  summary: string | number
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

type Control = {
  type: 'select' | 'number' | 'boolean' | null
  min: number
  max: number
  step: number
}

type ArgTypePolyfill = {
  options: unknown[]
  control: Partial<Control>
  type: {
    required: true
  }
  table: Partial<TableArgTypePolyfill>
}

type ExtendedArgType = ArgType & Partial<ArgTypePolyfill>
type ArgTypes = Record<string, ExtendedArgType>

export type { ExtendedArgType, ArgTypes }
