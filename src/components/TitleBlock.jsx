import { useEffect, useRef } from 'react'
import { profile } from '../data/index.js'
import { formatCoords } from '../lib/format.js'

const sections = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

// The drawing's title block: who, where, status, a live cursor readout, and navigation.
export default function TitleBlock() {
  const readout = useRef(null)

  // Writes straight to the DOM (once per frame) so moving the mouse never re-renders React.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    let x = 0
    let y = 0
    const paint = () => {
      frame = 0
      if (readout.current) readout.current.textContent = formatCoords(x, y)
    }
    const onMove = (e) => {
      x = e.pageX
      y = e.pageY
      if (!frame) frame = requestAnimationFrame(paint)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="tb">
      <a className="tb__mark" href="#top" aria-label={`${profile.name}, back to top`}>AM</a>
      <div className="tb__cell">
        <span className="label dim">Title</span>
        <span className="tb__value">{profile.name} — {profile.role}</span>
      </div>
      <div className="tb__cell tb__cell--school">
        <span className="label dim">School</span>
        <span className="tb__value">{profile.school} · CS + Chemistry</span>
      </div>
      <div className="tb__cell tb__cell--status">
        <span className="label dim">Status</span>
        <span className="tb__value mark">{profile.status}</span>
      </div>
      <div className="tb__cell tb__cell--cursor" aria-hidden="true">
        <span className="label dim">Cursor</span>
        <span className="tb__value tb__value--mono" ref={readout}>{formatCoords(0, 0)}</span>
      </div>
      <nav className="tb__nav" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.href} href={s.href} className="label">{s.label}</a>
        ))}
      </nav>
    </header>
  )
}
