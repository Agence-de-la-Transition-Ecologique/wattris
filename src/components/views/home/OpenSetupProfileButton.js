import React, { useContext } from 'react'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/Button'

export default function OpenSetupProfileButton() {
  const { setSetupProfileOpen, setSetupProfileOccurrences } = useContext(ModalContext)
  const { occurrences, mapOccurrencesListWithNames } = useContext(DataContext)
  
  const setProfileOccurrences = () => {
    setSetupProfileOpen(true)
    setSetupProfileOccurrences(mapOccurrencesListWithNames(occurrences))
  }

  return (
    <Button.Wrapper>
      <Button
        hollow
        onClick={() => {
          setProfileOccurrences()
        }}
      >
        Modifier le profil
      </Button>
    </Button.Wrapper>
  )
}
