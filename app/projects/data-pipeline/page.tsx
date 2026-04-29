'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const STATS = [
  { label: 'Sources',   value: '3',       hint: 'Excel files' },
  { label: 'Records',   value: '150K+',   hint: 'Integrated rows' },
  { label: 'Database',  value: 'Supabase', hint: 'PostgreSQL backend' },
  { label: 'API',       value: 'REST',    hint: 'Next.js routes' },
]

const SCHEMA_SQL = `CREATE TABLE covid_deaths (
  id SERIAL PRIMARY KEY,
  location VARCHAR(100),
  date DATE,
  total_cases BIGINT,
  total_deaths BIGINT,
  population BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE covid_vaccinations (
  id SERIAL PRIMARY KEY,
  location VARCHAR(100),
  date DATE,
  people_vaccinated BIGINT,
  people_fully_vaccinated BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nashville_housing (
  unique_id SERIAL PRIMARY KEY,
  parcel_id VARCHAR(50),
  property_address VARCHAR(255),
  sale_date DATE,
  sale_price BIGINT,
  property_street_address VARCHAR(255),
  property_city VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);`

const GET_ENDPOINT = `Query Parameters:
?table=covid_deaths
?type=covid&location=India
?limit=100`

const POST_ENDPOINT = `{
  "query": "SELECT * FROM covid_deaths WHERE location = 'India' LIMIT 10"
}`

const TECH_STACK = [
  {
    group: 'Frontend',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    group: 'Backend',
    items: ['Supabase Postgres', 'Supabase Client', 'Next.js API Routes'],
  },
  {
    group: 'Data Processing',
    items: ['XLSX Parser', 'Validation Checks', 'SQL Transformations'],
  },
  {
    group: 'Deployment',
    items: ['Vercel', 'Supabase Cloud', 'Environment Variables'],
  },
]

const DATA_FLOW = ['Excel Files', 'Transform', 'Supabase', 'API Routes', 'Frontend', 'User Views']

