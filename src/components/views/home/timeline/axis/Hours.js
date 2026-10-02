import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    height: 15px;
    box-shadow: 0 4px 2px 0 rgba(255, 255, 255, 0.2);
`
const Hour = styled.div`
    position: absolute;
    top: 0;
    left: ${(props) => (props.$position ? ((props.$position / 24) * 100) : 'unset')}%;
    right: ${(props) => (props.$last ? 0 : 'auto')};
    font-size: 0.75rem;
    font-weight: 300;

    ${(props) => props.theme.mq.small} {
        transform: translateX(${(props) => (props.$last ? 0 : '-50%')});
        right: ${(props) => (props.$last ? '-0.25rem' : 'auto')};
    }
`
export default function Hours() {
    return (
        <Wrapper>
            <Hour $position={1}>
                1h
            </Hour>
            <Hour $position={4}>
                4h
            </Hour>
            <Hour $position={7}>
                7h
            </Hour>
            <Hour $position={11}>
                11h
            </Hour>
            <Hour $position={18}>
                18h
            </Hour>
            <Hour $position={20}>
                20h
            </Hour>
            <Hour $last>
                Heure de<br/>
                la journée
            </Hour>
        </Wrapper>
    )
}
