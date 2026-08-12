import { act, renderHook } from '@testing-library/react'

import useOnScreen from '../useOnScreen'

const observers = []

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.observe = jest.fn()
    this.unobserve = jest.fn()
    observers.push(this)
  }

  trigger(entry) {
    this.callback([entry])
  }
}

describe('useOnScreen', () => {
  beforeEach(() => {
    observers.length = 0
    global.IntersectionObserver = MockIntersectionObserver
  })

  it('starts observing and updates visibility state', () => {
    const element = document.createElement('div')
    const ref = { current: element }

    const { result, unmount } = renderHook(() => useOnScreen(ref, '10px'))

    expect(result.current).toBe(false)
    expect(observers).toHaveLength(1)
    expect(observers[0].observe).toHaveBeenCalledWith(element)

    act(() => {
      observers[0].trigger({ isIntersecting: true })
    })

    expect(result.current).toBe(true)

    unmount()
    expect(observers[0].unobserve).toHaveBeenCalledWith(element)
  })
})
