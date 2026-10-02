import React, {useRef} from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Appliances from './home/Appliances'
import Timeline from './home/Timeline'
import ApplianceModal from './home/ApplianceModal'
import OpenSetupProfileButton from './home/OpenSetupProfileButton'
import AdviseAndRecommendations from './home/AdviseAndRecommendations'

const StyledSectionContent = styled(Section.Content)`
    padding-top: 2rem;
    border: 0.125rem solid ${(props) => props.theme.colors[props.$hoverIframe ? 'main' : 'background']};
    border-radius: 1rem;
    transition: border 300ms ease-out;
`
export default function Home(props) {
    const timelineRef = useRef(null);

    return (
        <Section id='home'>
            <StyledSectionContent $hoverIframe={props.hoverIframe}>
                <Timeline timelineRef={timelineRef}/>
                <ApplianceModal timelineRef={timelineRef}/>
                <Appliances/>
                <OpenSetupProfileButton/>
                <AdviseAndRecommendations/>
            </StyledSectionContent>
        </Section>
    )
}
