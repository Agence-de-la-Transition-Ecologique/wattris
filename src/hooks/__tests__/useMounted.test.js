import { renderHook, waitFor } from '@testing-library/react'

import useMounted from '../useMounted'

describe('useMounted', () => {
  it('becomes true after mount', async () => {
    const { result } = renderHook(() => useMounted())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })
})
