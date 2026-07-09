import React, {useState} from 'react'

import Co2eModal from 'components/modals/Co2eModal'
import IntroductionModal from 'components/modals/IntroductionModal'
import ProfilesModal from 'components/modals/ProfilesModal'
import SetupProfileModal from "components/modals/SetupProfileModal"

const ModalContext = React.createContext({})

export function ModalProvider(props) {
    const [co2e, setCo2e] = useState(false)
    const [introduction, setIntroduction] = useState(true)
    const [profils, setProfils] = useState(false)
    const [setupProfile, setSetupProfile] = useState(false)
    const [setupProfileOccurences, setSetupProfileOccurences] = useState([])

    return (
        <ModalContext.Provider
            value={{
                co2e,
                setCo2e: (value) => {
                    window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'CO2e'])
                    setCo2e(value)
                },
                introduction,
                setIntroduction: (value) => {
                    window?._paq?.push([
                        'trackEvent',
                        'Interaction',
                        'Modal',
                        'introduction',
                    ])
                    setIntroduction(value)
                },
                profils,
                setProfils: (value) => {
                    window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'profils'])
                    setProfils(value)
                },
                setupProfile,
                setSetupProfile: (value) => {
                    window?._paq?.push(['trackEvent', 'Interaction', 'Modal', 'setupProfile'])
                    setSetupProfile(value)
                },
                setupProfileOccurences,
                setSetupProfileOccurences: (value) => {
                    setSetupProfileOccurences(value)
                },
            }}
        >
            {props.children}
            <Co2eModal/>
            <IntroductionModal/>
            <SetupProfileModal />
            <ProfilesModal/>
        </ModalContext.Provider>
    )
}

export default ModalContext
