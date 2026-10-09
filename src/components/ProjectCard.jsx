export default function ProjectCard({ title, blurb, tags, highlight, links }) {
  return (
    <article className="card">
      {highlight && <span className="card__highlight">{highlight}</span>}
      <h3>{title}</h3>
      <p>{blurb}</p>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="card__links">
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}