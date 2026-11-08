import { describe, expect, it } from 'vitest'
import { contact, contactLead, experience, profile, projects } from './content.js'

// The page is rendered entirely from this file, so a typo here is a broken page.
// These checks catch the mistakes that are easy to make when adding new entries.

const isUrl = (u) => /^https:\/\/[^\s]+$/.test(u)

describe('profile', () => {
  it('has the fields the title block and hero render', () => {
    for (const key of ['name', 'role', 'school', 'university', 'degree', 'status']) {
      expect(profile[key], key).toBeTruthy()
    }
    expect(profile.builds.length).toBeGreaterThan(0)
  })
})

describe('experience', () => {
  it('has a role, organization, and summary for every entry', () => {
    for (const job of experience) {
      expect(job.role && job.org && job.summary, job.org).toBeTruthy()
      expect(typeof job.current).toBe('boolean')
    }
  })

  it('gives dates as text when they are listed, and always for current roles', () => {
    for (const job of experience) {
      if ('when' in job) expect(job.when, job.org).toMatch(/\S/)
      if (job.current) expect(job.when, job.org).toBeTruthy() // Detail A shows current roles' dates
    }
  })

  it('uses unique organization + date pairs (they are React keys)', () => {
    const keys = experience.map((j) => `${j.org}-${j.when ?? j.role}`)
    expect(new Set(keys).size).toBe(keys.length)
  })
})

describe('projects', () => {
  it('has unique, URL-safe ids so #anchors work', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/)
  })

  it('has a title, kind, blurb, tags, and at least one https link', () => {
    for (const p of projects) {
      expect(p.title && p.kind && p.blurb, p.id).toBeTruthy()
      expect(p.tags.length, p.id).toBeGreaterThan(0)
      expect(p.links.length, p.id).toBeGreaterThan(0)
      for (const link of p.links) {
        expect(link.label, p.id).toBeTruthy()
        expect(isUrl(link.url), link.url).toBe(true)
      }
    }
  })
})

describe('contact', () => {
  it('has exactly one email link and https links for the rest', () => {
    const mail = contact.filter((c) => c.url.startsWith('mailto:'))
    expect(mail).toHaveLength(1)
    expect(mail[0].url).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[a-z]+$/)
    for (const c of contact.filter((x) => !x.url.startsWith('mailto:'))) expect(isUrl(c.url), c.url).toBe(true)
  })

  it('has the headline and note shown in the contact section', () => {
    expect(contactLead.headline).toBeTruthy()
    expect(contactLead.note).toBeTruthy()
  })
})
