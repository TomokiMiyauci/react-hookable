import { category } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'

const argTypes: ArgTypes = {
  children: {
    description: 'Child component',
    type: {
      required: true
    },
    table: {
      category,
      subcategory: '{ props }',
      type: {
        summary: 'JSX.Element'
      }
    }
  },
  container: {
    description: 'The portal will be attached to',

    table: {
      category,
      subcategory: '{ props }',
      type: {
        summary: 'MaybeFn<Element>',
        detail: 'type MaybeFn<T> = T | (() => T)'
      },
      defaultValue: {
        summary: 'document.body'
      }
    }
  }
}

export { argTypes }
