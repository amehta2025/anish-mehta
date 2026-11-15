import { describe, expect, it } from 'vitest'
import { emailFrom, isExternal, keepHyphens } from './format.js'

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

describe('keepHyphens', () => {
  it('swaps every hyphen for a non-breaking one and leaves other text alone', () => {
    expect(keepHyphens('scikit-learn')).toBe('scikit‑learn')
    expect(keepHyphens('a-b-c')).toBe('a‑b‑c')
    expect(keepHyphens('Next.js')).toBe('Next.js')
  })
})
