import { projects } from '../data/content.js'
import ProjectCard from './ProjectCard.jsx'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section__title">Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}