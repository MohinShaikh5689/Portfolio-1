'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CovidDashboard from '@/components/CovidDashboard'

const STATS = [
  { label: 'Datasets',  value: '2',         hint: 'Deaths & Vaccinations' },
  { label: 'Coverage',  value: '200+',       hint: 'Countries and regions' },
  { label: 'Timeline',  value: '2020–2024',  hint: 'Historical range' },
  { label: 'Metrics',   value: '6+',         hint: 'KPIs tracked' },
]

export default function CovidAnalysisPage() {
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

        /* ── Dashboard embed card ── */
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
          width: 100%;
          padding: 1.5rem;
        }

        /* ── Notes grid ── */
        .notes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .note-card {
          background: var(--card-bg);
          border: 1px solid var(--rule);
          border-radius: 1rem;
          padding: 1.75rem;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .note-card:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .note-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0 0 1rem;
        }

        .note-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .note-list li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.55;
          padding-left: 1rem;
          position: relative;
        }

        .note-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 0.7rem;
          top: 0.15em;
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
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .notes-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .page-header { grid-template-columns: 1fr; }
          .header-tag { text-align: left; }
          .section-pill { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="page-root">
        <div className="page-inner">

          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            Portfolio
          </Link>

          <header className="page-header">
            <div>
              <p className="page-eyebrow">SQL Project</p>
              <h1 className="page-title">
                COVID-19<br /><span>Analysis</span>
              </h1>
              <p className="page-subtitle">
                SQL-driven analysis across cases, deaths, and vaccinations — clean joins,
                reliable rate calculations, and consistent trend reporting.
              </p>
            </div>
            <div className="header-tag">
              SQL / Data Analysis<br />
              2020–2024<br />
              200+ Countries
            </div>
          </header>

          {/* Stats */}
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

          {/* Dashboard embed */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">02 —</span>
              <h2 className="section-title">Interactive Dashboard</h2>
              <span className="section-pill">Live Data</span>
            </div>
            <div className="embed-card">
              <div className="embed-meta">
                <span className="embed-label">Dashboard 01</span>
                <p className="embed-desc">Cases, deaths & vaccination trends — India</p>
              </div>
              <div className="embed-frame">
                <CovidDashboard location="India" />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">03 —</span>
              <h2 className="section-title">Notes & Insights</h2>
            </div>
            <div className="notes-grid">
              <div className="note-card">
                <h3 className="note-title">Data Notes</h3>
                <ul className="note-list">
                  <li>Official data sources with standardized reporting.</li>
                  <li>Daily historical coverage through 2024.</li>
                  <li>Focus on reproducible queries and consistent metrics.</li>
                </ul>
              </div>
              <div className="note-card">
                <h3 className="note-title">Insights Focus</h3>
                <ul className="note-list">
                  <li>Trend analysis across time windows.</li>
                  <li>Geographic comparisons by normalized rates.</li>
                  <li>Vaccination impact on mortality rates.</li>
                </ul>
              </div>
            </div>
          </section>

          <footer className="page-footer">
            <span className="footer-left">Full Stack Developer & Data Analyst</span>
            <div className="footer-right">
              {['SQL', 'Next.js', 'React', 'TypeScript'].map((t) => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}