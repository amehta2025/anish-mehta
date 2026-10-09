import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'

export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="haze" />
        <span className="scanlines" />
      </div>
      <main>
        <Hero />
        <Experience />
        <Projects />
      </main>
    </>
  )
}