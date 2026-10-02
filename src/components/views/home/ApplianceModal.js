import React, {useContext, useLayoutEffect, useMemo, useState} from 'react'
import styled from 'styled-components'

import {usePeaks} from 'hooks/useAppliances'
import DataContext from 'components/providers/DataProvider'
import ApplianceEdit from './applianceModal/ApplianceEdit'
import ApplianceList from './applianceModal/ApplianceList'

const Background = styled.div`
    position: fixed;
    z-index: 15;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(var(--color-background), 0.2);
`
const Wrapper = styled.div`
    position: absolute;
    z-index: 150;
    top: 5vh;
    left: 50%;
    max-height: 95vh;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    width: 36rem;
    padding: 1rem 1.25rem;
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) =>
            props.theme.colors[props.$peak ? 'error' : 'main']};
    border-radius: 0.75rem;
    box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);
    min-height: ${(props) => (props.$appliancesListOpen ? '47rem' : 0)};
    transition: all 300ms ease-out;

    ${(props) => props.theme.mq.medium} {
        position: fixed;
        top: 1rem;
    }

    ${(props) => props.theme.mq.small} {
        width: 95vw;
        padding: 1rem 1rem 0.75rem;
    }
`
export default function ApplianceModal({timelineRef}) {
    const {
        appliancesListOpen,
        setAppliancesListOpen,
        active,
        setActive,
        appliances,
        occurrences,
        addOccurrence,
        deleteOccurrence,
        deleteAllOccurrencesOfAppliance,
    } = useContext(DataContext)

    const [modalTop, setModalTop] = useState(0);

    const appliance = useMemo(
        () => appliances.find((appliance) => appliance.slug === active?.appliance),
        [active, appliances]
    )

    const occurrencesOfAppliance = useMemo(
        () =>
            occurrences
                .map((occurrence, index) => ({...occurrence, index}))
                .filter((occurrence) => occurrence.slug === appliance?.slug),
        [appliance, occurrences]
    )

    const peaks = usePeaks(occurrencesOfAppliance)

    const allPeaks = useMemo(() => !peaks.includes(false), [peaks])

    useLayoutEffect(() => {
            setModalTop(
                typeof window !== "undefined"
                && !window.matchMedia('screen and (max-width: 768px)').matches
                && !appliancesListOpen
                    ? (timelineRef?.current?.getBoundingClientRect().top + window.scrollY)
                    : null
            );
        },
        [appliance, occurrencesOfAppliance, appliancesListOpen, timelineRef]
    );

    return (appliance && occurrencesOfAppliance?.length) || appliancesListOpen ? (
        <>
            <Background
                onClick={() => {
                    if (appliancesListOpen) {
                        setAppliancesListOpen(false)
                    } else {
                        active.new &&
                        deleteAllOccurrencesOfAppliance({
                            appliance,
                        })
                        setActive(null)
                    }
                }}
            />
            <Wrapper
                $peak={!appliancesListOpen && allPeaks}
                $appliancesListOpen={appliancesListOpen}
                style={{top: modalTop}}
            >
                {appliancesListOpen ? (
                    <ApplianceList/>
                ) : (
                    <ApplianceEdit
                        active={active}
                        setActive={setActive}
                        occurrencesOfAppliance={occurrencesOfAppliance}
                        appliance={appliance}
                        peaks={peaks}
                        allPeaks={allPeaks}
                        addOccurrence={addOccurrence}
                        deleteOccurrence={deleteOccurrence}
                        deleteAllOccurrencesOfAppliance={deleteAllOccurrencesOfAppliance}
                    />
                )}
            </Wrapper>
        </>
    ) : null
}
