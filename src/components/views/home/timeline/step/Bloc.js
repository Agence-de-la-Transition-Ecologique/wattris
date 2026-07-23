import React, { useContext } from 'react'
import styled from 'styled-components'
import DataContext from 'components/providers/DataProvider'

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: ${(props) => props.$power * props.$cssRem}rem;
  background-color: ${(props) =>
    props.theme.colors[props.$peak ? 'error' : 'main']};
  opacity: ${(props) => (props.$discret ? 0.3 : 1)};
  transition: opacity ${(props) => props.$discret && '200ms'} ease-out;
  cursor: pointer;
`
export default function Bloc(props) {
  const { hover, setHover, active, setActive } = useContext(DataContext)
  const cssRem = 25 / props.axisYMaxPower
  
  return (
    <Wrapper
      $power={props.bloc.power}
      $peak={props.peak}
      $cssRem={cssRem}
      $discret={
        active
          ? active?.appliance !== props.bloc.appliance.slug
          : hover && hover.occurrence !== props.bloc.index
      }
      onMouseEnter={() => setHover({ occurrence: props.bloc.index })}
      onMouseLeave={() => setHover(null)}
      onClick={() => {
        setActive({ appliance: props.bloc.appliance.slug })
      }}
    ></Wrapper>
  )
}
