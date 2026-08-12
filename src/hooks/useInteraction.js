import { useEffect } from 'react'

const handleInteraction = () => {
  document.body.removeEventListener('click', handleInteraction)
}
export default function useInteraction() {
  useEffect(() => {
    document.body.addEventListener('click', handleInteraction)
    return () => {
      document.body.removeEventListener('click', handleInteraction)
    }
  }, [])
}
