export const profile = {
  name: 'Anish Mehta',
  role: 'Software Engineer',
  school: 'UIUC',
  university: 'University of Illinois Urbana-Champaign',
  degree: 'Computer Science + Chemistry',
  status: 'Open to internships',
  // Hero sentence: "<tagline>: <builds>." Without a tagline it reads "I build <builds>."
  tagline: 'I build software for science and health',
  builds: ['research pipelines', 'AI tools', 'full-stack apps'],
}

// The hero drawing: one project, a part per step, top to bottom.
// `project` is a project id below. `name` goes inside the drawn part, so keep it to a word.
export const featured = {
  project: 'trajectorygpt',
  stages: [
    { name: 'Ask', detail: 'A question about a simulation or a paper' },
    { name: 'Plan', detail: 'AI plans the analysis' },
    { name: 'Run', detail: 'Real code does the math' },
    { name: 'Check', detail: 'A second pass checks the answer' },
  ],
  output: 'A checked report',
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
    role: 'Software Developer',
    org: 'National Organization for Business and Engineering (NOBE), UIUC',
    when: 'Sep 2026 – Present',
    current: true,
    summary: 'Built the admin dashboard and placement engine for a school lottery system.',
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
    blurb: 'Answers questions about molecular simulations by running the real analysis, then checking it.',
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
}
