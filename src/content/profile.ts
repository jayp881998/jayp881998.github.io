/* ============================================================================
 * SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every section of this site renders from this file. Edit here and the whole
 * site updates — nav, SEO metadata, sitemap, JSON-LD, command palette, and the
 * generated /work/[slug] case-study pages all derive from these exports.
 *
 * Lines marked  // ‼️ REPLACE  need your input before you publish.
 * Everything else is real content pulled from your profile — verify, don't invent.
 * ==========================================================================*/

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Ordinal proficiency. Deliberately NOT a percentage — see README > Design decisions. */
export type Level = 1 | 2 | 3 | 4;

export const LEVEL_LABEL: Record<Level, string> = {
  4: 'Core',
  3: 'Advanced',
  2: 'Working',
  1: 'Familiar',
};

export type Skill = { name: string; level: Level; note?: string };
export type SkillGroup = { id: string; title: string; blurb: string; skills: Skill[] };

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Role = {
  id: string;
  org: string;
  role: string;
  location: string;
  dates: string;
  current?: boolean;
  /** One line a recruiter can scan in isolation. */
  summary: string;
  highlights: string[];
  stack: string[];
};

export type PipelineStage = {
  label: string;
  detail: string;
  /** Keyed to the icon set in components/ui/Icon.tsx */
  kind: 'source' | 'process' | 'store' | 'model' | 'serve' | 'schedule';
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  period: string;
  featured: boolean;
  /** Shown on the card. One sentence. */
  tagline: string;
  problem: string;
  approach: string[];
  impact: string[];
  stack: string[];
  metrics: Metric[];
  pipeline: PipelineStage[];
  links: { github?: string; demo?: string; writeup?: string };
  /** Screenshots. Drop files in /public/projects/<slug>/ and list them here.
   *  Leave the array empty and the gallery renders a labelled placeholder. */
  gallery: { src: string; caption: string }[];
};

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  url?: string;
};

export type Education = {
  school: string;
  credential: string;
  location: string;
  dates: string;
  result?: string;
  coursework: string[];
};

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const identity = {
  name: 'Jay Panchal',
  /** Shown under the name in the hero. Your positioning in five words or fewer. */
  title: 'BI Developer · Operations & Inventory Analyst',
  location: 'Toronto, ON, Canada',
  email: 'panchaljay0808@gmail.com',
  phone: '+1 (437) 430-5325',

  /** The 10-second answer. Kept to two sentences on purpose. */
  headline: 'I build the SQL-to-Power BI reporting that operations and inventory teams actually run on.',
  subheadline:
    'Mechanical engineer turned BI developer. I own the whole pipeline — API and SQL extraction, warehouse modelling, DAX semantic layers, automated refresh — and I understand the production floor the data is describing.',

  /** Used in About. Third-person-free, no filler. */
  bio: [
    'I started on the production floor. Four years of mechanical engineering and a year training manufacturing clients on SolidWorks meant that when I moved into analytics, I already knew what a stock-out, a scrap rate, or an assembly delay actually costs someone.',
    'Since then I have built reporting end to end: pulling from REST APIs and EAV-model SQL, modelling it into star schemas on SQL Server, layering DAX semantic models on top, and automating the refresh so nobody touches a spreadsheet at month end. At the Michener Institute that replaced roughly twenty hours of manual reporting a week with a forty-five-minute automated cycle.',
    'Today I own inventory and stock-health analytics across 1,000+ SKUs and support a Dynamics 365 migration — which is the same job from the other side: making sure the numbers are right before anyone builds a dashboard on them.',
  ],

  /** Availability line in the contact section. */
  availability: 'Open to BI Developer, Data Analyst, and Operations / Inventory Analyst roles in the Greater Toronto Area or remote across Canada.',

  // ‼️ REPLACE — drop your headshot at this exact path (see README > Assets).
  //    Recommended: 800×800 square, JPG or WebP, under 150 KB.
  //    If the file is missing the site falls back to a monogram automatically.
  headshot: '/jay-panchal.jpg',

  // ‼️ REPLACE — drop your resume PDF at this exact path.
  resume: '/Jay-Panchal-Resume.pdf',

  links: {
    linkedin: 'https://www.linkedin.com/in/jaypanchal0808',
    github: 'https://github.com/jayp881998',
  },

  /** Canonical site URL — used for SEO, Open Graph, sitemap and JSON-LD.
   *  ‼️ REPLACE if you deploy somewhere else (e.g. a Vercel or custom domain). */
  siteUrl: 'https://jayp881998.github.io',
} as const;

