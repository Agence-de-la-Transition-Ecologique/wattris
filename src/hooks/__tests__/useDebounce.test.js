import { act, renderHook } from '@testing-library/react'

import useDebounce from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the value after the configured delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'alpha', delay: 200 } }
    )

    expect(result.current).toBe('alpha')

    rerender({ value: 'beta', delay: 200 })
    expect(result.current).toBe('alpha')

    act(() => {
      jest.advanceTimersByTime(199)
    })
    expect(result.current).toBe('alpha')

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('beta')
  })

  it('keeps only the latest value when updates are frequent', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 1, delay: 100 } }
    )

    rerender({ value: 2, delay: 100 })
    rerender({ value: 3, delay: 100 })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current).toBe(3)
  })
})
