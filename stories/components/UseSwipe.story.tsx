/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Text } from '@chakra-ui/react'
import type { Meta, Story } from '@storybook/preact'
import clsx from 'clsx'
import { useMemo } from 'preact/hooks'

import type { UseSwipeProps } from '@/components/UseSwipe'
import UseSwipe from '@/components/UseSwipe'
import { useBoolean } from '@/useBoolean'
const threshold = -100

const Template: Story<UseSwipeProps<HTMLDivElement>> = (props) => {
  const [isExceed, { on, off }] = useBoolean()
  return (
    <>
      {isExceed && <Button onClick={off}>Reset</Button>}
      <UseSwipe<HTMLDivElement>
        onSwipeEnd={(_, { reset, lengthY }) => {
          if (lengthY < threshold) {
            on()
          }
          reset()
        }}
        {...props}
      >
        {({ isSwiping, lengthY, ref }) => {
          const translateY = useMemo(
            () =>
              isExceed
                ? 'translateY(100%)'
                : `translateY(${-lengthY.toFixed(1)}px)`,
            [lengthY, isExceed]
          )

          const isEx = useMemo(() => lengthY < threshold, [lengthY])
          return (
            <Box
              overflow="hidden"
              h="md"
              maxW="80"
              className={clsx(
                'relative border flex flex-col rounded-2xl shadow',
                {
                  'transition duration-300': !isSwiping,
                  'bg-blue-100': isEx
                }
              )}
              style={{
                transform: translateY
              }}
            >
              <Box
                bg="gray.50"
                borderBottom="1px"
                borderColor="gray.200"
                ref={ref}
                className="text-center"
              >
                <span className="w-24 h-1 inline-block animate-pulse rounded-full bg-gray-200" />
                <Text>Swipe down</Text>
              </Box>
              <div className="flex-1 grid place-items-center"></div>
            </Box>
          )
        }}
      </UseSwipe>
    </>
  )
}

export const Demo = Template.bind({})

export default {
  title: 'component/UseSwipe',
  component: UseSwipe,

  argTypes: {
    children: {
      description: 'Child component',
      type: {
        required: true
      },
      table: {
        category: 'props',
        type: {
          summary: '(stateSet) => JSX.Element'
        }
      },
      control: {
        type: null
      }
    },
    target: {
      description: 'Bind target of event',

      table: {
        category: 'props',

        type: {
          summary: 'Window | Document | (() => Window | Document)',
          detail: 'If ref is used, it cannot be set.'
        },
        defaultValue: {
          summary: 'undefined'
        },
        control: {
          type: null
        }
      }
    },

    onSwipeStart: {
      description: 'Call on swipe start',

      table: {
        category: 'props',

        type: {
          summary: '(ev: TouchEvent) => void'
        },
        defaultValue: {
          summary: 'undefined'
        },
        control: {
          type: null
        }
      }
    },
    onSwipe: {
      description: 'Keeps being called while swiping',

      table: {
        category: 'props',

        type: {
          summary: '(ev: TouchEvent) => void'
        },
        defaultValue: {
          summary: 'undefined'
        },
        control: {
          type: null
        }
      }
    },

    onSwipeEnd: {
      description: 'Call on swipe end',

      table: {
        category: 'props',

        type: {
          summary: '(ev: TouchEvent) => void'
        },
        defaultValue: {
          summary: 'undefined'
        },
        control: {
          type: null
        }
      }
    },

    ref: {
      description: 'Bind ref to Element',
      table: {
        category: 'returns',
        type: {
          summary: 'RefObject<HTMLElement | SVGElement>',
          detail: `Generic type <T>
<UseSwipe<HTMLDivElement>>{(ref) => children}</UseSwipe>`
        },
        defaultValue: {
          summary: 'null'
        }
      }
    },

    direction: {
      description: 'Swipe direction',
      table: {
        category: 'returns',

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
        type: {
          summary: 'Position',
          detail: '{ x: number, y: number }'
        },
        defaultValue: {
          summary: '{ x: 0, y: 0 }'
        }
      }
    }
  }
} as Meta<typeof UseSwipe>
