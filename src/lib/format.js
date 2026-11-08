// Small, pure helpers used by the UI. Kept separate so they can be unit tested.

// "x 0042 · y 1280" — fixed-width so the readout never jitters.
export function formatCoords(x, y) {
  const pad = (n) => String(Math.max(0, Math.min(9999, Math.round(n)))).padStart(4, '0')
  return `x ${pad(x)} · y ${pad(y)}`
}

// "412 × 386" for the hover measurement on project parts.
export function formatSize(width, height) {
  return `${Math.round(width)} × ${Math.round(height)}`
}

export function emailFrom(contact) {
  const mail = contact.find((c) => c.url.startsWith('mailto:'))
  return mail ? mail.url.slice('mailto:'.length) : null
}

export function isExternal(url) {
  return /^https?:\/\//.test(url)
}

// "item" / "items" — so a count of 1 never reads "1 items".
export function plural(count, one, many = `${one}s`) {
  return count === 1 ? one : many
}

// "04" — the drawing's two-digit counters.
export function pad2(n) {
  return String(n).padStart(2, '0')
}

// Hyphens become non-breaking so "scikit-learn" never splits at the hyphen;
// overflow-wrap still breaks a tag that is genuinely wider than its column.
export function keepHyphens(text) {
  return text.replace(/-/g, '\u2011')
}
