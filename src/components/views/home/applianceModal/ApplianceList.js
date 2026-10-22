import React, { useContext } from 'react';
import styled from 'styled-components';
import styles from 'styles/ApplianceModal.module.css';

import DataContext from 'components/providers/DataProvider';
import DeleteButton from 'components/misc/DeleteButton';
import ButtonLink from 'components/base/ButtonLink';

const Title = styled.p`
  margin-bottom: 0.75rem;
  font-weight: bold;
  text-align: center;
`;

const Appliance = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 4.5rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors[props.hollow ? 'white' : 'main']};
  background-color: ${(props) => props.theme.colors[props.hollow ? 'main' : 'white']};
  border: 0.125rem solid ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  opacity: ${(props) => (props.disabled ? 0.3 : props.hollow ? 0.8 : 1)};
  transition: all 200ms ease-out;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.main};
    border: 0.125rem solid ${(props) => props.theme.colors.white};
  }
`;
const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SortButton = styled(ButtonLink)`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.white};
`;
export default function ApplianceList() {
  const {
    setAppliancesListOpen,
    occurrences,
    addOccurrence,
    sortAppliancesByPower,
    setSortAppliancesByPower,
    sortedAppliances,
  } = useContext(DataContext);

  return (
    <>
      <DeleteButton onClick={() => setAppliancesListOpen(false)} />
      <Title>Choisissez l'appareil à ajouter</Title>
      <SortWrapper>
        Trier par&nbsp;
        <SortButton
          onClick={() => {
            setSortAppliancesByPower(!sortAppliancesByPower);
          }}
        >
          {sortAppliancesByPower ? 'ordre alphabétique' : 'puissance maximale'}
        </SortButton>
      </SortWrapper>
      <div className={styles.appliancesList}>
        {sortedAppliances.map((appliance) => (
          <Appliance
            key={appliance.slug}
            hollow={occurrences.find((occurrence) => occurrence.slug === appliance.slug)}
            onClick={() => {
              addOccurrence({
                slug: appliance.slug,
                start: appliance.defaultOccurrence.start,
                duration: appliance.defaultOccurrence.duration,
              });
              setAppliancesListOpen(false);
            }}
          >
            {appliance.name}
          </Appliance>
        ))}
      </div>
    </>
  );
}
