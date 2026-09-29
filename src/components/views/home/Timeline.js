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
    -webkit-mask-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0)),
            color-stop(0.3, rgba(0, 0, 0, 1)),
            to(rgba(0, 0, 0, 1))
    );
`
export default function Timeline() {
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
            <div ref={containerRef} className={styles.timelineWrapper}>
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
