import { useState, useEffect } from 'react'

export default function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // mounted ne peut être déterminé qu'après le montage client
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  return mounted
}
