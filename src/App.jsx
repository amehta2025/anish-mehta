import TitleBlock from './components/TitleBlock.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data/index.js'
import DataToggle from './dev/DataToggle.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="sheet" id="top">
        <TitleBlock />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <footer className="foot label dim">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Sheet 1 of 1</span>
        </footer>
      </div>
      {import.meta.env.DEV && <DataToggle />}
    </>
  )
}
