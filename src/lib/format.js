// Small, pure helpers used by the UI. Kept separate so they can be unit tested.

export function emailFrom(contact) {
  const mail = contact.find((c) => c.url.startsWith('mailto:'))
  return mail ? mail.url.slice('mailto:'.length) : null
}

export function isExternal(url) {
  return /^https?:\/\//.test(url)
}

// Hyphens become non-breaking so "scikit-learn" never splits at the hyphen;
// overflow-wrap still breaks a tag that is genuinely wider than its column.
export function keepHyphens(text) {
  return text.replace(/-/g, '\u2011')
}
