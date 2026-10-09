import { experience } from '../data/content.js'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section__title">Experience</h2>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.org} className="timeline__item">
            <span className={job.current ? 'timeline__dot is-current' : 'timeline__dot'} />
            <div className="timeline__head">
              <h3>
                {job.role} <span className="muted">· {job.org}</span>
              </h3>
              <span className="mono">{job.when}</span>
            </div>
            <p className="timeline__summary">{job.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}