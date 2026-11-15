import { projects } from '../data/index.js'
import { keepHyphens } from '../lib/format.js'

function Part({ project, edges }) {
  const titleId = `${project.id}-title`
  return (
    <article className={`part${edges}`} id={project.id} aria-labelledby={titleId}>
      <p className="part__kind label dim">{project.kind}</p>
      <h3 id={titleId} className="part__title">{project.title}</h3>
      {project.highlight && <p className="part__award label mark">{project.highlight}</p>}
      <p className="part__blurb">{project.blurb}</p>
      <p className="part__tags">{project.tags.map(keepHyphens).join(', ')}</p>
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
      </div>
      {projects.length === 0 && <p className="empty">No projects listed yet.</p>}
      <div className="parts" style={{ '--cols': cols }} hidden={projects.length === 0}>
        {projects.map((project, i) => (
          <Part
            key={project.id}
            project={project}
            edges={`${i % cols === cols - 1 ? ' part--end-col' : ''}${i >= lastRowStart ? ' part--last-row' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