export default function DataPipelinePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --ink:      #0e0e0f;
          --paper:    #f5f3ef;
          --muted:    #9a958d;
          --accent:   #d4622a;
          --accent2:  #2a6dd4;
          --rule:     #dedad3;
          --card-bg:  #ffffff;
        }

        .page-root {
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .page-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 20%, rgba(212,98,42,0.06) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(42,109,212,0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .page-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── Back link ── */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 2.5rem 0 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--ink); }

        /* ── Page header ── */
        .page-header {
          padding: 4rem 0 5rem;
          border-bottom: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 2rem;
        }

        .page-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin: 0;
        }
        .page-title span { color: var(--accent); }

        .page-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: var(--muted);
          margin: 1.25rem 0 0;
          max-width: 52ch;
          line-height: 1.65;
          font-weight: 300;
        }

        .header-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--muted);
          text-align: right;
          line-height: 1.6;
        }

        /* ── Sections ── */
        .section {
          padding: 5rem 0;
          border-bottom: 1px solid var(--rule);
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .section-number {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0;
        }

        .section-pill {
          margin-left: auto;
          background: var(--ink);
          color: var(--paper);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0.5rem 0 0.25rem;
          line-height: 1;
        }

        .stat-hint {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--muted);
        }

        /* ── Embed card ── */
        .embed-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .embed-card:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .embed-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.875rem 1.5rem;
          border-bottom: 1px solid var(--rule);
          background: #fafaf8;
        }

        .embed-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .embed-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--ink);
          margin: 0;
          font-weight: 400;
        }

        .embed-frame {
          padding: 1.5rem;
        }

        /* ── Architecture steps ── */
        .arch-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.25rem 1.5rem;
          align-items: start;
        }

        .arch-step-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent);
          padding-top: 0.1rem;
        }

        .arch-step-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0 0 0.5rem;
        }

        .arch-step-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
          margin: 0 0 0.75rem;
          font-weight: 300;
        }

        .source-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .source-list li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .source-list li::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* ── Code block ── */
        .code-block {
          background: #0e0e0f;
          color: #e8e4dc;
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.75rem;
          line-height: 1.75;
          overflow-x: auto;
          margin: 0.75rem 0 0;
          border: 1px solid rgba(255,255,255,0.05);
        }

        /* ── Tech stack grid ── */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .tech-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .tech-card:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }

        .tech-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 0.75rem;
        }

        .tech-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.2rem 0;
        }

        .tech-item::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent2);
          flex-shrink: 0;
        }

        /* ── API card ── */
        .api-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .api-block-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0 0 0.35rem;
        }

        .api-block-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--muted);
          margin: 0;
          font-weight: 300;
        }

        /* ── Data flow chips ── */
        .flow-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
        }

        .flow-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--ink);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          background: var(--card-bg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: background 0.2s, color 0.2s;
        }
        .flow-chip:hover {
          background: var(--ink);
          color: var(--paper);
        }

        .flow-arrow {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          color: var(--accent);
          font-weight: 700;
        }

        /* ── Divider ── */
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .arch-divider {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 1.5rem 0 0;
        }

        /* ── Footer ── */
        .page-footer {
          padding: 2.5rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-left {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .footer-right {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .footer-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: var(--muted);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 0.2rem 0.65rem;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .tech-grid  { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .page-header { grid-template-columns: 1fr; }
          .header-tag  { text-align: left; }
          .section-pill { display: none; }
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page-root">
        <div className="page-inner">

          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            Portfolio
          </Link>

          {/* ── Header ── */}
          <header className="page-header">
            <div>
              <p className="page-eyebrow">SQL Project</p>
              <h1 className="page-title">
                Data<br /><span>Pipeline</span>
              </h1>
              <p className="page-subtitle">
                ETL workflow that unifies Excel sources into Supabase. Emphasis on validation,
                clean schema design, and query-ready tables.
              </p>
            </div>
            <div className="header-tag">
              ETL / Integration<br />
              150K+ Records<br />
              3 Data Sources
            </div>
          </header>

          {/* ── Stats ── */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">01 —</span>
              <h2 className="section-title">At a Glance</h2>
              <span className="section-pill">4 Metrics</span>
            </div>
            <div className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-card">
                  <p className="stat-label">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-hint">{s.hint}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Pipeline Architecture ── */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">02 —</span>
              <h2 className="section-title">Pipeline Architecture</h2>
              <span className="section-pill">ETL</span>
            </div>

            <div className="steps-list">
              {/* Extract */}
              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Phase 01</span>
                  <p className="embed-desc">Extract — Source Data</p>
                </div>
                <div className="embed-frame">
                  <div className="arch-step">
                    <span className="arch-step-num">E</span>
                    <div>
                      <h3 className="arch-step-title">Raw Excel Datasets</h3>
                      <p className="arch-step-body">
                        Three Excel sources covering COVID deaths, vaccinations, and Nashville housing transactions are ingested as the starting point of the pipeline.
                      </p>
                      <ul className="source-list">
                        <li>CovidDeaths.xlsx — 56,000+ rows</li>
                        <li>CovidVaccinations.xlsx — 50,000+ rows</li>
                        <li>Nashville Housing Data — 56,477 rows</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transform */}
              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Phase 02</span>
                  <p className="embed-desc">Transform — Validate &amp; Normalize</p>
                </div>
                <div className="embed-frame">
                  <div className="arch-step">
                    <span className="arch-step-num">T</span>
                    <div>
                      <h3 className="arch-step-title">Data Transformations</h3>
                      <p className="arch-step-body">
                        Normalize types, handle NULL values, remove duplicates, and apply validation checks before loading.
                      </p>
                      <ul className="source-list">
                        <li>Type normalization (dates, numerics)</li>
                        <li>NULL handling via COALESCE</li>
                        <li>Duplicate detection with ROW_NUMBER()</li>
                        <li>Address component splitting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load */}
              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Phase 03</span>
                  <p className="embed-desc">Load — Supabase Schema</p>
                </div>
                <div className="embed-frame">
                  <div className="arch-step">
                    <span className="arch-step-num">L</span>
                    <div>
                      <h3 className="arch-step-title">Indexed Tables</h3>
                      <p className="arch-step-body">
                        Insert into Supabase with indexed tables designed for query performance.
                      </p>
                      <pre className="code-block">{SCHEMA_SQL}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tech Stack ── */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">03 —</span>
              <h2 className="section-title">Technology Stack</h2>
              <span className="section-pill">4 Layers</span>
            </div>
            <div className="tech-grid">
              {TECH_STACK.map((group) => (
                <div key={group.group} className="tech-card">
                  <p className="tech-card-title">{group.group}</p>
                  {group.items.map((item) => (
                    <p key={item} className="tech-item">{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ── API Endpoints ── */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">04 —</span>
              <h2 className="section-title">API Endpoints</h2>
              <span className="section-pill">2 Routes</span>
            </div>
            <div className="steps-list">

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Endpoint 01</span>
                  <p className="embed-desc">GET /api/data</p>
                </div>
                <div className="embed-frame">
                  <div className="api-section">
                    <div>
                      <p className="api-block-title">Fetch table data with optional filters</p>
                      <p className="api-block-desc">
                        Retrieve rows from any registered table. Supports filtering by type, location, and row limit.
                      </p>
                    </div>
                    <pre className="code-block">{GET_ENDPOINT}</pre>
                  </div>
                </div>
              </div>

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Endpoint 02</span>
                  <p className="embed-desc">POST /api/query</p>
                </div>
                <div className="embed-frame">
                  <div className="api-section">
                    <div>
                      <p className="api-block-title">Execute custom SELECT queries</p>
                      <p className="api-block-desc">
                        Send arbitrary read-only SQL via POST body. Restricted to SELECT statements for safety.
                      </p>
                    </div>
                    <pre className="code-block">{POST_ENDPOINT}</pre>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── Data Flow ── */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">05 —</span>
              <h2 className="section-title">Data Flow</h2>
              <span className="section-pill">End-to-End</span>
            </div>
            <div className="embed-card">
              <div className="embed-frame">
                <div className="flow-wrap">
                  {DATA_FLOW.map((step, i) => (
                    <>
                      <span key={step} className="flow-chip">{step}</span>
                      {i < DATA_FLOW.length - 1 && (
                        <span key={`arrow-${i}`} className="flow-arrow">→</span>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="page-footer">
            <span className="footer-left">Full Stack Developer &amp; Data Analyst</span>
            <div className="footer-right">
              {['SQL', 'PostgreSQL', 'Next.js', 'TypeScript', 'Supabase'].map((t) => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}