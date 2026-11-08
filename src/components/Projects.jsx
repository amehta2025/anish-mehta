import { Fragment, useRef } from 'react'
import { projects } from '../data/index.js'
import { formatSize, keepHyphens, pad2, plural } from '../lib/format.js'

function Part({ project, index, edges }) {
  const size = useRef(null)
  // Hover or focus reveals a dashed measuring box labelled with the part's real rendered size.
  const measure = (e) => {
    const el = e.currentTarget
    if (size.current) size.current.textContent = formatSize(el.offsetWidth, el.offsetHeight)
  }
  const titleId = `${project.id}-title`

  return (
    <article className={`part${edges}`} id={project.id} aria-labelledby={titleId} onPointerEnter={measure} onFocus={measure}>
      <span className="measure" aria-hidden="true">
        <span className="measure__label label" ref={size} />
      </span>
      <div className="part__id label">
        <span>P-{String(index + 1).padStart(2, '0')}</span>
        <span className="dim">{project.kind}</span>
      </div>
      <h3 id={titleId} className="part__title">{project.title}</h3>
      <p className="part__blurb">{project.blurb}</p>
      <dl className="spec">
        <div>
          <dt>Stack</dt>
          <dd>
            {project.tags.map((tag, i) => (
              <Fragment key={tag}>
                <span className="spec__tag">{keepHyphens(tag)}{i < project.tags.length - 1 && ','}</span>
                {i < project.tags.length - 1 && ' '}
              </Fragment>
            ))}
          </dd>
        </div>
        {project.highlight && (
          <div>
            <dt>Highlight</dt>
            <dd className="mark">{project.highlight}</dd>
          </div>
        )}
      </dl>
      <div className="part__links">
        {project.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> ({project.title}, opens in a new tab)</span>
          </a>
        ))}
      </div>
    </article>
  )
}

// Three across, but never leave a single card stranded on the last row (4 → 2×2, 7 → 2 columns).
function columnsFor(count) {
  if (count <= 3) return Math.max(count, 1)
  return count % 3 === 1 ? 2 : 3
}

export default function Projects() {
  const cols = columnsFor(projects.length)
  const lastRowStart = projects.length - (projects.length % cols || cols)
  return (
    <section id="projects" className="sec" aria-labelledby="projects-title">
      <div className="sec__head">
        <h2 id="projects-title" className="label">Projects</h2>
        <span className="label dim">
          {pad2(projects.length)} {plural(projects.length, 'item')}
          {projects.length > 0 && ' · Hover to measure'}
        </span>
      </div>
      {projects.length === 0 && <p className="empty">No projects listed yet.</p>}
      <div className="parts" style={{ '--cols': cols }} hidden={projects.length === 0}>
        {projects.map((project, i) => (
          <Part
            key={project.id}
            project={project}
            index={i}
            edges={`${i % cols === cols - 1 ? ' part--end-col' : ''}${i >= lastRowStart ? ' part--last-row' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
