import React from 'react';
import styled from 'styled-components';
import { useAxisAndPowerInfos } from 'hooks/useAppliances';
import ChevronRightIcon from '../../../../icons/ChevronRightIcon';

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: ${(props) => (props.$position / props.$axisYMaxPower) * 100}%;
  left: 0;
  width: 100%;
  height: 0.0625rem;
  transform: translateY(50%);
  background-color: ${(props) => props.theme.colors.textLighter};

  span {
    position: absolute;
    bottom: 0.125rem;
    left: 0.125rem;
    font-size: 0.75rem;
    font-weight: 300;
    color: ${(props) => props.theme.colors.text};
  }

  svg {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.textLighter};
  }
`;
export default function Ticks(props) {
  const { axisYIntervals, axisYMaxPower } = useAxisAndPowerInfos();

  return (
    <>
      {axisYIntervals.map((position) => (
        <Wrapper key={position} $position={position} $axisYMaxPower={axisYMaxPower}>
          <span>{position === 0 ? '0' : `${position}\u00A0W`}</span>
          {position === 0 && <ChevronRightIcon />}
        </Wrapper>
      ))}
    </>
  );
}
