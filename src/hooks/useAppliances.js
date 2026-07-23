import { useContext, useMemo } from 'react'

import DataContext from 'components/providers/DataProvider'

const stepDurationInMinute = 5
const powerByBlocInKW = 10
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
  const { appliances } = useContext(DataContext)
  return occurrences.map((occurrence) => getPeak(occurrence, appliances))
}
export function usePeak(occurrence) {
  const { appliances } = useContext(DataContext)
  return getPeak(occurrence, appliances)
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

  let isPeak = false

  peakSteps().map((step) => {
    const powerOfStep = getPowerForStep({
      step,
      appliance,
      ...occurrence,
    })
    if (appliance.initialPower) {
      if (powerOfStep === appliance.initialPower) {
        isPeak = true
      }
    } else {
      if (powerOfStep === appliance.power) {
        isPeak = true
      }
    }
  })
  return isPeak
}
export function useAllBlocsByStep() {
  const { appliances, occurrences } = useContext(DataContext)
  const steps = useMemo(
    () =>
      Array.from(Array(24 * (60 / stepDurationInMinute))).map((step, index) =>
        getAllBlocsForStep({
          appliances,
          occurrences,
          step: index,
          powerByBlocInKW,
        })
      ),
    [appliances, occurrences]
  )

  return { steps, stepDurationInMinute, powerByBlocInKW }
}

export function useAllPowerOfPeaks() {
  const { appliances, occurrences } = useContext(DataContext)
  const power = useMemo(
    () =>
      peakSteps()
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
        .reduce((acc, cur) => acc + cur, 0),
    [appliances, occurrences]
  )
  return power
}

export function getAllBlocsForStep({
  appliances,
  occurrences,
  step,
  powerByBlocInKW,
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
export function getPowerForStep({ step, appliance, start, duration }) {
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
