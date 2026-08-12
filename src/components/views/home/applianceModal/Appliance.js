import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'
import DescriptionButton from './appliance/DescriptionButton'
import Occurrence from './appliance/Occurrence'
import OccurrenceButtons from './appliance/OccurrenceButtons'
import DeleteButton from 'components/misc/DeleteButton'

const Occurrences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0 -0.675rem;
`
const Title = styled.p`
  margin-bottom: 0.75rem;
  font-weight: bold;
  text-align: center;
`
const DescriptionWrapper = styled.div`
  position: relative;
`

const Description = styled.div`
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-style: italic;
  text-align: left;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledButton = styled(Button)`
  padding: 0.25rem 0.875rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors[props.peak ? 'error' : 'main']};
  background-color: ${(props) => props.theme.colors.background};
  border-color: ${(props) => props.theme.colors.background};

  &:hover {
    color: ${(props) => props.theme.colors.background};
  }

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.background};
`

export default function Appliance(props) {
  const { setActive, setAppliancesListOpen } = useContext(DataContext)

  const [fullDescription, setFullDescription] = useState(false)

  const maxTextLength = 130

  const displayedDescription =
    props.appliance.description.length < maxTextLength || fullDescription
      ? props.appliance.description
      : props.appliance.description.slice(0, maxTextLength) + '...'

  const lastIndex =
    props.occurrencesOfAppliance[props.occurrencesOfAppliance.length - 1].index
  return (
    <>
      <DeleteButton
        onClick={() => {
          props.active.new &&
            props.deleteOccurrence({
              occurrenceIndex: lastIndex,
            })
          setActive(null)
          setAppliancesListOpen(true)
        }}
      />
      <Title>{props.appliance.name}</Title>
      <DescriptionWrapper>
        <Description
          dangerouslySetInnerHTML={{
            __html: displayedDescription,
          }}
        />
        {props.appliance.description.length > maxTextLength && (
          <DescriptionButton
            fullDescription={fullDescription}
            onClick={() => {
              setFullDescription((prevDescription) => !prevDescription)
            }}
          />
        )}
      </DescriptionWrapper>
      <Occurrences>
        {props.occurrencesOfAppliance.map((occurrence, index) => (
          <Occurrence
            key={props.appliance.slug + index}
            appliance={props.appliance}
            occurrence={occurrence}
            peak={props.peaks[index]}
            allPeaks={props.allPeaks}
            multiple={props.occurrencesOfAppliance.length > 1}
          />
        ))}
      </Occurrences>
      <OccurrenceButtons
        appliance={props.appliance}
        lastIndex={lastIndex}
        addOccurrence={props.addOccurrence}
        deleteOccurrence={props.deleteOccurrence}
      />
      <Buttons>
        <StyledButtonLink
          onClick={() => {
            props.deleteAllOccurrencesOfAppliance({
              appliance: props.appliance,
            })
            props.setActive(null)
          }}
        >
          Supprimer{props.occurrencesOfAppliance.length > 1 ? ' tous' : ''}
        </StyledButtonLink>
        <StyledButton
          onClick={() => props.setActive(null)}
          peak={props.allPeaks}
          small
        >
          {props.active.new ? 'Ajouter' : 'Valider'}
        </StyledButton>
      </Buttons>
    </>
  )
}
