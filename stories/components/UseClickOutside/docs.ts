import { DEFAULT_CLICK_OUTSIDE_EVENTS } from '@/useClickOutsideEffect'

import { ArgTypes } from '@story/shared/types'

const argTypes: ArgTypes = {
  children: {
    description: 'Child component',
    type: {
      required: true
    },
    table: {
      category: 'props',
      type: {
        summary: '({ ref }) => JSX.Element'
      }
    },
    control: {
      type: null
    }
  },

  onClickOutside: {
    description: 'Called when occur event at outside target',
    type: {
      required: true
    },
    table: {
      category: 'props',
      type: {
        summary: '(ev: Event) => void'
      }
    }
  },

  onClickInside: {
    description: 'Called when occur event at inside target',
    table: {
      category: 'props',
      type: {
        summary: '(ev: Event) => void | undefined'
      }
    }
  },

  events: {
    description: 'Events that listen to',
    table: {
      category: 'props',
      type: {
        summary:
          '(keyof HTMLElementEventMap | keyof SVGElementEventMap)[] | undefined'
      },
      defaultValue: {
        summary: DEFAULT_CLICK_OUTSIDE_EVENTS.join(' | ')
      }
    }
  },

  ref: {
    description: 'Merge ref',

    table: {
      category: 'props',
      type: {
        summary: 'RefObject<T> | undefined',
        detail: 'T extends HTMLElement | SVGElement'
      }
    }
  },

  _ref: {
    name: 'ref',
    description: 'Give click outside `ref`',

    table: {
      category: 'returns',
      subcategory: '{ returns }',
      type: {
        summary: 'RefObject<T>',
        detail: 'T extends HTMLElement | SVGElement'
      }
    }
  }
}

export { argTypes }
