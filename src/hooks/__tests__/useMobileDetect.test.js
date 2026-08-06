import { renderHook, waitFor } from '@testing-library/react'

import useDeviceDetect from '../useMobileDetect'

describe('useMobileDetect', () => {
  const originalUserAgent = window.navigator.userAgent

  afterEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: originalUserAgent,
    })
  })

  it('detects a mobile user agent', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
    })

    const { result } = renderHook(() => useDeviceDetect())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('returns false on desktop user agents', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (X11; Linux x86_64)',
    })

    const { result } = renderHook(() => useDeviceDetect())

    await waitFor(() => {
      expect(result.current).toBe(false)
    })
  })
})
