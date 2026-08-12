import { getRealHoursFromDecimalHours } from '../formatters'

describe('getRealHoursFromDecimalHours', () => {
  it('formats decimal hours to hhHmm', () => {
    expect(getRealHoursFromDecimalHours(1.5)).toBe('01h30')
    expect(getRealHoursFromDecimalHours(12.25)).toBe('12h15')
  })

  it('pads hours and minutes with leading zeros', () => {
    expect(getRealHoursFromDecimalHours(0)).toBe('00h00')
    expect(getRealHoursFromDecimalHours(9.05)).toBe('09h03')
  })
})
