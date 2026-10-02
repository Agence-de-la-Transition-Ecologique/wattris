import React, { useMemo } from 'react'
import styled from 'styled-components'
import Bloc from './step/Bloc'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: calc(${(props) => props.$width}%);
  height: 26.25rem;
  margin-top: -1.25rem;
`
export default function Step(props) {
  const peak = useMemo(
    () =>
      (props.hour >= 7 && props.hour < 11) ||
      (props.hour >= 18 && props.hour < 20),
    [props.hour]
  )

  return (
    <Wrapper $width={props.width}>
      {props.step.map((bloc, index) => {
        return <Bloc key={index} bloc={bloc} peak={peak} axisYMaxPower={props.axisYMaxPower} />
      })}
    </Wrapper>
  )
}
