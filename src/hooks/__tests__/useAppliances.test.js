import React from 'react'
import { renderHook } from '@testing-library/react'

import DataContext from 'components/providers/DataProvider'
import {
  getAllBlocsForStep,
  getPowerForStep,
  useAllBlocsByStep,
  useAllPowerOfPeaks,
  useAxisAndPowerInfos,
  usePeak,
  usePeaks,
} from '../useAppliances'

const buildWrapper = (value) => {
  return function Wrapper({ children }) {
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
  }
}

const baseAppliances = [
  {
    slug: 'heater',
    power: 1000,
    initialPower: 1500,
    initialPowerLength: 10,
    endPower: 500,
    endPowerLength: 10,
  },
  {
    slug: 'fan',
    power: 200,
    initialPowerLength: 0,
    endPowerLength: 0,
  },
  {
    slug: 'led',
    power: 10,
    initialPowerLength: 0,
    endPowerLength: 0,
  },
]

describe('getPowerForStep', () => {
  it('returns all-day peak power during peak window', () => {
    const appliance = {
      power: 200,
      allDayPowerPeak: 350,
      allDayPeakStart: 8,
      allDayPeakLength: 60,
      initialPowerLength: 0,
      endPowerLength: 0,
    }

    expect(getPowerForStep({ step: 96, appliance, start: 0, duration: 24 })).toBe(350)
    expect(getPowerForStep({ step: 95, appliance, start: 0, duration: 24 })).toBe(200)
  })

  it('handles initial, nominal and end powers on a daytime run', () => {
    const appliance = {
      power: 1000,
      initialPower: 1500,
      initialPowerLength: 10,
      endPower: 500,
      endPowerLength: 10,
    }

    expect(getPowerForStep({ step: 12, appliance, start: 1, duration: 1 })).toBe(1500)
    expect(getPowerForStep({ step: 16, appliance, start: 1, duration: 1 })).toBe(1000)
    expect(getPowerForStep({ step: 23, appliance, start: 1, duration: 1 })).toBe(500)
    expect(getPowerForStep({ step: 40, appliance, start: 1, duration: 1 })).toBe(0)
  })

  it('handles runs crossing midnight', () => {
    const appliance = {
      power: 700,
      initialPowerLength: 0,
      endPowerLength: 0,
    }

    expect(getPowerForStep({ step: 278, appliance, start: 23, duration: 2 })).toBe(700)
    expect(getPowerForStep({ step: 5, appliance, start: 23, duration: 2 })).toBe(700)
    expect(getPowerForStep({ step: 50, appliance, start: 23, duration: 2 })).toBe(0)
  })

  it('returns initialPower after midnight when initialPowerLength crosses midnight', () => {
    const appliance = {
      power: 700,
      initialPower: 1200,
      initialPowerLength: 90,
      endPowerLength: 0,
    }
    // start=23h, duration=2h, initialPowerLength=90min → initialPowerEnd franchit minuit (~0h25)
    expect(getPowerForStep({ step: 3, appliance, start: 23, duration: 2 })).toBe(1200)
    expect(getPowerForStep({ step: 280, appliance, start: 23, duration: 2 })).toBe(1200)
    expect(getPowerForStep({ step: 7, appliance, start: 23, duration: 2 })).toBe(700)
    expect(getPowerForStep({ step: 50, appliance, start: 23, duration: 2 })).toBe(0)
  })

  it('returns endPower on a run that crosses midnight', () => {
    const appliance = {
      power: 700,
      endPower: 300,
      initialPowerLength: 0,
      endPowerLength: 30,
    }
    // start=23h, duration=2h, endPowerLength=30min → endPower s'applique entre ~0h25 et ~1h
    expect(getPowerForStep({ step: 7, appliance, start: 23, duration: 2 })).toBe(300)
    expect(getPowerForStep({ step: 280, appliance, start: 23, duration: 2 })).toBe(700)
    expect(getPowerForStep({ step: 50, appliance, start: 23, duration: 2 })).toBe(0)
  })
})

