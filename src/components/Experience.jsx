import { experience } from '../data/index.js'

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-title">
      <div className="sec__head">
        <h2 id="experience-title" className="label">Experience</h2>
      </div>
      {experience.length === 0 && <p className="empty">No roles listed yet.</p>}
      <ol className="log">
        {experience.map((job) => (
          <li key={`${job.org}-${job.when ?? job.role}`} className="log__row">
            <span className="log__when label">
              {job.current && <span className="now" aria-hidden="true" />}
              {job.current && <span className="sr-only">Current: </span>}
              {job.when}
            </span>
            <h3 className="log__role">{job.role}</h3>
            <span className="log__org">{job.org}</span>
            <p className="log__note">{job.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
