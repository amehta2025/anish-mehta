import { describe, expect, it } from 'vitest'
import { emailFrom, formatCoords, formatSize, isExternal, keepHyphens, pad2, plural } from './format.js'

describe('formatCoords', () => {
  it('pads both axes to four digits so the readout never changes width', () => {
    expect(formatCoords(42, 7)).toBe('x 0042 · y 0007')
  })

  it('rounds fractional pointer positions', () => {
    expect(formatCoords(10.4, 10.6)).toBe('x 0010 · y 0011')
  })

  it('clamps out-of-range values instead of growing or going negative', () => {
    expect(formatCoords(-5, 123456)).toBe('x 0000 · y 9999')
  })
})

describe('formatSize', () => {
  it('rounds and joins with a multiplication sign', () => {
    expect(formatSize(412.4, 385.6)).toBe('412 × 386')
  })
})

describe('emailFrom', () => {
  it('pulls the address out of the mailto link', () => {
    expect(emailFrom([{ label: 'GitHub', url: 'https://github.com/x' }, { label: 'Email', url: 'mailto:a@b.co' }])).toBe('a@b.co')
  })

  it('returns null when there is no email link', () => {
    expect(emailFrom([{ label: 'GitHub', url: 'https://github.com/x' }])).toBeNull()
  })
})

describe('isExternal', () => {
  it('is true for http(s) links and false for mailto and in-page anchors', () => {
    expect(isExternal('https://example.com')).toBe(true)
    expect(isExternal('mailto:a@b.co')).toBe(false)
    expect(isExternal('#projects')).toBe(false)
  })
})

describe('plural', () => {
  it('uses the singular only for exactly one', () => {
    expect(plural(1, 'item')).toBe('item')
    expect(plural(0, 'item')).toBe('items')
    expect(plural(4, 'item')).toBe('items')
  })

  it('accepts an irregular plural', () => {
    expect(plural(1, 'entry', 'entries')).toBe('entry')
    expect(plural(3, 'entry', 'entries')).toBe('entries')
  })
})

describe('pad2', () => {
  it('pads to two digits without truncating larger counts', () => {
    expect(pad2(4)).toBe('04')
    expect(pad2(0)).toBe('00')
    expect(pad2(128)).toBe('128')
  })
})

describe('keepHyphens', () => {
  it('swaps every hyphen for a non-breaking one and leaves other text alone', () => {
    expect(keepHyphens('scikit-learn')).toBe('scikit‑learn')
    expect(keepHyphens('a-b-c')).toBe('a‑b‑c')
    expect(keepHyphens('Next.js')).toBe('Next.js')
  })
})
