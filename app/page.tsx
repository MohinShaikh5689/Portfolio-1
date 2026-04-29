'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BarChart3, Code2, Database, Layers, Smartphone, TrendingUp } from 'lucide-react'

export default function Home() {
  const [activeStack, setActiveStack] = useState('All')
  const [openProject, setOpenProject] = useState<number | null>(1)

  const stackItems = useMemo(
    () => [
      { id: 1, label: 'Prisma', group: 'Backend' },
      { id: 2, label: 'React', group: 'Frontend' },
      { id: 3, label: 'React Native', group: 'Mobile' },
      { id: 4, label: 'Express', group: 'Backend' },
      { id: 5, label: 'Fastify', group: 'Backend' },
      { id: 6, label: 'Next.js', group: 'Frontend' },
      { id: 7, label: 'TypeScript', group: 'Language' },
      { id: 8, label: 'Git', group: 'Workflow' },
      { id: 9, label: 'GitHub', group: 'Workflow' },
      { id: 10, label: 'SQL', group: 'Analysis' },
      { id: 11, label: 'Tableau', group: 'Analysis' },
      { id: 12, label: 'PowerBI', group: 'Analysis' },
    ],
    []
  )

  const projects = [
    {
      id: 1,
      title: 'COVID-19 Data Analysis',
      summary: 'Trend analysis, country comparisons, and vaccination metrics.',
      details:
        'Optimized SQL for time-series data, clean joins, and reliable rate calculations. Focused on correctness and clear data narratives.',
      icon: BarChart3,
      tags: ['SQL', 'Postgres', 'Analytics'],
      link: '/projects/covid-analysis',
      num: '01',
    },
    {
      id: 2,
      title: 'Nashville Housing Data Cleaning',
      summary: 'Step-by-step cleaning with transformation previews.',
      details:
        'Handled NULLs, standardization, and deduping via read-only queries. Documented transformations for clarity and reuse.',
      icon: Database,
      tags: ['Data Cleaning', 'Quality', 'Documentation'],
      link: '/projects/housing-cleaning',
      num: '02',
    },
    {
      id: 3,
      title: 'Data Integration Pipeline',
      summary: 'ETL flow from Excel to queryable tables.',
      details:
        'Focused on schema alignment, safe parsing, and ingestion checks for reliable downstream analytics.',
      icon: Layers,
      tags: ['ETL', 'Pipelines', 'Validation'],
      link: '/projects/data-pipeline',
      num: '03',
    },
    {
      id: 4,
      title: 'Anime Data Analysis',
      summary: 'Interactive Tableau dashboards analyzing anime trends and popularity.',
      details:
        'Built comprehensive visualizations showcasing top-ranked anime, audience preferences, and viewership patterns using Tableau Public.',
      icon: BarChart3,
      tags: ['Tableau', 'Data Viz', 'Analysis'],
      link: '/dashboards',
      num: '04',
    },
    {
      id: 5,
      title: 'AirBNB Market Analysis',
      summary: 'Market insights and pricing trends across regions.',
      details:
        'Interactive Tableau dashboards revealing booking patterns, pricing dynamics, and market opportunities in the short-term rental space.',
      icon: TrendingUp,
      tags: ['Tableau', 'Market Data', 'Insights'],
      link: '/dashboards',
      num: '05',
    },
  ]

  const stackGroups = ['All', 'Frontend', 'Backend', 'Mobile', 'Language', 'Workflow', 'Analysis']
  const filteredStack =
    activeStack === 'All' ? stackItems : stackItems.filter((item) => item.group === activeStack)

  const capabilities = [
    {
      title: 'Full Stack Delivery',
      description: 'From database schema to UI, I ship end-to-end features with reliable performance.',
      icon: Code2,
      accent: '#d4622a',
    },
    {
      title: 'Data Analysis',
      description: 'SQL expertise with Tableau & PowerBI to uncover insights and drive decisions.',
      icon: TrendingUp,
      accent: '#2a6dd4',
    },
    {
      title: 'Mobile Ready',
      description: 'React Native builds that stay aligned with web workflows and shared logic.',
      icon: Smartphone,
      accent: '#2aa87e',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --ink: #0e0e0f;
          --paper: #f5f3ef;
          --muted: #9a958d;
          --accent: #d4622a;
          --accent2: #2a6dd4;
          --accent3: #2aa87e;
          --rule: #dedad3;
          --card-bg: #ffffff;
        }

        * { box-sizing: border-box; }

        .pr {
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .pr::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 10% 15%, rgba(212,98,42,0.07) 0%, transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(42,109,212,0.05) 0%, transparent 45%),
            radial-gradient(circle at 60% 40%, rgba(42,168,126,0.03) 0%, transparent 35%);
          pointer-events: none;
          z-index: 0;
        }

        .pr-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        /* ── HERO ── */
        .hero {
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: end;
        }
        @media (max-width: 700px) { .hero { grid-template-columns: 1fr; gap: 2rem; } }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 0.93;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin: 0 0 1.25rem;
        }

        .hero-name em {
          font-style: normal;
          color: var(--accent);
        }

        .hero-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: var(--muted);
          letter-spacing: 0.01em;
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-bio {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #4a4540;
          border-left: 2px solid var(--accent);
          padding-left: 1.25rem;
        }

        .hero-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .btn-primary {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--ink);
          color: var(--paper);
          border: none;
          border-radius: 999px;
          padding: 0.6rem 1.25rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

        .btn-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--muted);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 0.55rem 1rem;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          background: transparent;
          cursor: pointer;
        }
        .btn-ghost:hover { border-color: var(--ink); color: var(--ink); }

        /* ── SECTION CHROME ── */
        .section {
          padding: 4rem 0;
          border-bottom: 1px solid var(--rule);
        }

        .section-head {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .section-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted);
          flex-shrink: 0;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0;
          flex: 1;
        }

        .section-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--muted);
          font-style: italic;
          flex-shrink: 0;
        }

        /* ── CAPABILITIES ── */
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 700px) { .cap-grid { grid-template-columns: 1fr; } }

        .cap-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .cap-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .cap-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--cap-accent);
        }

        .cap-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background: color-mix(in srgb, var(--cap-accent) 12%, transparent);
          color: var(--cap-accent);
        }

        .cap-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 0.5rem;
        }

        .cap-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--muted);
          margin: 0;
        }

        /* ── PROJECTS ── */
        .proj-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          border-radius: 999px;
          padding: 0.4rem 0.9rem;
          border: 1px solid var(--rule);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.18s;
        }
        .filter-btn:hover { border-color: var(--ink); color: var(--ink); }
        .filter-btn.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }

        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) { .proj-grid { grid-template-columns: 1fr; } }

        .proj-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          padding: 1.5rem;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.22s;
          position: relative;
          overflow: hidden;
        }
        .proj-card.open {
          border-color: var(--accent);
          box-shadow: 0 4px 24px rgba(212,98,42,0.1);
        }
        .proj-card:hover:not(.open) {
          border-color: #c5c0b8;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .proj-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .proj-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .proj-icon {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.55rem;
          background: #f0ede8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          flex-shrink: 0;
        }

        .proj-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }

        .proj-summary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--muted);
          margin: 0 0 0.75rem;
        }

        .proj-details {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          line-height: 1.7;
          color: #6b6560;
          margin: 0 0 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--rule);
          font-style: italic;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .proj-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: var(--muted);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 0.2rem 0.6rem;
        }

        .proj-link {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.18s;
        }
        .proj-link:hover { gap: 0.5rem; }

        /* ── STACK ── */
        .stack-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 0.75rem;
        }

        .stack-item {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.18s, transform 0.18s;
        }
        .stack-item:hover {
          border-color: #c5c0b8;
          transform: translateY(-1px);
        }

        .stack-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--ink);
          font-weight: 500;
        }

        .stack-group {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          color: var(--muted);
          font-style: italic;
        }

        /* ── FOOTER ── */
        .pr-footer {
          padding: 2.5rem 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .footer-built {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .footer-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: var(--muted);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 0.2rem 0.6rem;
        }
      `}</style>

      <div className="pr">
        <div className="pr-inner">

          {/* ── HERO ── */}
          <header className="hero">
            <div>
              <p className="hero-eyebrow">Portfolio · 2026</p>
              <h1 className="hero-name">
                Mohin<br /><em>Shaikh</em>
              </h1>
              <p className="hero-role">Full Stack Developer &amp; Data Analyst</p>
            </div>
            <div className="hero-right">
              <p className="hero-bio">
                I build modern web and mobile products with clean architecture, fast APIs, and practical UX.
                Also a data analyst turning SQL, Tableau, and PowerBI data into actionable insights.
              </p>
              <div className="hero-links">
                <Link href="/dashboards" className="btn-primary">
                  View Dashboards →
                </Link>
                <Link href="/projects/covid-analysis" className="btn-ghost">
                  COVID Analysis
                </Link>
                <Link href="/projects/housing-cleaning" className="btn-ghost">
                  Housing Cleaning
                </Link>
                <Link href="/projects/data-pipeline" className="btn-ghost">
                  Data Pipeline
                </Link>
              </div>
            </div>
          </header>

          {/* ── CAPABILITIES ── */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">01 —</span>
              <h2 className="section-title">What I Do</h2>
              <span className="section-sub">Core capabilities</span>
            </div>
            <div className="cap-grid">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="cap-card"
                  style={{ '--cap-accent': cap.accent } as React.CSSProperties}
                >
                  <div className="cap-icon">
                    <cap.icon size={18} />
                  </div>
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-desc">{cap.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">02 —</span>
              <h2 className="section-title">Project Highlights</h2>
              <span className="section-sub">Click to expand</span>
            </div>
            <div className="proj-filters">
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`filter-btn ${openProject === p.id ? 'active' : ''}`}
                  onClick={() => setOpenProject(p.id)}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div className="proj-grid">
              {projects.map((project) => {
                const Icon = project.icon
                const isOpen = openProject === project.id
                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`proj-card ${isOpen ? 'open' : ''}`}
                    onClick={() => setOpenProject(project.id)}
                  >
                    <div className="proj-top">
                      <span className="proj-num">{project.num}</span>
                      <div className="proj-icon"><Icon size={16} /></div>
                    </div>
                    <h3 className="proj-title">{project.title}</h3>
                    <p className="proj-summary">{project.summary}</p>
                    {isOpen && (
                      <p className="proj-details">{project.details}</p>
                    )}
                    <div className="proj-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="proj-tag">{tag}</span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      className="proj-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open project →
                    </Link>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── STACK ── */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">03 —</span>
              <h2 className="section-title">Tech Stack</h2>
              <span className="section-sub">Filter by category</span>
            </div>
            <div className="stack-filters">
              {stackGroups.map((group) => (
                <button
                  key={group}
                  type="button"
                  className={`filter-btn ${activeStack === group ? 'active' : ''}`}
                  onClick={() => setActiveStack(group)}
                >
                  {group}
                </button>
              ))}
            </div>
            <div className="stack-grid">
              {filteredStack.map((item) => (
                <div key={item.id} className="stack-item">
                  <span className="stack-label">{item.label}</span>
                  <span className="stack-group">{item.group}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">04 —</span>
              <h2 className="section-title">Get in Touch</h2>
              <span className="section-sub">Let's work together</span>
            </div>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--rule)',
              borderRadius: '1rem',
              padding: '2.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                lineHeight: '1.75',
                color: '#4a4540',
                margin: 0,
                maxWidth: '500px'
              }}>
                Interested in collaborating? Have questions about my work? I'd love to hear from you.
              </p>
              <a
                href="mailto:mohin.shaikh5689@gmail.com"
                className="btn-primary"
                style={{ display: 'inline-block' }}
              >
                Email Me
              </a>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: 'var(--muted)',
                margin: 0
              }}>
                mohin.shaikh5689@gmail.com
              </p>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pr-footer">
            <span className="footer-name">Mohin Shaikh · Available 2026</span>
            <div className="footer-built">
              {['Next.js', 'React', 'Tableau', 'TypeScript'].map((t) => (
                <span key={t} className="footer-chip">{t}</span>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}