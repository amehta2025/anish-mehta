import { contact } from '../data/content.js'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section__title">Contact</h2>
      <p className="contact__lead">
        Open to internships, research, and interesting projects. Reach out any time.
      </p>
      <div className="contact">
        {contact.map((item, i) => {
          const external = !item.url.startsWith('mailto:')
          return (
            <a
              key={item.label}
              className={i === 0 ? 'btn btn--primary' : 'btn'}
              href={item.url}
              {...(external && { target: '_blank', rel: 'noreferrer' })}
            >
              {item.label}{external && ' ↗'}
            </a>
          )
        })}
      </div>
    </section>
  )
}
