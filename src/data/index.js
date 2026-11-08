// The one place components read content from.
// In development, ?data=worst|one|empty|many swaps in a stress-test dataset (src/dev/fixtures.js).
// In production builds import.meta.env.DEV is false, so the fixtures are never bundled.
import * as content from './content.js'

let source = content

if (import.meta.env.DEV) {
  const key = new URLSearchParams(window.location.search).get('data')
  const { fixtures } = await import('../dev/fixtures.js')
  if (key && fixtures[key]) source = fixtures[key]
}

export const { profile, experience, projects, contact, contactLead } = source
