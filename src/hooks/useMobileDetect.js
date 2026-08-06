import { useState, useEffect } from 'react'

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
    // window.location n'est disponible qu'après hydratation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobile(mobile)
  }, [])

  return isMobile
}
