import React from 'react'
import styled from 'styled-components'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import RGPDLinks from "./Eurelian/RGPDLinks";

const LogosWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #fff;
`
const Logos = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 0 0.75rem;
    text-decoration: none;

    ${(props) => props.theme.mq.small} {
        padding: 0 0.25rem;
        font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
    }
`
export default function Footer(props) {
    return (
        <>
            <LogosWrapper>
                <Logos>
                    <Marianne/>
                    <Ademe/>
                </Logos>
            </LogosWrapper>
            <RGPDLinks/>
        </>
    )
}
