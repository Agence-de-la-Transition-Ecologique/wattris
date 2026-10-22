import React from 'react';
import styled from 'styled-components';

const Peak = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.$position / 24) * 100}%;
  width: ${(props) => (props.$duration / 24) * 100}%;
  background: ${(props) => props.theme.colors.error20};
`;
const PeakIndicator = styled.div`
  position: absolute;
  bottom: calc(100% + 1rem);
  width: ${(props) => (props.$duration / 24) * 100}%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 300;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.error};

  ${(props) => props.theme.mq.medium} {
    bottom: calc(100% + 0.5rem);
  }
`;
const Backdrop = styled.div`
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 35px;
`;

export default function Peaks(props) {
  return (
    <>
      <Backdrop />
      <Peak $position={7} $duration={4} $hover={props.hover} />
      <PeakIndicator
        $duration={4}
        style={{ left: `${(7 / 24) * 100}%`, right: `${(13 / 24) * 100}%` }}
      >
        Pointe de consommation
        <br />
        de début de journée
      </PeakIndicator>
      <Peak $position={18} $duration={2} $hover={props.hover} />
      <PeakIndicator
        $duration={2}
        style={{ left: `${(18 / 24) * 100}%`, right: `${(4 / 24) * 100}%` }}
      >
        Pointe de consommation
        <br />
        de fin de journée
      </PeakIndicator>
    </>
  );
}