describe('getAllBlocsForStep', () => {
  it('filters inactive blocs and sorts active ones by power', () => {
    const appliances = [
      {
        slug: 'low',
        power: 100,
        initialPowerLength: 0,
        endPowerLength: 0,
      },
      {
        slug: 'high',
        power: 1000,
        initialPowerLength: 0,
        endPowerLength: 0,
      },
    ]

    const occurrences = [
      { slug: 'high', start: 1, duration: 1 },
      { slug: 'low', start: 1, duration: 1 },
    ]

    const blocs = getAllBlocsForStep({ appliances, occurrences, step: 13 })

    expect(blocs).toHaveLength(2)
    expect(blocs[0].appliance.slug).toBe('low')
    expect(blocs[1].appliance.slug).toBe('high')

    const emptyBlocs = getAllBlocsForStep({ appliances, occurrences, step: 40 })
    expect(emptyBlocs).toEqual([])
  })
})

describe('usePeak', () => {
  it('returns false for null, all-day and low-power cases', () => {
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences: [] })

    const nullPeak = renderHook(() => usePeak(null), { wrapper })
    expect(nullPeak.result.current).toBe(false)

    const allDayPeak = renderHook(
      () => usePeak({ slug: 'heater', start: 0, duration: 24, allDay: true }),
      { wrapper }
    )
    expect(allDayPeak.result.current).toBe(false)

    const lowPowerPeak = renderHook(
      () => usePeak({ slug: 'led', start: 7, duration: 1, allDay: false }),
      { wrapper }
    )
    expect(lowPowerPeak.result.current).toBe(false)
  })

  it('detects intersection with peak slots', () => {
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences: [] })

    const { result } = renderHook(
      () => usePeak({ slug: 'heater', start: 7, duration: 1, allDay: false }),
      { wrapper }
    )
    expect(result.current).toBe(true)
  })

  it('returns false when an appliance with initialPower runs entirely outside peak hours', () => {
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences: [] })

    // heater a un initialPower=1500 mais tourne de 2h à 3h, hors de toute heure de pointe
    const { result } = renderHook(
      () => usePeak({ slug: 'heater', start: 2, duration: 1, allDay: false }),
      { wrapper }
    )
    expect(result.current).toBe(false)
  })
})

describe('usePeaks', () => {
  it('maps peak detection across multiple occurrences', () => {
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences: [] })

    const { result } = renderHook(
      () =>
        usePeaks([
          { slug: 'heater', start: 7, duration: 1, allDay: false },
          { slug: 'fan', start: 2, duration: 1, allDay: false },
        ]),
      { wrapper }
    )
    expect(result.current).toEqual([true, false])
  })
})

describe('useAxisAndPowerInfos', () => {
  it('returns default axis values when max power is below 2500W', () => {
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences: [] })
    const { result } = renderHook(() => useAxisAndPowerInfos(), { wrapper })

    expect(result.current.axisYMaxPower).toBe(2500)
    expect(result.current.powerByBlocInKW).toBe(10)
    expect(result.current.axisYIntervals).toEqual([0, 1000, 2000])
  })

  it('scales axis above 2500W for high-power appliances', () => {
    const heavyAppliances = [
      { slug: 'oven', power: 3000, initialPowerLength: 0, endPowerLength: 0 },
    ]
    const wrapper = buildWrapper({
      appliances: heavyAppliances,
      occurrences: [{ slug: 'oven', start: 1, duration: 1 }],
    })
    const { result } = renderHook(() => useAxisAndPowerInfos(), { wrapper })

    expect(result.current.axisYMaxPower).toBeGreaterThan(2500)
    expect(result.current.powerByBlocInKW).toBeLessThan(10)
    expect(result.current.axisYIntervals).toContain(3000)
  })
})

describe('useAllBlocsByStep', () => {
  it('returns 288 daily steps with 5-minute duration', () => {
    const occurrences = [{ slug: 'heater', start: 7, duration: 1 }]
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences })

    const { result } = renderHook(() => useAllBlocsByStep(), { wrapper })

    const STEP_7H = 7 * (60 / 5) // 84
    expect(result.current.stepDurationInMinute).toBe(5)
    expect(result.current.steps).toHaveLength(288)
    expect(result.current.steps[STEP_7H]).toHaveLength(1)
  })
})

describe('useAllPowerOfPeaks', () => {
  it('aggregates weighted power consumed during peak slots', () => {
    const occurrences = [{ slug: 'heater', start: 7, duration: 1 }]
    const wrapper = buildWrapper({ appliances: baseAppliances, occurrences })

    const { result } = renderHook(() => useAllPowerOfPeaks(), { wrapper })

    expect(result.current).toBeGreaterThan(0)
  })
})
