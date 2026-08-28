import {useContext, useMemo} from 'react'

import DataContext from 'components/providers/DataProvider'

const stepDurationInMinute = 5

export function useAxisAndPowerInfos() {
    const {appliances, occurrences} = useContext(DataContext)
    return useMemo(() => computeAxisAndPowerInfos(appliances, occurrences), [appliances, occurrences])
}

const peakSteps = () => {
    const peaks = [7, 8, 9, 10, 18, 19]
    const numStepsInAnHour = 60 / stepDurationInMinute
    return peaks
        .map((peak) =>
            Array.from(Array(numStepsInAnHour)).map(
                (step, index) => peak * numStepsInAnHour + index
            )
        )
        .reduce((acc, cur) => [...acc, ...cur], [])
}

export function usePeaks(occurrences) {
    const {appliances} = useContext(DataContext)
    return occurrences.map((occurrence) => getPeak(occurrence, appliances))
}

export function usePeak(occurrence) {
    const {appliances} = useContext(DataContext)
    return getPeak(occurrence, appliances)
}

function computeAxisAndPowerInfos(appliances, occurrences) {
    const steps = Array.from(Array(24 * (60 / stepDurationInMinute))).map((_, index) =>
        getAllBlocsForStep({appliances, occurrences, step: index})
    )

    const maxStepPower = steps.filter((step) => step.length > 0).reduce((max, step) => {
        const stepTotal = step.reduce((acc, bloc) => acc + bloc.power, 0)
        return stepTotal > max ? stepTotal : max
    }, 0)

    const maxPowerInKW = Math.max(maxStepPower, 2500)
    const axisYMaxPower = maxPowerInKW > 2500 ? maxPowerInKW + 100 : 2500
    const powerByBlocInKW = maxPowerInKW > 2500 ? ((2500 * 10) / maxPowerInKW) : 10
    const axisYIntervals = Array.from(
        {length: Math.ceil(axisYMaxPower / 1000) + (axisYMaxPower % 1000 === 0 ? 1 : 0)},
        (_, i) => i * 1000
    )

    return {axisYMaxPower, axisYIntervals, powerByBlocInKW}
}

function getPeak(occurrence, appliances) {
    if (!occurrence) {
        return false
    }

    const appliance = appliances.find(
        (appliance) => appliance.slug === occurrence.slug
    )

    // All day
    if (occurrence.allDay) {
        return false
    }

    // Low power appliances
    if (appliance.power < 20 && !appliance.initialPower) {
        return false
    }


    return peakSteps().some((step) => {
        const powerOfStep = getPowerForStep({
            step,
            appliance,
            ...occurrence,
        })
        if (appliance.initialPower) {
            if (powerOfStep === appliance.initialPower) {
                return true;
            }
        } else {
            if (powerOfStep === appliance.power) {
                return true;
            }
        }

        return false;
    })
}

export function useAllBlocsByStep() {
    const {appliances, occurrences} = useContext(DataContext)
    return useMemo(() => {
        const steps = Array.from(Array(24 * (60 / stepDurationInMinute))).map((step, index) =>
            getAllBlocsForStep({
                appliances,
                occurrences,
                step: index
            })
        )
        return {steps, stepDurationInMinute}
    }, [appliances, occurrences])
}

export function useAllPowerOfPeaks() {
    const {appliances, occurrences} = useContext(DataContext)
    return useMemo(() => {
        const {powerByBlocInKW} = computeAxisAndPowerInfos(appliances, occurrences)
        return peakSteps()
            .map((hour) =>
                occurrences
                    .map(
                        (occurrence) =>
                            Math.ceil(
                                getPowerForStep({
                                    step: hour,
                                    appliance: appliances.find(
                                        (appliance) => appliance.slug === occurrence.slug
                                    ),
                                    start: occurrence.start,
                                    duration: occurrence.duration,
                                }) / powerByBlocInKW
                            ) * powerByBlocInKW
                    )
                    .map((occurrence) => occurrence / (60 / stepDurationInMinute))
                    .reduce((acc, cur) => acc + cur, 0)
            )
            .reduce((acc, cur) => acc + cur, 0)
    }, [appliances, occurrences])
}

export function getAllBlocsForStep({
                                       appliances,
                                       occurrences,
                                       step
                                   }) {
    return occurrences
        .map((occurrence, index) => {
            const appliance = appliances.find(
                (appliance) => appliance.slug === occurrence.slug
            )

            return {
                appliance,
                power: getPowerForStep({
                    step,
                    appliance,
                    start: occurrence.start,
                    duration: occurrence.duration,
                }),
                index,
            }
        })
        .filter((bloc) => bloc.power)
        .sort((a, b) => a.appliance.power - b.appliance.power)
}

// Sorry about this
export function getPowerForStep({step, appliance, start, duration}) {
    if (start === 0 && duration === 24) {
        if (appliance.allDayPowerPeak) {
            const peakStartInStep = Math.floor(appliance.allDayPeakStart * (60 / stepDurationInMinute))
            const peakEndInStep = Math.ceil((appliance.allDayPeakStart + appliance.allDayPeakLength / 60) * (60 / stepDurationInMinute))
            if (step >= peakStartInStep && step < peakEndInStep) {
                return appliance.allDayPowerPeak
            }
        }
        return appliance.power
    }

    let end = start + duration
    end = end > 24 ? end - (24 + stepDurationInMinute / 60) : end

    let initialPowerEnd = start + appliance.initialPowerLength / 60
    initialPowerEnd =
        initialPowerEnd > 24
            ? initialPowerEnd - (24 + stepDurationInMinute / 60)
            : initialPowerEnd

    let endPowerEnd = end - appliance.endPowerLength / 60
    endPowerEnd =
        endPowerEnd < 0
            ? endPowerEnd + (24 + stepDurationInMinute / 60)
            : endPowerEnd

    const startInStep = Math.floor(start * (60 / stepDurationInMinute))
    const endInStep = Math.ceil(end * (60 / stepDurationInMinute))
    const initialPowerEndInStep = Math.ceil(
        initialPowerEnd * (60 / stepDurationInMinute)
    )
    const endPowerEndInStep = Math.ceil(endPowerEnd * (60 / stepDurationInMinute))
    const runAtNight = endInStep < startInStep
    const initialPowerAtNight = initialPowerEndInStep < startInStep

    if (
        step >= startInStep &&
        (step < initialPowerEndInStep || initialPowerAtNight) &&
        (step < endInStep || runAtNight)
    ) {
        return appliance.initialPower || appliance.power
    }
    if (step > endPowerEndInStep && step <= endInStep) {
        return appliance.endPower || appliance.power
    }

    if (initialPowerAtNight && step <= initialPowerEndInStep) {
        return appliance.initialPower || appliance.power
    }

    if (step >= startInStep && step < endInStep) {
        return appliance.power
    }

    if (runAtNight && (step >= startInStep || step <= endInStep)) {
        return appliance.power
    }
    return 0
}
