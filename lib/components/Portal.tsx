import { createPortal } from 'react-dom'

import { isBrowser, takeFn } from '@/utils'

import { MaybeFn } from '@/utils/types'

type PortalProps = {
  /**
   * Child component
   */
  children: JSX.Element

  /**
   * The portal will be attached to
   * @defaultValue `document.body`
   */
  container?: MaybeFn<Element>
}

/**
 * Portal is used to transport any component or element to the end of `document.body`
 * @param props - Portal props
 * @returns `JSX.Element`
 *
 * @example
 * ```tsx
 * <Portal>
 *  <Component />
 * </Portal>
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/component-portal
 * @beta
 */
const Portal = ({ children, container }: PortalProps): JSX.Element => {
  if (isBrowser) {
    return createPortal(children, takeFn(container) ?? document.body)
  }
  return <></>
}

export default Portal
export type { PortalProps }
