/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, AlertIcon, Code, Text, Divider } from '@chakra-ui/react'
import classnames from 'clsx'
import { useMemo, useRef } from 'preact/hooks'

import { useSwipeEffectState } from '@/useSwipeEffectState'
import { deps, condition } from '@story/shared/constants'
import { flash } from '@story/shared/utils'

import type { ArgTypes } from '@story/shared/types'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useSwipeEffectState.mdx'
export const Demo: FunctionalComponent = () => {
  const ref = useRef<SVGCircleElement>(null)
  const swipeStartRef = useRef<HTMLDivElement>(null)
  const swipeRef = useRef<HTMLDivElement>(null)
  const swipeEndRef = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const [
    { isSwiping, direction, lengthX, lengthY, coordsStart, coordsEnd },
    { reset }
  ] = useSwipeEffectState(
    {
      target: ref,
      onSwipeStart: () => flash(swipeStartRef),
      onSwipe: () => flash(swipeRef),
      onSwipeEnd: () => {
        reset()
        flash(swipeEndRef)
      }
    },
    []
  )

  const width = useMemo(() => {
    if (!svg.current) return
    const { width } = svg.current.getClientRects()[0]
    return width
  }, [svg.current])

  const height = useMemo(() => {
    if (!svg.current) return
    const { height } = svg.current.getClientRects()[0]
    return height
  }, [svg.current])

  const cx = useMemo(() => {
    if (!svg.current || typeof width === 'undefined') return

    return (100 / width) * lengthX
  }, [lengthX, width])

  const cy = useMemo(() => {
    if (!svg.current || typeof height === 'undefined') return

    return (100 / height) * -lengthY
  }, [lengthY, height])

  return (
    <>
      <Alert mb="2">
        <AlertIcon />
        <Text>
          <Code mr="2">TouchEvent</Code> only occurs in mobile environments
        </Text>
      </Alert>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        ref={svg}
        viewBox="0 0 100 100"
        className="max-w-xs"
      >
        <rect
          className="fill-current text-gray-50"
          width="100"
          height="100"
        ></rect>
        <line
          className="stroke-current text-gray-300 stroke-1"
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          strokeDasharray="2"
        />
        <line
          className="stroke-current text-gray-300 stroke-1"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          strokeDasharray="2"
        />

        <circle
          ref={ref}
          cx={50 + (cx ?? 0)}
          cy={50 + (cy ?? 0)}
          r="3"
          className={classnames(
            'fill-current text-blue-300 active:text-blue-400',
            { 'transition-all duration-300': !isSwiping }
          )}
        ></circle>
      </svg>
      <Text ref={swipeStartRef} mt="3">
        onSwipeStart
      </Text>
      <Text ref={swipeRef}>onSwipe: updateState</Text>
      <Text ref={swipeEndRef}>
        onSwipeEnd: <Code>reset</Code>
      </Text>
      <Divider my="1" />
      <Text mt="2">
        isSwiping: <Code>{String(isSwiping)}</Code>
      </Text>
      <Text>direction: {direction}</Text>
      <Text>lengthX: {lengthX}</Text>
      <Text>lengthY: {lengthY}</Text>
      <Text>coordsStart: {JSON.stringify(coordsStart)}</Text>
      <Text>coordsEnd: {JSON.stringify(coordsEnd)}</Text>
    </>
  )
}

const argTypes: ArgTypes = {
  target: {
    description: 'Bind target of event',
    type: {
      required: true
    },
    table: {
      category: 'args',
      type: {
        summary: 'Target<Window | Document | HTMLElement | SVGElement>',
        detail:
          'type Target<T extends EventTarget> = T | (() => T) | RefObject<T>'
      },
      control: {
        type: null
      }
    }
  },

  onSwipeStart: {
    description: 'Call on swipe start',
    table: {
      category: 'args',
      type: {
        summary: '(ev: TouchEvent) => void'
      },
      control: {
        type: null
      }
    }
  },
  onSwipe: {
    description: 'Keeps being called while swiping',
    table: {
      category: 'args',
      type: {
        summary: '(ev: TouchEvent) => void'
      },
      control: {
        type: null
      }
    }
  },

  onSwipeEnd: {
    description: 'Call on swipe end',
    table: {
      category: 'args',
      type: {
        summary: '(ev: TouchEvent) => void'
      },
      control: {
        type: null
      }
    }
  },
  deps,
  condition,

  direction: {
    description: 'Swipe direction',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'LEFT | RIGHT | TOP | BOTTOM | NONE'
      },
      defaultValue: {
        summary: 'NONE'
      }
    }
  },

  isSwiping: {
    description: 'Whether are swiping or not',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'Boolean'
      },
      defaultValue: {
        summary: 'false'
      }
    }
  },

  lengthX: {
    description: 'The length of the X-axis you are swiping',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'number'
      },
      defaultValue: {
        summary: 0
      }
    }
  },

  lengthY: {
    description: 'The length of the Y-axis you are swiping',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'number'
      },
      defaultValue: {
        summary: 0
      }
    }
  },

  coordsStart: {
    description: 'Starting point of the swipe',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'Position',
        detail: '{ x: number, y: number }'
      },
      defaultValue: {
        summary: '{ x: 0, y: 0 }'
      }
    }
  },

  coordsEnd: {
    description: 'End point of swipe',
    table: {
      category: 'returns',
      subcategory: '[0]{ states }',
      type: {
        summary: 'Position',
        detail: '{ x: number, y: number }'
      },
      defaultValue: {
        summary: '{ x: 0, y: 0 }'
      }
    }
  },
  reset: {
    description: 'Reset all state',
    table: {
      category: 'returns',
      subcategory: '[1]{ stateUpdaters }',
      type: {
        summary: '() => void'
      }
    }
  }
}

export default {
  title: 'effectstate/useSwipeEffectState',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