// ---------------------------------------------------------------------------
// Proof — the stat row directly under the hero.
// Every value here is verifiable from the work history. Do not add a number
// you cannot defend in an interview.
// ---------------------------------------------------------------------------

export const metrics: Metric[] = [
  {
    value: '20 hrs',
    label: 'Manual reporting removed weekly',
    detail: 'Michener Institute — replaced a hand-built weekly reporting cycle with an automated pipeline.',
  },
  {
    value: '45 min',
    label: 'End-to-end automated refresh',
    detail: 'Zendesk API → SQL Server star schema → Power BI, scheduled on SQL Server Agent.',
  },
  {
    value: '15%',
    label: 'Expired inventory reduced',
    detail: 'MVR Cash & Carry — expiry and shrinkage tracking driving replenishment decisions.',
  },
  {
    value: '1,000+',
    label: 'SKUs under active analysis',
    detail: 'Stock levels, velocity, and vendor performance across 10+ suppliers.',
  },
  {
    value: '100K+',
    label: 'Records modelled in Delta Lake',
    detail: '211 Canada Datathon — 24 datasets, 8 provinces, Bronze-to-Silver PySpark pipeline.',
  },
  {
    value: '4.58',
    label: 'GPA, Dean’s Honour Roll',
    detail: 'Postgraduate Certificate in Data Analytics, Durham College.',
  },
];

/** Short, factual credibility strip under the hero CTAs. */
export const quickFacts = [
  '3+ years in analytics',
  '2 Canadian post-grads, both with honours',
  'Power BI · T-SQL · Python',
  'Toronto, ON',
];

// ---------------------------------------------------------------------------
// What makes the profile different — About section cards.
// ---------------------------------------------------------------------------

