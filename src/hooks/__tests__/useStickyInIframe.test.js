import { renderHook, act } from '@testing-library/react'

import useStickyInIframe from '../useStickyInIframe'

function mockMatchMedia(matches) {
  const listeners = []
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: (event, cb) => listeners.push(cb),
    removeEventListener: jest.fn(),
  }))
  return listeners
}

function mockContainerRect(rect) {
  jest
    .spyOn(HTMLDivElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => rect)
}

describe('useStickyInIframe', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    delete window.parentIFrame
  })

  it('does nothing when disabled', () => {
    const { result } = renderHook(() => useStickyInIframe({ enabled: false, stickyTop: 35 }))

    const div = document.createElement('div')
    act(() => {
      result.current.containerRef.current = div
    })

    expect(div.style.position).toBe('')
  })

  it('applies a fixed style once the parent page scrolls past the sticky threshold', () => {
    mockMatchMedia(true)
    mockContainerRect({ top: 100, left: 10, width: 300, height: 420 })

    let pageInfoCallback
    window.parentIFrame = {
      getPageInfo: jest.fn((cb) => {
        pageInfoCallback = cb
      }),
      getPageInfoStop: jest.fn(),
    }

    const { result } = renderHook(() =>
      useStickyInIframe({ enabled: true, stickyTop: 35 })
    )

    expect(window.parentIFrame.getPageInfo).toHaveBeenCalled()

    const div = document.createElement('div')
    act(() => {
      result.current.containerRef.current = div
    })

    // Trigger a re-measure now that the ref is attached.
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    act(() => {
      // iframe sits 50px from the top of the parent document, and the
      // parent page has scrolled 150px down -> iframe's visible top in the
      // parent viewport is 50 - 150 = -100px (scrolled past).
      pageInfoCallback({ offsetTop: 50, scrollTop: 150 })
    })

    expect(div.style.position).toBe('fixed')
    expect(div.style.top).toBe('95px')

    // Scrolling back up (parent scrollTop decreases) should unstick it again,
    // proving the position reacts to `scrollTop` and not the (mostly
    // constant) `offsetTop` alone.
    act(() => {
      pageInfoCallback({ offsetTop: 50, scrollTop: 0 })
    })

    expect(div.style.position).toBe('')
  })

  it('zeroes out the container margins while stuck (margins still apply to fixed elements)', () => {
    mockMatchMedia(true)
    mockContainerRect({ top: 100, left: 10, width: 300, height: 420 })

    let pageInfoCallback
    window.parentIFrame = {
      getPageInfo: jest.fn((cb) => {
        pageInfoCallback = cb
      }),
      getPageInfoStop: jest.fn(),
    }

    const { result } = renderHook(() =>
      useStickyInIframe({ enabled: true, stickyTop: 35 })
    )

    const div = document.createElement('div')
    // Matches `.timelineWrapper`'s margin-top: 35px; margin-bottom: 20px;
    div.style.marginTop = '35px'
    div.style.marginBottom = '20px'
    act(() => {
      result.current.containerRef.current = div
    })

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    act(() => {
      pageInfoCallback({ offsetTop: 50, scrollTop: 150 })
    })

    expect(div.style.marginTop).toBe('0px')
    expect(div.style.marginBottom).toBe('0px')

    act(() => {
      pageInfoCallback({ offsetTop: 50, scrollTop: 0 })
    })

    expect(div.style.marginTop).toBe('')
    expect(div.style.marginBottom).toBe('')
  })

  it('does nothing when the media query does not match (desktop viewport)', () => {
    mockMatchMedia(false)
    mockContainerRect({ top: 100, left: 10, width: 300, height: 420 })

    let pageInfoCallback
    window.parentIFrame = {
      getPageInfo: jest.fn((cb) => {
        pageInfoCallback = cb
      }),
      getPageInfoStop: jest.fn(),
    }

    const { result } = renderHook(() =>
      useStickyInIframe({ enabled: true, stickyTop: 35 })
    )

    const div = document.createElement('div')
    act(() => {
      result.current.containerRef.current = div
    })

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    act(() => {
      pageInfoCallback({ offsetTop: 50, scrollTop: 150 })
    })

    expect(div.style.position).toBe('')
  })

  it('polls for window.parentIFrame until it becomes available', () => {
    jest.useFakeTimers()
    mockMatchMedia(true)
    mockContainerRect({ top: 100, left: 10, width: 300, height: 420 })

    delete window.parentIFrame

    renderHook(() => useStickyInIframe({ enabled: true, stickyTop: 35 }))

    const getPageInfo = jest.fn()
    act(() => {
      jest.advanceTimersByTime(100)
      window.parentIFrame = { getPageInfo, getPageInfoStop: jest.fn() }
      jest.advanceTimersByTime(100)
    })

    expect(getPageInfo).toHaveBeenCalled()

    jest.useRealTimers()
  })

  it('stops polling/listening and calls getPageInfoStop on unmount', () => {
    jest.useFakeTimers()
    mockMatchMedia(true)
    mockContainerRect({ top: 100, left: 10, width: 300, height: 420 })

    const getPageInfoStop = jest.fn()
    window.parentIFrame = {
      getPageInfo: jest.fn(),
      getPageInfoStop,
    }

    const { unmount } = renderHook(() =>
      useStickyInIframe({ enabled: true, stickyTop: 35 })
    )

    act(() => {
      unmount()
    })

    expect(getPageInfoStop).toHaveBeenCalled()

    jest.useRealTimers()
  })
})