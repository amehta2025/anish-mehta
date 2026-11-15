import { profile } from '../data/index.js'

const sections = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

// Top bar: mark, availability, navigation. The name and school are right below in the hero.
export default function TitleBlock() {
  return (
    <header className="tb">
      <a className="tb__mark" href="#top" aria-label={`${profile.name}, back to top`}>AM</a>
      <p className="tb__cell tb__value">
        <span className="now" aria-hidden="true" />
        {profile.status}
      </p>
      <nav className="tb__nav" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.href} href={s.href} className="label">{s.label}</a>
        ))}
      </nav>
    </header>
  )
}
