import React from 'react'
import styled from 'styled-components'
import {useAllBlocsByStep, useAxisAndPowerInfos} from 'hooks/useAppliances'
import useIframe from 'hooks/useIframe'
import useStickyInIframe from 'hooks/useStickyInIframe'
import Axis from './timeline/Axis'
import Step from './timeline/Step'
import styles from 'styles/Timeline.module.css'

const Steps = styled.div`
    display: flex;
`
export default function Timeline({timelineRef}) {
    const {steps, stepDurationInMinute} = useAllBlocsByStep()
    const {axisYMaxPower} = useAxisAndPowerInfos()
    const iframe = useIframe()
    const {containerRef, spacerRef} = useStickyInIframe({
        enabled: iframe,
        stickyTop: 35,
    })

    return (
        <>
            <div ref={spacerRef} style={{height: 0}}/>
            <div
                ref={(node) => {
                    containerRef.current = node
                    if (timelineRef) timelineRef.current = node
                }}
                className={styles.timelineWrapper}
            >
                <Axis/>
                <Steps>
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            step={step}
                            hour={(index / 60) * stepDurationInMinute}
                            width={(100 / 24) * (60 / stepDurationInMinute)}
                            axisYMaxPower={axisYMaxPower}
                        />
                    ))}
                </Steps>
            </div>
        </>
    )
}
