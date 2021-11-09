import { useConditionalEffect } from '@/useConditionalEffect'

import type { Maybe } from '@/utils/types'
import type { DependencyList, useEffect, useLayoutEffect } from 'react'

type WebSocketParameters = ConstructorParameters<typeof WebSocket>

type UseWebSocketOptions<T> = {
  /**
   * The absolute URL of the WebSocket
   */
  url: WebSocketParameters[0]

  /**
   * Enqueues data to be transmitted
   */
  data: Parameters<InstanceType<typeof WebSocket>['send']>[0]

  /**
   * The sub-protocol selected by the server
   */
  protocols?: WebSocketParameters[1]

  /**
   * Called when the connection is opened
   */
  onOpen?: (ev: Event) => void

  /**
   * Called when the connection is closed
   */
  onClose?: WebSocket['onclose']

  /**
   * Called when a message is received from the server
   */
  onMessage?: (ev: MessageEvent<T>) => void

  /**
   * Called when an error occurs
   */
  onError?: WebSocket['onerror']
}

/**
 * Effect for WebSocket with automatically close connection when unmounted
 * @param options - WebSocket options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @param effectHook - Which effect hooks to use
 *
 * @example
 * ```tsx
 * useWebSocket(
 *   {
 *     url: 'ws://localhost:1234',
 *     data: JSON.stringify({ type: 'channel' }),
 *     onMessage: ({ data }) => {
 *       // from message
 *     },
 *     onOpen,
 *     onError,
 *     onClose
 *   },
 *   deps,
 *   condition,
 *   effectHook
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usewebsocket
 * @beta
 */
const useWebSocket = <T>(
  {
    url,
    protocols,
    data,
    onOpen,
    onClose,
    onError,
    onMessage
  }: UseWebSocketOptions<T>,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>,
  effectHook?: typeof useEffect | typeof useLayoutEffect
): void => {
  useConditionalEffect(
    () => {
      const socket = new WebSocket(url, protocols)

      socket.onopen = (ev) => {
        onOpen?.(ev)
        socket.send(data)
      }

      if (onMessage) {
        socket.onmessage = onMessage
      }

      if (onError) {
        socket.onerror = onError
      }

      if (onClose) {
        socket.onclose = onClose
      }

      return () => socket.close()
    },
    deps,
    condition,
    effectHook
  )
}

export { useWebSocket }
export type { UseWebSocketOptions }
