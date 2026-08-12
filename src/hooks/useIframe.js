import { useState, useEffect } from 'react'

export default function useIframe() {
  const [iframe, setIframe] = useState(false)
  useEffect(() => {
    // window.location n'est disponible qu'après hydratation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIframe(window.location.pathname.includes('iframe'))
  }, [])

  return iframe
}
