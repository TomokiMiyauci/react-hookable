import { mockPermissions } from '@mock/navigator/permissions'
import { renderHook } from '@testing-library/react-hooks'

import {
  isSupported,
  usePermissionQueryEffect
} from '@/usePermissionQueryEffect'

describe('isSupported', () => {
  it('should return true when permissions implemented', () => {
    mockPermissions()

    expect(isSupported()).toBeTruthy()
  })

  it('should return false when permissions has not implemented', () => {
    Object.defineProperty(global, 'navigator', {
      value: {}
    })
    expect(isSupported()).toBeFalsy()
  })
})

describe('usePermissionQueryEffect', () => {
  it('should be defined', () => expect(usePermissionQueryEffect).toBeDefined())

  it('should call onGranted', async () => {
    const { mockQuery } = mockPermissions()
    mockQuery.mockResolvedValue({ state: 'granted' })
    const onGranted = jest.fn()
    const onDenied = jest.fn()
    const onPrompt = jest.fn()
    const onNotSupported = jest.fn()
    const permission = 'camera'

    const { waitFor } = renderHook(() =>
      usePermissionQueryEffect({
        permission,
        onGranted,
        onDenied,
        onPrompt,
        onNotSupported
      })
    )

    expect(mockQuery).toBeCalledWith({ name: permission })
    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()

    await waitFor(() => onGranted.mock.calls.length > 0)
    expect(onGranted).toHaveBeenCalledTimes(1)
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()
  })
  it('should call onPrompt', async () => {
    const { mockQuery } = mockPermissions()
    mockQuery.mockResolvedValue({ state: 'prompt' })
    const onGranted = jest.fn()
    const onDenied = jest.fn()
    const onPrompt = jest.fn()
    const onNotSupported = jest.fn()

    const { waitFor } = renderHook(() =>
      usePermissionQueryEffect({
        permission: 'clipboard-read',
        onGranted,
        onDenied,
        onPrompt,
        onNotSupported
      })
    )

    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()

    await waitFor(() => onPrompt.mock.calls.length > 0)
    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).toHaveBeenCalledTimes(1)
    expect(onNotSupported).not.toHaveBeenCalled()
  })
  it('should call onDenied', async () => {
    const { mockQuery } = mockPermissions()
    mockQuery.mockResolvedValue({ state: 'denied' })
    const onGranted = jest.fn()
    const onDenied = jest.fn()
    const onPrompt = jest.fn()
    const onNotSupported = jest.fn()

    const { waitFor } = renderHook(() =>
      usePermissionQueryEffect({
        permission: 'notifications',
        onGranted,
        onDenied,
        onPrompt,
        onNotSupported
      })
    )

    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()

    await waitFor(() => onDenied.mock.calls.length > 0)
    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).toHaveBeenCalledTimes(1)
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()
  })

  it('should call onNotSupported', async () => {
    const { mockQuery } = mockPermissions()
    mockQuery.mockRejectedValue(new TypeError())
    const onGranted = jest.fn()
    const onDenied = jest.fn()
    const onPrompt = jest.fn()
    const onNotSupported = jest.fn()

    const { waitFor } = renderHook(() =>
      usePermissionQueryEffect({
        permission: 'notifications',
        onGranted,
        onDenied,
        onPrompt,
        onNotSupported
      })
    )

    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).not.toHaveBeenCalled()

    await waitFor(() => onNotSupported.mock.calls.length > 0)
    expect(onGranted).not.toHaveBeenCalled()
    expect(onDenied).not.toHaveBeenCalled()
    expect(onPrompt).not.toHaveBeenCalled()
    expect(onNotSupported).toHaveBeenCalledTimes(1)
    expect(onNotSupported).toHaveBeenCalledWith(expect.any(TypeError))
  })
})
