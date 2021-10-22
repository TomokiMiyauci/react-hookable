import type { RefObject } from 'preact'

const flash = (ref: RefObject<Element>): void => {
  ref.current?.animate(
    {
      color: 'yellow'
    },
    200
  )
}

export { flash }
