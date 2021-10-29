import { DEFAULT_CLICK_OUTSIDE_EVENTS } from '@/useClickOutsideEffect'
import {
  deps,
  condition,
  category,
  subcategory0
} from '@story/shared/constants'

import { ArgTypes } from '@story/shared/types'

const argTypes: ArgTypes = {
  target: {
    description: 'Target of attaching event listener',
    type: {
      required: true
    },
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'Target<HTMLElement | SVGElement>',
        detail:
          'type Target<T extends EventTarget> = T | (() => T) | RefObject<T>'
      }
    }
  },

  onClickOutside: {
    description: 'Called when occur event at outside targe',
    type: {
      required: true
    },
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: '(ev: Event) => void'
      }
    }
  },

  onClickInside: {
    description: 'Called when occur event at inside target',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: '(ev: Event) => void | undefined'
      }
    }
  },

  events: {
    description: 'Events that listen to',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary:
          '(keyof HTMLElementEventMap | keyof SVGElementEventMap)[] | undefined'
      },
      defaultValue: {
        summary: DEFAULT_CLICK_OUTSIDE_EVENTS.join(' | ')
      }
    }
  },

  deps,
  condition
}

export { argTypes }
