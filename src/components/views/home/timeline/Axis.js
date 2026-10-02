import React from 'react';
import styled from 'styled-components';

import Ticks from './axis/Ticks';
import Hours from './axis/Hours';
import Peaks from './axis/Peaks';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: visible;
`;
const Ylegend = styled.div`
  position: absolute;
  top: -50px;
  left: 0.125rem;
  width: 4rem;
  font-size: 0.75rem;
  font-weight: 300;
  transform-origin: left;
`;
const Yaxis = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  width: 0.0625rem;
  background-color: ${(props) => props.theme.colors.textLighter};
`;
export default function Axis() {
  return (
    <Wrapper>
      <Ticks />
      <Yaxis />
      <Hours />
      <Peaks />
      <Ylegend>Puissance appelée</Ylegend>
    </Wrapper>
  );
}
