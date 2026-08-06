import { act, renderHook, waitFor } from '@testing-library/react'

import useWindowSize from '../useWindowSize'

describe('useWindowSize', () => {
  it('returns the current window size and updates on resize', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1200,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 700,
    })

    const { result } = renderHook(() => useWindowSize())

    await waitFor(() => {
      expect(result.current).toEqual({ width: 1200, height: 700 })
    })

    act(() => {
      window.innerWidth = 800
      window.innerHeight = 500
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({ width: 800, height: 500 })
  })
})
