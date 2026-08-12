import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'
import StartSelector from 'components/misc/StartSelector'
import DeleteButton from 'components/misc/DeleteButton'
import StartAndEndSelector from 'components/misc/StartAndEndSelector'
import DurationSelector from './occurrence/DurationSelector'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem;
  background-color: ${(props) =>
    props.$peakIsSameAsAppliance
      ? 'rgba(255, 255, 255, 0.2)'
      : props.theme.colors[props.$peak ? 'error' : 'main']};
  border-radius: 1rem;

  > span {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:first-child {
      flex: 1;

      ${(props) => props.theme.mq.small} {
        align-self: normal;
      }
    }
  }

  &:first-child {
    ${(props) => props.theme.mq.small} {
      flex-direction: column;
    }
  }
`
const Text = styled.p`
  margin: 0;
  font-size: 0.75rem;
`
export default function Occurrence(props) {
  const { editOccurrence, deleteOccurrence } = useContext(DataContext)

  return (
    <Wrapper
      $peak={props.peak}
      $peakIsSameAsAppliance={props.allPeaks === props.peak}
    >
      {props.appliance.durationSelector ? (
        <>
          <span>
            <Text>Je le lance</Text>
            <StartSelector
              start={props.occurrence.start}
              peak={props.peak}
              onChange={([start]) => {
                editOccurrence({
                  occurrenceIndex: props.occurrence.index,
                  newOccurrence: { ...props.occurrence, start },
                })
              }}
              large
            />
          </span>
          <span>
            <Text>pendant</Text>
            <DurationSelector
              slug={props.occurrence.slug}
              peak={props.peak}
              value={props.occurrence.duration}
              onChange={(duration) => {
                editOccurrence({
                  occurrenceIndex: props.occurrence.index,
                  newOccurrence: { ...props.occurrence, duration },
                })
              }}
            />
          </span>
        </>
      ) : (
        <>
          <Text>
            Je {props.appliance.slug === 'radiateur' ? 'chauffe' : 'le lance'}
          </Text>
          <StartAndEndSelector
            start={props.occurrence.start}
            duration={props.occurrence.duration}
            smallDuration={Math.abs(props.occurrence.duration) <= 4}
            peak={props.peak}
            onChange={([start, end]) => {
              let duration = end - start
              editOccurrence({
                occurrenceIndex: props.occurrence.index,
                newOccurrence: {
                  ...props.occurrence,
                  start,
                  duration,
                },
              })
            }}
            large
          />
        </>
      )}
      {props.multiple && (
        <DeleteButton
          small
          onClick={() =>
            deleteOccurrence({
              occurrenceIndex: props.occurrence.index,
            })
          }
        />
      )}
    </Wrapper>
  )
}
