import { renderHook, act } from '@testing-library/react-hooks'
import WS from 'jest-websocket-mock'

import { useWebSocket } from '@/useWebSocket'
const url = 'ws://localhost:1234/'

describe('useWebSocket', () => {
  it('should be defined', () => expect(useWebSocket).toBeDefined())

  it('should fire onOpen and onMessage when ws send message', async () => {
    const onOpen = jest.fn()
    const onMessage = jest.fn()

    const server = new WS(url)

    renderHook(() =>
      useWebSocket({
        url,
        data: '',
        onOpen,
        onMessage
      })
    )

    expect(onOpen).not.toHaveBeenCalled()
    expect(onMessage).not.toHaveBeenCalled()

    await act(async () => {
      await server.connected
    })

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onMessage).not.toHaveBeenCalled()
    expect(onOpen).toHaveBeenCalledWith(expect.anything())

    const data = jest.fn()

    act(() => {
      server.send(data)
    })

    expect(onMessage).toHaveBeenCalledTimes(1)
    expect(onMessage).toHaveBeenCalledWith(expect.anything())

    server.close()
  })

  it('should fire onOpen and onMessage when ws send message', () => {
    const onError = jest.fn()

    const server = new WS(url)

    renderHook(() =>
      useWebSocket({
        url,
        data: '',
        onError
      })
    )

    expect(onError).not.toHaveBeenCalled()

    act(() => {
      server.error()
    })

    expect(onError).toHaveBeenCalledTimes(1)
    server.close()
  })

  it('should fire onOpen and onMessage when ws send message', () => {
    const onClose = jest.fn()

    const server = new WS(url)

    renderHook(() =>
      useWebSocket({
        url,
        data: '',
        onClose
      })
    )

    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      server.close()
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
