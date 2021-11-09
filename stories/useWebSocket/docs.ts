import {
  deps,
  condition,
  category,
  subcategory0
} from '@story/shared/constants'

import { ArgTypes } from '@story/shared/types'

const argTypes: ArgTypes = {
  url: {
    description: 'The absolute URL of the WebSocket',
    type: {
      required: true
    },
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'ConstructorParameters<typeof WebSocket>[0]',
        detail: 'type ConstructorParameters<typeof WebSocket>[0] = string | URL'
      }
    }
  },

  data: {
    description: 'Enqueues data to be transmitted',
    type: {
      required: true
    },
    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'Parameters<InstanceType<typeof WebSocket>["send"]>[0]',
        detail:
          'type Parameters<InstanceType<typeof WebSocket>["send"]>[0] = string | ArrayBufferLike | Blob | ArrayBufferView'
      }
    }
  },

  protocols: {
    description: 'The sub-protocol selected by the server',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'ConstructorParameters<typeof WebSocket>[1]',
        detail:
          'type ConstructorParameters<typeof WebSocket>[1] = string | string[] | undefined'
      }
    }
  },

  onOpen: {
    description: 'Called when the connection is opened',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: '(ev: Event) => void'
      }
    }
  },

  onClose: {
    description: 'Called when the connection is closed',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'WebSocket["onclose"]',
        detail:
          'type WebSocket["onclose"] = ((this: WebSocket, ev: CloseEvent) => any) | null | undefined'
      }
    }
  },

  onMessage: {
    description: 'Called when a message is received from the server',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: '(ev: MessageEvent<T>) => void'
      }
    }
  },

  onError: {
    description: 'Called when an error occurs',

    table: {
      category,
      subcategory: subcategory0,
      type: {
        summary: 'WebSocket["onerror"]',
        detail:
          'type WebSocket["onerror"] = ((this: WebSocket, ev: Event) => any) | null | undefined'
      }
    }
  },

  deps,
  condition,

  effectHook: {
    description: 'Which effect hooks to use',

    table: {
      category,
      subcategory: '[3]',
      type: {
        summary: 'typeof useEffect | typeof useLayoutEffect'
      },
      defaultValue: {
        summary: 'useEffect'
      }
    }
  }
}

export { argTypes }
