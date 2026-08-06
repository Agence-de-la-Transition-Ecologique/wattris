import { renderHook } from '@testing-library/react'

import useInteraction from '../useInteraction'

describe('useInteraction', () => {
  it('registers and removes the click listener on body', () => {
    const addSpy = jest.spyOn(document.body, 'addEventListener')
    const removeSpy = jest.spyOn(document.body, 'removeEventListener')

    const { unmount } = renderHook(() => useInteraction())

    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function))
    const listener = addSpy.mock.calls[0][1]

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('click', listener)

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
