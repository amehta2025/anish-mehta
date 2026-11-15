import { Fragment } from 'react'
import { contact, featured, profile, projects } from '../data/index.js'
import { emailFrom, keepHyphens } from '../lib/format.js'

// "research pipelines, AI tools, and full-stack apps" with each item emphasised.
function Builds({ items }) {
  return items.map((item, i) => (
    <Fragment key={item}>
      {i > 0 && (i === items.length - 1 ? ', and ' : ', ')}
      <b>{keepHyphens(item)}</b>
    </Fragment>
  ))
}

// Part widths, so the stack reads as different components rather than a list.
const partWidths = [0.7, 0.86, 1, 0.78, 0.92, 0.64]

// The featured project drawn as parts stacked on one axis, a part per step.
function HowItWorks({ project, stages, output }) {
  return (
    <figure className="xv" aria-labelledby="xv-caption">
      <figcaption id="xv-caption" className="label dim xv__cap">How {project.title} works</figcaption>

      <ol className="xv__stages">
        {stages.map((stage, i) => (
          <li key={stage.name} className="xv__stage" style={{ '--i': i, '--w': partWidths[i % partWidths.length] }}>
            <span className="xv__part">
              <span className="xv__chip">{stage.name}</span>
            </span>
            <span className="xv__label">
              <span className="xv__n" aria-hidden="true">{i + 1}</span>
              <span className="xv__detail">{stage.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      {output && (
        <p className="xv__out" style={{ '--i': stages.length }}>
          <span className="xv__arrow" aria-hidden="true" />
          <span className="xv__out-text">{output}</span>
        </p>
      )}

      <div className="xv__links part__links">
        {project.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> ({project.title}, opens in a new tab)</span>
          </a>
        ))}
      </div>
    </figure>
  )
}

export default function Hero() {
  const github = contact.find((c) => c.label === 'GitHub')
  const email = emailFrom(contact)
  // First word on line one, the rest on line two (wrapping if it must). The longest word
  // sets the size cap, so a long name shrinks to fit instead of running off the sheet.
  const words = profile.name.trim().split(/\s+/)
  const [first, ...rest] = words
  const longestWord = Math.max(...words.map((w) => w.length))

  const project = featured && projects.find((p) => p.id === featured.project)
  const stages = project ? featured.stages : []

  return (
    <section className={stages.length > 0 ? 'hero' : 'hero hero--solo'} aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__name enter" style={{ '--d': 0, '--name-chars': longestWord }}>
          <span className="hero__line">{first}</span>
          {rest.length > 0 && (
            <>
              {' '}
              <span className="hero__line">{rest.join(' ')}</span>
            </>
          )}
        </h1>
        <p className="dimline label enter" style={{ '--d': 1 }}>
          <span>{profile.school}</span>
          <span className="dimline__rule" aria-hidden="true" />
          <span>{profile.degree}</span>
        </p>
        {profile.builds.length > 0 && (
          <p className="hero__lede enter" style={{ '--d': 2 }}>
            {profile.tagline ? `${profile.tagline}: ` : 'I build '}
            <Builds items={profile.builds} />.
          </p>
        )}
        <div className="btns enter" style={{ '--d': 3 }}>
          <a className="btn btn--ink" href="#projects">View projects <span aria-hidden="true">↓</span></a>
          <a className="btn" href={github.url} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a className="btn" href={`mailto:${email}`}>Email</a>
        </div>
      </div>

      {stages.length > 0 && <HowItWorks project={project} stages={stages} output={featured.output} />}
    </section>
  )
}
