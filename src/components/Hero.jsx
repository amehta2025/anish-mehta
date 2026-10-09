import { useEffect, useState } from 'react'
import Snake from '../games/Snake.jsx'

const roles = [
  'full-stack apps',
  'AI tools',
  'research pipelines',
]

// Types a word, pauses, deletes it, moves to the next word, forever.
function useTypewriter(words, speed = 70, pause = 1400) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let delay = deleting ? speed / 2 : speed
    if (!deleting && text === word) delay = pause

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIndex((wordIndex + 1) % words.length)
      } else {
        const nextLength = deleting ? text.length - 1 : text.length + 1
        setText(word.slice(0, nextLength))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

// Writes the cursor position into CSS variables; the CSS draws a glow there.
function handlePointerMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section className="hero" onPointerMove={handlePointerMove}>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="pill">
            <span className="pill__dot" />
            University of Illinois Urbana-Champaign
          </p>

          <h1 className="hero__name">
            <span className="neon">Anish</span>
            <br />
            <span className="gradient-text">Mehta</span>
          </h1>

          <p className="hero__major">Computer Science + Chemistry</p>

          <p className="hero__typed">
            I build <span className="hero__typed-word">{typed}</span>
            <span className="caret" />
          </p>

          <div className="hero__buttons">
            <a className="btn btn--primary" href="#projects">See projects</a>
            <a className="btn" href="https://github.com/amehta2025" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>

        <Snake />
      </div>
    </section>
  )
}