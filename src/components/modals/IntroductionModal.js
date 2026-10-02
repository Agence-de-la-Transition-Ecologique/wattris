import React, {useContext} from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'
import Logo from 'components/base/Logo'
import Button from 'components/base/Button'

const StyledLogo = styled(Logo)`
    display: block;
    width: 20rem;
    max-width: 100%;
    margin: 0.5rem auto 1.5rem;
`
const Text = styled.p`
    text-align: center;
`

export default function IntroductionModal() {

    const {pathname} = useRouter()
    const excludeRoutes = ['/politique-cookies', '/mentions-legales', '/plan-du-site', '/politique-protection-donnees', '/integration']

    const {
        introductionOpen,
        setIntroductionOpen,
        setSetupProfileOpen,
        setSetupProfileOccurrences,
    } = useContext(ModalContext)

    const {defaultOccurrences} = useContext(DataContext)

    const isExcludedRoute = excludeRoutes.includes(pathname)

    return (
        <Modal
            open={introductionOpen && !isExcludedRoute}
            setOpen={setIntroductionOpen}
        >
            <StyledLogo permanent/>
            <Text>
                En évitant de mettre en fonctionnement certains appareils <b>entre 7h et 11h</b> puis <b>entre 18h et 20h</b>, on
                consomme moins d'électricité tous en même temps. Les centrales nucléaires et les énergies renouvelables
                peuvent alors satisfaire la majorité de nos besoins. Produire et consommer de l’électricité bas-carbone
                devient plus facile !
            </Text>
            <Text>
                Les heures pleines et les heures creuses évoluent beaucoup dernièrement. Faites le point avec votre
                fournisseur d’électricité pour connaitre les heures où l’électricité est la moins chère pour vous.
            </Text>
            <Text>
                Grâce à ce simulateur, découvrez les appareils qui consomment le plus chez vous, qui sont ceux dont vous
                pouvez décaler l'utilisation pour participer à limiter le changement climatique et réduire votre
                facture.
            </Text>
            <Button.Wrapper $vertical>
                <Button
                    hollow
                    onClick={() => {
                        setIntroductionOpen(false)
                        setSetupProfileOpen(true)
                        setSetupProfileOccurrences(defaultOccurrences)
                    }}
                >
                    Je paramètre mon profil
                </Button>
            </Button.Wrapper>
        </Modal>
    )
}
