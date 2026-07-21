import React, { useContext } from 'react'

import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/Button'

export default function OpenSetupProfileButton() {
  const { setSetupProfile } = useContext(ModalContext)

  return (
    <Button.Wrapper>
      <Button
        hollow
        onClick={() => {
            setSetupProfile(true)
        }}
      >
        Modifier le profil
      </Button>
    </Button.Wrapper>
  )
}
