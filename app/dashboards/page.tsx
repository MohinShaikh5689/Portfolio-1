'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

const TABLEAU_EMBEDS = [
  {
    id: 'viz1777477787370',
    name: 'Anime-Dashboard-1/Dashboard1',
    staticImg: 'An/Anime-Dashboard-1/Dashboard1',
    mobileHeight: '1677px',
    label: 'Dashboard 01',
    description: 'Anime Popularity & Ratings Insights',
  },
  {
    id: 'viz1777477843339',
    name: 'Anime-Dashboard-2/Dashboard2',
    staticImg: 'An/Anime-Dashboard-2/Dashboard2',
    mobileHeight: '1477px',
    label: 'Dashboard 02',
    description: 'Anime Favorites & Audience Preference Insights',
  },
  {
    id: 'viz1777477958267',
    name: 'Anime-Dashboard-3/Dashboard3',
    staticImg: 'An/Anime-Dashboard-3/Dashboard3',
    mobileHeight: '1027px',
    label: 'Dashboard 03',
    description: 'Anime Studios, Ratings & Audience Analytics',
  },
]

const AIRBNB_EMBEDS = [
  {
    id: 'viz1777478288747',
    name: 'AirBNB-Dashboard-1/Dashboard1',
    staticImg: 'Ai/AirBNB-Dashboard-1/Dashboard1',
    mobileHeight: '1627px',
    label: 'Dashboard 01',
    description: 'Airbnb Revenue & Property Insights',
  },
  {
    id: 'viz1777478526344',
    name: 'AirBNB-Dashboard-2/Dashboard2',
    staticImg: 'Ai/AirBNB-Dashboard-2/Dashboard2',
    mobileHeight: '1127px',
    label: 'Dashboard 02',
    description: 'Airbnb Pricing & Listing Insights',
  },
]

function TableauEmbed({
  id,
  name,
  staticImg,
  mobileHeight,
  label,
  description,
}: {
  id: string
  name: string
  staticImg: string
  mobileHeight: string
  label: string
  description: string
}) {
  return (
    <div className="embed-card">
      <div className="embed-meta">
        <span className="embed-label">{label}</span>
        <p className="embed-desc">{description}</p>
      </div>
      <div className="embed-frame">
        <div
          className="tableauPlaceholder w-full"
          id={id}
          style={{ position: 'relative' }}
        >
          <noscript>
            <a href="#">
              <img
                alt="Dashboard"
                src={`https://public.tableau.com/static/images/${staticImg}/1_rss.png`}
                style={{ border: 'none' }}
              />
            </a>
          </noscript>
          <object
            className="tableauViz"
            style={{ display: 'none', width: '100%' }}
          >
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value={name} />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param
              name="static_image"
              value={`https://public.tableau.com/static/images/${staticImg}/1.png`}
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-US" />
            <param name="filter" value="publish=yes" />
          </object>
        </div>
      </div>
    </div>
  )
}

export default function Dashboards() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="viz_v1.js"]')
    if (existing) existing.remove()

    const timer = setTimeout(() => {
      const allEmbeds = [...TABLEAU_EMBEDS, ...AIRBNB_EMBEDS]
      allEmbeds.forEach(({ id, mobileHeight }) => {
        const divElement = document.getElementById(id)
        if (!divElement) return
        const vizElement = divElement.getElementsByTagName('object')[0]
        if (!vizElement) return

        if (divElement.offsetWidth > 800) {
          vizElement.style.width = '100%'
          vizElement.style.height = `${divElement.offsetWidth * 0.75}px`
        } else if (divElement.offsetWidth > 500) {
          vizElement.style.width = '100%'
          vizElement.style.height = `${divElement.offsetWidth * 0.75}px`
        } else {
          vizElement.style.width = '100%'
          vizElement.style.height = mobileHeight
        }
      })

      const scriptElement = document.createElement('script')
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
      scriptElement.async = true
      document.body.appendChild(scriptElement)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --ink: #0e0e0f;
          --paper: #f5f3ef;
          --muted: #9a958d;
          --accent: #d4622a;
          --accent2: #2a6dd4;
          --rule: #dedad3;
          --card-bg: #ffffff;
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

        .page-title span {
          color: var(--accent);
        }

        .header-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--muted);
          text-align: right;
          line-height: 1.6;
        }

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

        .embeds-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

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
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
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
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0;
          font-style: italic;
        }

        .embed-frame {
          width: 100%;
        }

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

        @media (max-width: 640px) {
          .page-header { grid-template-columns: 1fr; }
          .header-tag { text-align: left; }
          .section-pill { display: none; }
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
              <p className="page-eyebrow">Interactive Visualizations</p>
              <h1 className="page-title">
                Data<br /><span>Dashboards</span>
              </h1>
            </div>
            <div className="header-tag">
              Tableau Public<br />
              5 Dashboards<br />
              2 Datasets
            </div>
          </header>

          {/* Anime Section */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">01 —</span>
              <h2 className="section-title">Anime Data Analysis</h2>
              <span className="section-pill">3 Views</span>
            </div>
            <div className="embeds-list">
              {TABLEAU_EMBEDS.map((embed) => (
                <TableauEmbed key={embed.id} {...embed} />
              ))}
            </div>
          </section>

          {/* AirBNB Section */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">02 —</span>
              <h2 className="section-title">AirBNB Market Analysis</h2>
              <span className="section-pill">2 Views</span>
            </div>
            <div className="embeds-list">
              {AIRBNB_EMBEDS.map((embed) => (
                <TableauEmbed key={embed.id} {...embed} />
              ))}
            </div>
          </section>

          <footer className="page-footer">
            <span className="footer-left">Full Stack Developer & Data Analyst</span>
            <div className="footer-right">
              {['Next.js', 'React', 'Tableau', 'TypeScript'].map((t) => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}