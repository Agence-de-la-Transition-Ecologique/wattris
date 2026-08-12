import { renderHook } from '@testing-library/react'

import useIframe from '../useIframe'

describe('useIframe', () => {
  const setPathname = (pathname) => {
    window.history.pushState({}, '', pathname)
  }

  it('returns true when pathname contains iframe', () => {
    setPathname('/integration/iframe')
    const { result } = renderHook(() => useIframe())

    expect(result.current).toBe(true)
  })

  it('returns false for regular pages', () => {
    setPathname('/mentions-legales')
    const { result } = renderHook(() => useIframe())
    expect(result.current).toBe(false)
  })
})
