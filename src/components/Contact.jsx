import { contact } from '../data/content.js'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section__title">Contact</h2>
      <p className="contact__lead">
        Open to internships, research, and interesting projects. Reach out any time.
      </p>
      <ul className="contact">
        {contact.map((item) => {
          const external = !item.url.startsWith('mailto:')
          return (
            <li key={item.label}>
              <a
                className="contact__link"
                href={item.url}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
              >
                <span className="mono">{item.label}</span>
                <span className="contact__handle">{item.handle}</span>
                <span className="contact__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
