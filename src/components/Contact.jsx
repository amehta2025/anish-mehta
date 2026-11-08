import { useEffect, useRef, useState } from 'react'
import { contact, contactLead } from '../data/index.js'
import { emailFrom, isExternal } from '../lib/format.js'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // clipboard blocked: the mailto link next to it still works
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <button type="button" className={copied ? 'btn btn--swap is-copied' : 'btn btn--swap'} onClick={copy} aria-label="Copy email address">
        <span className="swap" aria-hidden="true">
          <span className="swap__a">Copy</span>
          <span className="swap__b">Copied</span>
        </span>
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
    </>
  )
}

export default function Contact() {
  const email = emailFrom(contact)
  const others = contact.filter((c) => isExternal(c.url))

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__lead">
        <p className="label dim">Contact</p>
        <h2 id="contact-title" className="contact__title">{contactLead.headline}</h2>
        <p className="contact__note">{contactLead.note}</p>
      </div>
      <div className="contact__channels">
        <p className="label dim">Channels</p>
        <div className="btns">
          <a className="btn btn--ink" href={`mailto:${email}`}>{email}</a>
          <CopyButton text={email} />
          {others.map((c) => (
            <a key={c.url} className="btn" href={c.url} target="_blank" rel="noreferrer">
              {c.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
