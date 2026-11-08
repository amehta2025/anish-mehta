export const profile = {
  name: 'Anish Mehta',
  role: 'Software Engineer',
  school: 'UIUC',
  university: 'University of Illinois Urbana-Champaign',
  degree: 'Computer Science + Chemistry',
  status: 'Open to internships',
  builds: ['full-stack apps', 'AI tools', 'research pipelines'],
}

export const experience = [
  {
    role: 'Software Engineer',
    org: 'InvoGenix',
    when: 'Jun 2026 – Present',
    current: true,
    summary: 'Building software at a medical AI startup.',
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Pogorelov Lab, UIUC',
    when: 'Feb 2026 – Present',
    current: true,
    summary: 'Computational research on protein interactions in Python.',
  },
  {
    // TODO: confirm exact title and add `when` (e.g. 'Sep 2025 – Present'); dates aren't listed yet.
    role: 'Developer',
    org: 'NOBE UIUC',
    current: false,
    summary: 'Developed full-stack features for an elementary school after-school lottery system, including an admin settings dashboard, CSV student import and validation workflows, and a Java-based lottery placement engine.',
  },
  {
    role: 'Software Developer Intern',
    org: 'Angaza Technology Literacy Center',
    when: 'Jun – Aug 2024',
    current: false,
    summary: 'Built a React web app for a tech-education nonprofit.',
  },
]

export const projects = [
  {
    id: 'trajectorygpt',
    title: 'TrajectoryGPT',
    kind: 'Full-stack · Scientific AI',
    blurb: 'Turns questions about molecular simulations and figures from scientific publications into executable investigations: a model plans the analysis, MDAnalysis and NumPy/SciPy do the calculations, and a separate verifier checks the report.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MDAnalysis', 'NumPy', 'SciPy', 'Modal'],
    links: [
      { label: 'Live', url: 'https://trajectorygpt.vercel.app' },
      { label: 'Code', url: 'https://github.com/amehta2025/TrajectoryGPT' },
      { label: 'Video', url: 'https://www.youtube.com/watch?v=c2QmRRSUpR4' },
    ],
  },
  {
    id: 'hospitalflow-ai',
    title: 'HospitalFlow AI',
    kind: 'Full-stack · ML',
    blurb: 'Real-time hospital operations dashboard with ML risk predictions.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'scikit-learn'],
    links: [
      { label: 'Live', url: 'https://hospital-flow-ai-six.vercel.app' },
      { label: 'Code', url: 'https://github.com/amehta2025/hospitalFlow-AI' },
    ],
  },
  {
    id: 'linkcare',
    title: 'LinkCare',
    kind: 'Full-stack · AI search',
    blurb: 'Connects patients with peers and doctors using AI search.',
    tags: ['Next.js', 'FastAPI', 'Vector DB', 'Gemini'],
    highlight: 'HackIllinois 2026 · 3rd place',
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/linkcare-2fj4ya' },
      { label: 'Code', url: 'https://github.com/prabas007/patient-hub' },
    ],
  },
  {
    id: 'visionswim',
    title: 'VisionSwim 2.0',
    kind: 'Hardware · Vision',
    blurb: 'Swim lane detection device that alerts swimmers with vision loss when they drift off course.',
    tags: ['Arduino', 'C++', 'Computer Vision', 'Pixy'],
    links: [
      { label: 'Code', url: 'https://github.com/aayyah3/VisionSwim2.0' },
    ],
  },
]

export const contact = [
  { label: 'Email', url: 'mailto:amehta2025@gmail.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/anish-mehta-uiuc' },
  { label: 'GitHub', url: 'https://github.com/amehta2025' },
]

export const contactLead = {
  headline: 'Open to internships, research, and interesting projects.',
  note: 'Reach out any time.',
}
