// DEV ONLY — stress-test datasets for the ?data= toggle. Never imported in production
// (see src/data/index.js). Shaped exactly like src/data/content.js.
// These are test values, not portfolio content.

import * as demo from '../data/content.js'

const longEmail = 'mailto:bartholomew.fitzgerald@northwind-industries-holdings.example.com'

export const worst = {
  profile: {
    name: 'Christopher Alexander Montgomery III',
    role: 'Software Engineer & Undergraduate Researcher',
    school: 'UIUC',
    university: 'University of Illinois Urbana-Champaign',
    degree: 'Computer Science + Chemistry, Minor in Statistics',
    status: 'Open to Summer 2027 internships and research positions',
    tagline: 'I build careful, well-tested software for computational science, healthcare, and accessibility',
    builds: ['full-stack apps', 'AI tools', 'research pipelines', 'embedded systems'],
  },
  featured: {
    project: 'protein-ligand-pipeline',
    stages: [
      { name: 'Parameterization', detail: 'Cleans the protein, protonates it at the right pH, and parameterizes every ligand before anything runs on the cluster.' },
      { name: 'Ø', detail: 'x' },
      { name: 'Simulate', detail: 'Short runs on the campus cluster' },
      { name: 'Score', detail: 'Ranks binding stability across hundreds of candidates' },
      { name: 'Benachrichtigungseinstellungen', detail: 'Lets the lab browse and filter results' },
      { name: 'Ship', detail: 'One image' },
    ],
    output: 'A ranked shortlist of candidates for the wet lab to test next week',
  },
  experience: [
    {
      role: 'Senior Product Design Engineer, Platform Infrastructure',
      org: 'InvoGenix',
      when: 'Jun 2026 – Present',
      current: true,
      summary: 'Building software at a medical AI startup. Owns the clinician-facing review tools, the ingestion pipeline for de-identified imaging data, and the internal design system used by four product teams.',
    },
    {
      role: 'Undergraduate Researcher',
      org: 'Department of Chemistry and Biomolecular Engineering, University of Illinois Urbana-Champaign',
      when: 'Feb 2026 – Present',
      current: true,
      summary: 'Computational research on protein interactions in Python.',
    },
    {
      role: 'Course Assistant',
      org: 'Benachrichtigungseinstellungen GmbH',
      when: 'Aug 2025 – Present',
      current: true,
      summary: 'Office hours.',
    },
    {
      role: 'Intern',
      org: 'Đặng Thị Ngọc Hân Lab',
      when: 'Jun – Aug 2024',
      current: false,
      summary: 'Line one\nLine two',
    },
  ],
  projects: [
    {
      id: 'protein-ligand-pipeline',
      title: 'Protein–Ligand Interaction Pipeline for Molecular Dynamics Simulations',
      kind: 'Research · Computational Chemistry',
      blurb: 'An end-to-end pipeline that prepares protein–ligand complexes, runs short molecular dynamics simulations on the campus cluster, and summarizes binding stability so a lab can screen hundreds of candidates a week instead of a handful. Includes a small web dashboard for browsing results.',
      tags: ['Python', 'PyTorch', 'RDKit', 'OpenMM', 'NumPy', 'pandas', 'scikit-learn', 'Docker', 'SLURM', 'PostgreSQL', 'FastAPI', 'customer-feedback-from-enterprise-onboarding'],
      highlight: 'Best Use of AI · HackIllinois 2026 · Grand Prize Finalist',
      links: [
        { label: 'Live', url: 'https://example.com/pipeline' },
        { label: 'Code', url: 'https://example.com/code' },
        { label: 'Paper', url: 'https://example.com/paper' },
        { label: 'Demo video', url: 'https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved' },
      ],
    },
    {
      id: 'jo',
      title: 'Jo',
      kind: 'CLI',
      blurb: 'A tiny CLI.',
      tags: ['Rust'],
      links: [{ label: 'Code', url: 'https://example.com/jo' }],
    },
    {
      id: 'benachrichtigungseinstellungen',
      title: 'Benachrichtigungseinstellungen',
      kind: 'Hardware · Vision',
      blurb: '<script>alert(1)</script> & **bold** should render as literal text.',
      tags: ['Arduino', 'C++'],
      links: [{ label: 'Code', url: 'https://example.com/b' }],
    },
  ],
  contact: [
    { label: 'Email', url: longEmail },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/christopher-alexander-montgomery-iii-uiuc' },
    { label: 'GitHub', url: 'https://github.com/example' },
  ],
  contactLead: {
    headline: 'Open to Summer 2027 software engineering internships, computational research roles, and interesting open-source projects.',
    note: 'Reach out any time — I usually reply within a day or two, though during finals week it may take a little longer.',
  },
}

export const one = {
  ...demo,
  profile: { ...demo.profile, builds: ['full-stack apps'] },
  experience: [{ ...demo.experience[2] }], // a single past (not current) role
  projects: [{ ...demo.projects[0] }], // a single project, no highlight
}

export const empty = {
  ...demo,
  profile: { ...demo.profile, tagline: undefined, builds: [] },
  featured: null,
  experience: [],
  projects: [],
}

// Realistic upper bound for a student portfolio a few years on: 9 projects, 7 roles,
// including two roles at the same organization.
export const many = {
  ...demo,
  experience: [
    ...demo.experience,
    { role: 'Software Engineer Intern', org: 'InvoGenix', when: 'Jan – May 2026', current: false, summary: 'Part-time before joining full time.' },
    { role: 'Course Assistant', org: 'CS 124, UIUC', when: 'Aug – Dec 2025', current: false, summary: 'Office hours and grading.' },
    { role: 'Volunteer Tutor', org: 'Local library', when: '2023 – 2024', current: false, summary: 'Weekly coding club.' },
    { role: 'Research Assistant', org: 'Summer program', when: 'Jun – Jul 2023', current: false, summary: 'Data cleaning in Python.' },
  ],
  projects: Array.from({ length: 9 }, (_, i) => ({
    ...demo.projects[i % 3],
    id: `${demo.projects[i % 3].id}-${i}`,
  })),
}

export const fixtures = { worst, one, empty, many }
