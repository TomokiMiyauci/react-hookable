import {
  deps,
  condition,
  category,
  subcategory0
} from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'

const title = 'effect/useTransitionEffect'
const argTypes: ArgTypes = {
  target: {
    type: {
      required: true
    },
    description:
      'Classes to add to the transitioning element before the enter phase starts',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'Target<HTMLElement | SvgElement>',
        detail:
          'type Target<T extends EventTarget> = T | (() => T) | RefObject<T>'
      }
    }
  },

  show: {
    description: 'Whether the children should be shown or hidden',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'boolean | undefined'
      }
    }
  },

  enterFrom: {
    description:
      'Classes to add to the transitioning element before the enter phase starts',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  enter: {
    description:
      'Classes to add to the transitioning element during the entire enter phase',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  enterTo: {
    description:
      'Classes to add to the transitioning element immediately after the enter phase starts',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  entered: {
    description:
      'Classes to add to the transitioning element once the transition is done. These classes will persist until leave',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  leaveFrom: {
    description:
      'Classes to add to the transitioning element before the leave phase starts',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  leave: {
    description:
      'Classes to add to the transitioning element during the entire leave phase',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  leaveTo: {
    description:
      'Classes to add to the transitioning element immediately after the leave phase starts',
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'string | undefined'
      }
    }
  },

  keepLayout: {
    description:
      'Whether to apply `display: none;` or `visibility: hidden;` to invisible. If `false`, `display:none;` will be applied',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'boolean | undefined'
      },
      defaultValue: {
        summary: 'false'
      }
    }
  },

  deps,
  condition,

  isShow: {
    description: 'Reactive state of isShow adjusted rendering timing',
    table: {
      category: 'returns',
      subcategory: '{ states }',
      type: {
        summary: 'boolean'
      }
    }
  }
}

export { title, argTypes }