export const differentiators: { title: string; body: string; kind: PipelineStage['kind'] }[] = [
  {
    title: 'Production-floor fluency',
    body: 'A mechanical engineering degree and a year supporting manufacturing clients on SolidWorks. I know what the data is describing, not just how it is shaped.',
    kind: 'source',
  },
  {
    title: 'Full-stack BI, not just dashboards',
    body: 'API and SQL extraction, star-schema warehousing, DAX semantic modelling, scheduled refresh, UAT, and documentation — I ship the whole pipeline.',
    kind: 'process',
  },
  {
    title: 'Governance by default',
    body: 'Source-to-target validation, reconciliation logic, anomaly detection, data dictionaries and refresh-SLA runbooks. Reporting people trust enough to act on.',
    kind: 'store',
  },
  {
    title: 'Honours credentials',
    body: 'Two Canadian post-graduate certificates with honours — Data Analytics at Durham (4.58 GPA) and Project Management at Fleming (3.90 GPA).',
    kind: 'serve',
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skillGroups: SkillGroup[] = [
  {
    id: 'bi',
    title: 'BI & Reporting',
    blurb: 'Where most of my day goes.',
    skills: [
      { name: 'Power BI', level: 4, note: '5 production dashboards, RLS, gateway refresh' },
      { name: 'DAX', level: 4, note: 'SLA, backlog aging, cohort and productivity measures' },
      { name: 'Power Query / M', level: 4 },
      { name: 'Excel (advanced, VBA)', level: 4, note: 'Pivots, lookups, Power Query tooling' },
      { name: 'SSRS', level: 3 },
      { name: 'Tableau', level: 2 },
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Data Modelling',
    blurb: 'Star schemas that survive contact with real questions.',
    skills: [
      { name: 'T-SQL', level: 4, note: 'CTEs, window functions, MERGE/UPSERT, stored procedures' },
      { name: 'Star-schema warehousing', level: 4, note: 'Fact/dimension design on SQL Server' },
      { name: 'SQL Server (SSMS)', level: 4 },
      { name: 'Query performance tuning', level: 3 },
      { name: 'Snowflake', level: 2 },
    ],
  },
  {
    id: 'engineering',
    title: 'Data Engineering',
    blurb: 'Getting the data out, reliably, on a schedule.',
    skills: [
      { name: 'REST API integration', level: 4, note: 'Pagination, rate-limit retries, checkpointing' },
      { name: 'JSON → relational transformation', level: 4 },
      { name: 'Python ETL (pandas, requests)', level: 3 },
      { name: 'SQL Server Agent automation', level: 4 },
      { name: 'Databricks / PySpark', level: 2, note: 'National datathon, Bronze-to-Silver' },
      { name: 'Delta Lake', level: 2 },
      { name: 'Azure fundamentals', level: 2 },
    ],
  },
  {
    id: 'governance',
    title: 'Data Quality & Governance',
    blurb: 'The part that decides whether anyone trusts the dashboard.',
    skills: [
      { name: 'Source-to-target validation', level: 4 },
      { name: 'Reconciliation logic', level: 4 },
      { name: 'KPI definition & governance', level: 4, note: 'Standardised across 5 e-commerce brands' },
      { name: 'Data dictionaries & lineage', level: 4 },
      { name: 'Anomaly detection', level: 3 },
      { name: 'Row-level security', level: 3 },
    ],
  },
  {
    id: 'domain',
    title: 'Operations & Inventory',
    blurb: 'The domain I know from both sides.',
    skills: [
      { name: 'Inventory & stock-health analytics', level: 4, note: '1,000+ SKUs' },
      { name: 'Replenishment & purchase planning', level: 4, note: '12+ POs monthly' },
      { name: 'Vendor performance analysis', level: 4, note: '10+ suppliers' },
      { name: 'Supply-chain KPIs', level: 3 },
      { name: 'Production & operations reporting', level: 3 },
    ],
  },
  {
    id: 'systems',
    title: 'ERP & Business Systems',
    blurb: 'Where the data is born.',
    skills: [
      { name: 'Requirements gathering', level: 4 },
      { name: 'Process documentation', level: 4 },
      { name: 'Master-data integrity', level: 3 },
      { name: 'Microsoft Dynamics 365', level: 2, note: 'Migration: mapping, validation, user support' },
    ],
  },
  {
    id: 'stats',
    title: 'Programming & Statistics',
    blurb: 'Enough to answer the question properly.',
    skills: [
      { name: 'Python (pandas, NumPy)', level: 3 },
      { name: 'R', level: 3, note: 'Two graded modelling projects' },
      { name: 'Regression & logistic regression', level: 3 },
      { name: 'Hypothesis testing, ANOVA, chi-square', level: 3 },
      { name: 'Trees, random forest, regularisation', level: 2 },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & Collaboration',
    blurb: 'How the work actually lands.',
    skills: [
      { name: 'UAT coordination & test cases', level: 4, note: 'Requirements → UAT → release' },
      { name: 'Stakeholder communication', level: 4 },
      { name: 'Team supervision', level: 3, note: '3-person operations team' },
      { name: 'Agile / Scrum', level: 3 },
      { name: 'Jira & Confluence', level: 3 },
      { name: 'Git', level: 3 },
    ],
  },
  {
    id: 'cad',
    title: 'Engineering (CAD / PLM)',
    blurb: 'The foundation. Still useful in a manufacturing conversation.',
    skills: [
      { name: 'SolidWorks', level: 4, note: 'Certified Professional & Mechanical Design Expert' },
      { name: 'SolidWorks PDM', level: 3 },
      { name: 'AutoCAD', level: 3 },
      { name: 'Siemens NX / Creo / Catia', level: 2 },
      { name: 'Ansys', level: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experience: Role[] = [
  {
    id: 'mvr',
    org: 'MVR Cash & Carry',
    role: 'Operations & Inventory Analyst',
    location: 'North York, ON',
    dates: 'May 2025 — Present',
    current: true,
    summary:
      'Own inventory and stock-health analytics across 1,000+ SKUs, and support the company’s Dynamics 365 migration.',
    highlights: [
      'Own inventory and stock-health analytics across 1,000+ SKUs — tracking stock levels, expiry, and shrinkage to drive replenishment for 12+ monthly purchase orders. Cut expired inventory by 15%.',
      'Analyse SKU velocity and vendor performance across 10+ suppliers, recommending product removals and order adjustments that improved shelf efficiency and reduced waste.',
      'Rebuilt weekly reporting from raw MS Access and Excel exports into a consistent stock-health view, giving managers current visibility in place of ad-hoc pulls.',
      'Support the Dynamics 365 migration with data mapping, validation, and user support, keeping master data and inventory accurate through the transition.',
      'Supervise a 3-person team across daily operations.',
    ],
    stack: ['SQL', 'Power BI', 'Excel / Power Query', 'MS Access', 'Dynamics 365'],
  },
  {
    id: 'michener',
    org: 'The Michener Institute of Education at UHN',
    role: 'Data Analyst — Systems Integration & Real-Time Analytics',
    location: 'Toronto, ON',
    dates: 'Jul 2024 — Dec 2024',
    summary:
      'Built a Python → SQL Server → Power BI pipeline that replaced ~20 hours a week of manual reporting with a 45-minute automated refresh.',
    highlights: [
      'Built a Python, SQL Server, and Power BI pipeline that replaced approximately 20 hours per week of manual reporting with an automated 45-minute refresh, giving leadership a single source of truth for helpdesk KPIs.',
      'Engineered Python ingestion of the Zendesk API — pagination, rate-limit retries, checkpointing — processing 5+ years of historical and real-time data with deduplication into a governed star-schema warehouse.',
      'Modelled a DAX semantic layer surfacing SLA compliance, backlog aging, first-response and resolution time, reopen rate, and agent productivity across 5 dashboards.',
      'Automated refresh via SQL Server Agent and built data-quality checks, reconciliation, and anomaly detection.',
      'Led requirements through UAT to release with lineage and refresh-SLA documentation, reducing ad-hoc clarification requests by 30%.',
    ],
    stack: ['Python', 'SQL Server', 'T-SQL', 'Power BI', 'DAX', 'SQL Server Agent', 'Zendesk API'],
  },
  {
    id: 'bayport',
    org: 'Group Bayport',
    role: 'Data Analyst — Operations & Automation',
    location: 'Ahmedabad, India',
    dates: 'Aug 2021 — Mar 2023',
    summary:
      'Reporting and KPI standardisation for operations, production, and CX teams across 5 e-commerce brands.',
    highlights: [
      'Sourced and transformed EAV-model SQL data into analysis-ready relational tables and reporting for operations, production, and customer-experience teams across 5 e-commerce brands.',
      'Standardised KPI definitions, join logic, and filter rules across brands, lifting recurring-report accuracy to 95%+ and reducing month-end rework by 20%.',
      'Built Excel and Power Query tools and dashboards that surfaced variance drivers and supported clearer monthly operational reviews.',
      'Automated recurring report delivery with SQL and scheduled jobs, accelerating turnaround and eliminating manual bottlenecks.',
    ],
    stack: ['SQL', 'Excel', 'Power Query', 'Scheduled jobs'],
  },
  {
    id: 'et',
    org: 'Engineering Technique',
    role: 'Application Engineer — SolidWorks VAR',
    location: 'Ahmedabad, India',
    dates: 'Mar 2020 — Mar 2021',
    summary: 'Trained and supported manufacturing clients on SolidWorks, on the production floor.',
    highlights: [
      'Trained and supported manufacturing clients on SolidWorks — assembly design, part modelling, PDM — diagnosing and resolving design and assembly issues on the production floor.',
      'Certified SOLIDWORKS Professional and Mechanical Design Expert; standardised client design workflows and improved assembly accuracy.',
    ],
    stack: ['SolidWorks', 'PDM', 'Technical training'],
  },
  {
    id: 'lt',
    org: 'Larsen & Toubro',
    role: 'Mechanical Engineer — Intern',
    location: 'Surat, India',
    dates: 'Dec 2017 — Jan 2018',
    summary: 'Early mechanical engineering internship in a heavy-engineering environment.',
    highlights: ['Early mechanical-engineering internship within a heavy-engineering environment.'],
    stack: ['Mechanical engineering'],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: 'it-support-analytics-pipeline',
    title: 'IT Support Analytics Pipeline',
    kicker: 'End-to-end BI build',
    period: '2024 — 2025',
    featured: true,
    tagline:
      'Zendesk API to a governed SQL Server star schema to Power BI, refreshing itself every 45 minutes.',
    problem:
      'Helpdesk reporting was assembled by hand every week from Zendesk exports. It took roughly 20 hours, arrived stale, and every team had a slightly different definition of “resolution time” — so leadership argued about the numbers instead of acting on them.',
    approach: [
      'Wrote a Python ingestion layer against the Zendesk REST API handling pagination, rate-limit retries with backoff, and checkpointing so a failed run resumes instead of restarting.',
      'Flattened deeply nested JSON into relational staging tables, then deduplicated against natural keys on load.',
      'Modelled a star schema on SQL Server — ticket fact table with date, agent, requester, group, and status dimensions — sized for 5+ years of history.',
      'Built the DAX semantic layer: SLA compliance, backlog aging buckets, first-response and resolution time, reopen rate, and agent productivity.',
      'Scheduled the whole chain on SQL Server Agent with data-quality checks, source-to-target reconciliation, and anomaly detection on row counts.',
      'Ran requirements through UAT to release, and documented lineage, KPI definitions, and the refresh SLA.',
    ],
    impact: [
      '~20 hours per week of manual reporting eliminated.',
      'Refresh cycle down to 45 minutes, fully unattended.',
      '30% fewer ad-hoc clarification requests once KPI definitions and lineage were documented.',
      'Five dashboards on one governed model — a single source of truth for helpdesk KPIs.',
    ],
    stack: ['Python', 'Zendesk REST API', 'SQL Server', 'T-SQL', 'Star schema', 'Power BI', 'DAX', 'SQL Server Agent'],
    metrics: [
      { value: '20 hrs', label: 'Weekly manual work removed', detail: 'Reporting previously assembled by hand.' },
      { value: '45 min', label: 'Unattended refresh cycle', detail: 'Scheduled on SQL Server Agent.' },
      { value: '5 yrs', label: 'History ingested', detail: 'Backfilled and deduplicated.' },
      { value: '30%', label: 'Fewer clarification requests', detail: 'After lineage and KPI documentation.' },
    ],
    pipeline: [
      { label: 'Zendesk REST API', detail: 'Pagination · rate-limit retries · checkpointing', kind: 'source' },
      { label: 'Python ETL', detail: 'JSON flattening · deduplication · typing', kind: 'process' },
      { label: 'SQL Server staging', detail: 'Raw landing · source-to-target validation', kind: 'store' },
      { label: 'Star schema warehouse', detail: 'Ticket fact + 5 conformed dimensions', kind: 'model' },
      { label: 'Power BI semantic model', detail: 'DAX measures · RLS · 5 dashboards', kind: 'serve' },
      { label: 'SQL Server Agent', detail: '45-minute schedule · anomaly checks', kind: 'schedule' },
    ],
    links: {
      github: 'https://github.com/jayp881998/IT-Support-Analytics-Pipeline',
    },
    // ‼️ REPLACE — add sanitised dashboard screenshots to /public/projects/it-support-analytics-pipeline/
    gallery: [],
  },
  {
    slug: '211-canada-datathon',
    title: '211 Canada National Datathon',
    kicker: 'Data for Good · Databricks',
    period: '2025',
    featured: true,
    tagline:
      'A Bronze-to-Silver Delta Lake pipeline over 100,000+ mental-health service records, for public-health stakeholders.',
    problem:
      '211 Canada holds mental-health service-request data across 24 separate datasets and 8 provinces, in inconsistent shapes. Public-health stakeholders could not ask a national question of it without a week of manual reconciliation first.',
    approach: [
      'Landed all 24 raw datasets into a Bronze layer on Delta Lake, preserving source fidelity.',
      'Built PySpark transformations into a conformed Silver layer — standardising province codes, service taxonomies, and date grains across sources.',
      'Modelled a fact-dimension schema so requests could be sliced by geography, service category, and time on one consistent grain.',
      'Delivered Power BI reporting aimed at non-technical public-health stakeholders rather than analysts.',
    ],
    impact: [
      '100,000+ records unified across 24 datasets and 8 provinces.',
      'National and provincial comparison made possible on a single conformed grain.',
      'Delivered inside a competitive national datathon timebox.',
    ],
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'Power BI', 'Dimensional modelling'],
    metrics: [
      { value: '100K+', label: 'Records processed', detail: 'Mental-health service requests.' },
      { value: '24', label: 'Source datasets unified', detail: 'Inconsistent shapes and taxonomies.' },
      { value: '8', label: 'Provinces covered', detail: 'Conformed to one geography dimension.' },
    ],
    pipeline: [
      { label: '24 raw datasets', detail: '8 provinces · mixed schemas', kind: 'source' },
      { label: 'Bronze layer', detail: 'Delta Lake · source fidelity preserved', kind: 'store' },
      { label: 'PySpark transforms', detail: 'Standardised codes, taxonomies, date grains', kind: 'process' },
      { label: 'Silver fact/dimension', detail: 'One conformed analytical grain', kind: 'model' },
      { label: 'Power BI reports', detail: 'Built for public-health stakeholders', kind: 'serve' },
    ],
    links: {},
    gallery: [],
  },
  {
    slug: 'applied-statistical-modeling',
    title: 'Applied Statistical Modeling',
    kicker: 'R · graded coursework',
    period: '2024',
    featured: false,
    tagline:
      'Regression through to tree ensembles in R, with a customer-churn capstone.',
    problem:
      'A structured progression through supervised modelling in R — chosen to build the judgement of when a simple model is the right answer and when it is not.',
    approach: [
      'Linear and logistic regression with diagnostics and assumption checking.',
      'Discriminant analysis and regularisation (ridge, lasso) for high-dimensional cases.',
      'Decision trees and random forests, compared honestly against the simpler baselines.',
      'Customer-churn capstone tying model selection back to a business decision.',
    ],
    impact: [
      'Graded coursework toward a 4.58 GPA and the Dean’s Honour Roll.',
      'Full R notebooks and write-ups published publicly.',
    ],
    stack: ['R', 'Regression', 'Regularisation', 'Random forest', 'Model evaluation'],
    metrics: [],
    pipeline: [],
    links: { github: 'https://github.com/jayp881998/Applied-Statistical-Modeling' },
    gallery: [],
  },
  {
    slug: 'fundamentals-of-statistical-analysis',
    title: 'Fundamentals of Statistical Analysis',
    kicker: 'R · graded coursework',
    period: '2024',
    featured: false,
    tagline: 'Distributions, hypothesis testing, chi-square, and linear regression on real datasets.',
    problem:
      'The statistical grounding underneath the BI work — knowing whether a difference in a dashboard is a real signal or noise.',
    approach: [
      'Distribution analysis and normality diagnostics (histograms, Q-Q plots).',
      'Hypothesis testing and chi-square tests of independence.',
      'Linear regression applied to a real advertising dataset.',
    ],
    impact: ['Published R notebooks with full working and interpretation.'],
    stack: ['R', 'Hypothesis testing', 'Chi-square', 'Linear regression'],
    metrics: [],
    pipeline: [],
    links: { github: 'https://github.com/jayp881998/Fundamentals-of-Statistical-Analysis' },
    gallery: [],
  },
];

// ---------------------------------------------------------------------------
// Working with AI — a real differentiator, kept factual.
// ---------------------------------------------------------------------------

export const aiPractice = {
  title: 'Working in an AI-enabled environment',
  blurb: 'Engineered into a workflow, not one-off prompting.',
  points: [
    'Built a Claude API pipeline that automates job-application research, JD-to-resume matching, and first-draft generation — an end-to-end workflow, not ad-hoc prompts.',
    'Use Microsoft Copilot and ChatGPT daily to accelerate SQL, DAX, and Python, and to draft documentation, data dictionaries, and report summaries.',
    'Apply a data-governance mindset to AI: validate outputs for accuracy, and keep sensitive data out of public models.',
  ],
};

// ---------------------------------------------------------------------------
// Education & credentials
// ---------------------------------------------------------------------------

export const education: Education[] = [
  {
    school: 'Durham College',
    credential: 'Postgraduate Certificate, Data Analytics',
    location: 'Toronto, ON',
    dates: '2024',
    result: 'GPA 4.58 · Dean’s Honour Roll',
    coursework: [
      'Data warehousing & dimensional modelling',
      'Advanced SQL',
      'Business intelligence & visualisation',
      'Applied statistical modelling (R)',
      'Big data (Databricks, PySpark)',
      'Data governance & quality',
    ],
  },
  {
    school: 'Fleming College',
    credential: 'Postgraduate Certificate, Project Management',
    location: 'Toronto, ON',
    dates: '2023',
    result: 'GPA 3.90 · Dean’s Honours',
    coursework: [
      'PMBOK process groups & knowledge areas',
      'Agile & Scrum delivery',
      'Risk and stakeholder management',
      'Business analysis & requirements',
    ],
  },
  {
    school: 'Indo German Tool Room',
    credential: 'Master Certification, CAD/CAM & Design Engineering',
    location: 'Ahmedabad, India',
    dates: '2019 — 2020',
    result: '85%',
    coursework: ['Advanced CAD/CAM', 'Design engineering', 'Manufacturing processes'],
  },
  {
    school: 'Silveroak College of Engineering',
    credential: 'B.E., Mechanical Engineering',
    location: 'Ahmedabad, India',
    dates: '2015 — 2019',
    coursework: [
      'Manufacturing processes',
      'Thermodynamics & fluid mechanics',
      'Machine design',
      'Industrial engineering & operations',
    ],
  },
];

export const certifications: Credential[] = [
  {
    title: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: '2025',
    detail: 'Lakehouse architecture, Delta Lake, and the Databricks platform.',
  },
  {
    title: 'Certified SOLIDWORKS Mechanical Design Expert (CSWE)',
    issuer: 'Dassault Systèmes',
    date: '2020',
    detail: 'Also holds Professional (CSWP), Weldments, Visualize, and Associate certifications.',
  },
  {
    title: 'Business Analysis Foundations',
    issuer: 'LinkedIn Learning',
    date: '2023',
    detail: 'Requirements elicitation, stakeholder analysis, and documentation.',
  },
  {
    title: 'Learning Jira Software',
    issuer: 'LinkedIn Learning',
    date: '2023',
    detail: 'Agile boards, workflows, and issue management.',
  },
  {
    title: 'PMI Agile Certified Practitioner (PMI-ACP)',
    issuer: 'Project Management Institute',
    date: 'In preparation',
    detail: 'Exam preparation in progress.',
  },
];

// ---------------------------------------------------------------------------
// Navigation — drives the header, the command palette, and the sitemap.
// ---------------------------------------------------------------------------

export const navSections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const seo = {
  title: `${identity.name} — ${identity.title}`,
  description:
    'Jay Panchal is a Toronto-based BI developer and operations & inventory analyst. Power BI, T-SQL, Python, and star-schema warehousing — pipelines that replaced 20 hours of manual reporting a week.',
  keywords: [
    'BI Developer',
    'Business Intelligence Analyst',
    'Data Analyst Toronto',
    'Power BI Developer',
    'Operations Analyst',
    'Inventory Analyst',
    'SQL Server',
    'DAX',
    'Star Schema',
    'Databricks',
    'Jay Panchal',
  ],
};

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
