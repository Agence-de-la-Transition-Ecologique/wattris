import React, {useState} from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import IntroductionModal from 'components/modals/IntroductionModal'
import SetupProfileModal from "components/modals/SetupProfileModal"

const ModalContext = React.createContext({})

export function ModalProvider(props) {
    const [co2eOpen, setCo2eOpen] = useState(false)
    const [introductionOpen, setIntroductionOpen] = useState(true)
    const [setupProfileOpen, setSetupProfileOpen] = useState(false)
    const [setupProfileOccurrences, setSetupProfileOccurrences] = useState([])

    return (
        <ModalContext.Provider
            value={{
                co2eOpen,
                setCo2eOpen,
                introductionOpen,
                setIntroductionOpen,
                setupProfileOpen,
                setSetupProfileOpen,
                setupProfileOccurrences,
                setSetupProfileOccurrences
            }}
        >
            {props.children}
            <Co2eModal/>
            <IntroductionModal/>
            <SetupProfileModal />
        </ModalContext.Provider>
    )
}

export default ModalContext
