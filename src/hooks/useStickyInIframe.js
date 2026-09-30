import {useCallback, useEffect, useRef} from 'react'

/**
 * Hook to simulate sticky positioning for an element inside an iframe, using the iframe-resizer library to get the parent page's scroll position.
 */
export default function useStickyInIframe({enabled, stickyTop = 0}) {
    const containerRef = useRef(null)
    const spacerRef = useRef(null)
    const rectRef = useRef(null)

    const applyStuck = useCallback((top, left, width, spacerHeight) => {
        const container = containerRef.current
        if (!container) return
        container.style.position = 'fixed'
        container.style.top = `${top}px`
        container.style.left = `${left}px`
        container.style.width = `${width}px`
        container.style.zIndex = '10'
        container.style.marginTop = '0px'
        container.style.marginBottom = '0px'
        if (spacerRef.current) spacerRef.current.style.height = `${spacerHeight}px`
    }, [])

    const applyUnstuck = useCallback(() => {
        const container = containerRef.current
        if (container) {
            container.style.position = ''
            container.style.top = ''
            container.style.left = ''
            container.style.width = ''
            container.style.zIndex = ''
            container.style.marginTop = ''
            container.style.marginBottom = ''
        }
        if (spacerRef.current) spacerRef.current.style.height = '0px'
    }, [])

    const measure = useCallback(() => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const computed = window.getComputedStyle(containerRef.current)
        const marginTop = parseFloat(computed.marginTop) || 0
        const marginBottom = parseFloat(computed.marginBottom) || 0
        rectRef.current = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            flowHeight: rect.height + marginTop + marginBottom,
        }
    }, [])

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') {
            applyUnstuck()
            return undefined
        }

        const mediaQuery = window.matchMedia('(max-width: 768px)')
        let stopped = false
        let pollTimeout = null

        const handlePageInfo = (pageInfo) => {
            if (stopped || !mediaQuery.matches || !rectRef.current) {
                applyUnstuck()
                return
            }

            // `offsetTop` reported by iframe-resizer is the iframe's position
            // relative to the top of the *document* (constant while scrolling),
            // NOT relative to the viewport. The value that actually changes while
            // scrolling is `scrollTop` (the parent page's current scroll offset).
            // The iframe's live position within the parent's viewport is therefore:
            //   offsetTop - scrollTop
            const iframeVisibleTop = pageInfo.offsetTop - pageInfo.scrollTop
            const naturalVisibleTop = iframeVisibleTop + rectRef.current.top

            if (naturalVisibleTop <= stickyTop) {
                applyStuck(
                    stickyTop - iframeVisibleTop - 40, // Remove 40px on top to avoid space
                    rectRef.current.left,
                    rectRef.current.width,
                    rectRef.current.height
                )
            } else {
                applyUnstuck()
            }
        }

        const waitForParentIframe = () => {
            if (stopped) return
            if (window.parentIFrame) {
                measure()
                window.parentIFrame.getPageInfo(handlePageInfo)
            } else {
                pollTimeout = setTimeout(waitForParentIframe, 100)
            }
        }
        waitForParentIframe()

        const handleResize = () => measure()
        window.addEventListener('resize', handleResize)
        mediaQuery.addEventListener('change', handleResize)

        return () => {
            stopped = true
            if (pollTimeout) clearTimeout(pollTimeout)
            window.removeEventListener('resize', handleResize)
            mediaQuery.removeEventListener('change', handleResize)
            if (window.parentIFrame && window.parentIFrame.getPageInfoStop) {
                window.parentIFrame.getPageInfoStop()
            }
            applyUnstuck()
        }
    }, [enabled, stickyTop, measure, applyStuck, applyUnstuck])

    return {containerRef, spacerRef}
}


