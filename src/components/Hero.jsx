import { Fragment } from 'react'
import { contact, experience, profile, projects } from '../data/index.js'
import { emailFrom, plural } from '../lib/format.js'

// "full-stack apps, AI tools, and research pipelines" with each item emphasised.
function Builds({ items }) {
  return items.map((item, i) => (
    <Fragment key={item}>
      {i > 0 && (i === items.length - 1 ? ', and ' : ', ')}
      <b>{item}</b>
    </Fragment>
  ))
}

export default function Hero() {
  const github = contact.find((c) => c.label === 'GitHub')
  const email = emailFrom(contact)
  const featured = projects.find((p) => p.highlight)
  // First word on line one, the rest on line two (wrapping if it must). The longest word
  // sets the size cap, so a long name shrinks to fit instead of running off the sheet.
  const words = profile.name.trim().split(/\s+/)
  const [first, ...rest] = words
  const longestWord = Math.max(...words.map((w) => w.length))

  // Detail A: numbered callouts around the "core", all drawn from the real content.
  // Two current roles fit the drawing; any more are counted and point to the log.
  const current = experience.filter((e) => e.current)
  const shown = current.slice(0, 2)
  const hidden = current.length - shown.length
  const callouts = [
    ...shown.map((e, i) => ({
      title: e.role,
      lines: [e.org, e.when, ...(i === shown.length - 1 && hidden > 0 ? [`+${hidden} ${plural(hidden, 'more current role')} in the log`] : [])],
      href: '#experience',
    })),
    { title: profile.degree, lines: [profile.university] },
    featured && {
      title: featured.highlight,
      lines: [featured.title],
      href: `#${featured.id}`,
    },
  ].filter(Boolean)

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="label dim enter">Sheet 01 — General arrangement</p>
        <h1 id="hero-title" className="hero__name enter" style={{ '--d': 1, '--name-chars': longestWord }}>
          <span className="hero__line">{first}</span>
          {rest.length > 0 && (
            <>
              {' '}
              <span className="hero__line">{rest.join(' ')}</span>
            </>
          )}
        </h1>
        <p className="dimline label enter" style={{ '--d': 2 }}>
          <span>{profile.school}</span>
          <span className="dimline__rule" aria-hidden="true" />
          <span>{profile.degree}</span>
        </p>
        {profile.builds.length > 0 && (
          <p className="hero__lede enter" style={{ '--d': 3 }}>
            I build <Builds items={profile.builds} />.
          </p>
        )}
        <div className="btns enter" style={{ '--d': 4 }}>
          <a className="btn btn--ink" href="#projects">View projects <span aria-hidden="true">↓</span></a>
          <a className="btn" href={github.url} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a className="btn" href={`mailto:${email}`}>Email</a>
        </div>
      </div>

      {/* Fewer than three callouts can't fill the four quadrants, so they stack as a list instead. */}
      <figure className={callouts.length < 3 ? 'detail detail--list' : 'detail'} aria-labelledby="detail-caption">
        <figcaption id="detail-caption" className="label dim">Detail A — Current configuration</figcaption>
        {callouts.length >= 3 && (
          <>
            <span className="datum datum--h" aria-hidden="true" />
            <span className="datum datum--v" aria-hidden="true" />
          </>
        )}
        <div className="core" aria-hidden="true"><span>AM</span></div>
        <ol className="callouts">
          {callouts.map((c, i) => {
            const body = (
              <>
                <span className="callout__n" aria-hidden="true">{i + 1}</span>
                <span className="callout__title">{c.title}</span>
                {c.lines.map((line) => (
                  <span key={line} className="callout__detail">{line}</span>
                ))}
              </>
            )
            return (
              <li key={c.title} className={`callout callout--${i + 1}`} style={{ '--i': i }}>
                {c.href ? <a className="callout__body" href={c.href}>{body}</a> : <div className="callout__body">{body}</div>}
              </li>
            )
          })}
        </ol>
      </figure>
    </section>
  )
}
