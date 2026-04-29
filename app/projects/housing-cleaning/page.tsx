'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DataCleaningDemo from '@/components/DataCleaningDemo'

const STATS = [
  { label: 'Records',      value: '56,477',      hint: 'Nashville transactions' },
  { label: 'Issues Found', value: '8+',           hint: 'Quality checks addressed' },
  { label: 'Execution',    value: 'SELECT only',  hint: 'No table mutation' },
]

export default function HousingCleaningPage() {
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
          grid-template-columns: repeat(3, 1fr);
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

        /* ── Cleaning steps list ── */
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Embed card wrapper for each DataCleaningDemo ── */
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
          .stats-grid { grid-template-columns: 1fr; }
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
              <p className="page-eyebrow">SQL Project</p>
              <h1 className="page-title">
                Housing<br /><span>Data Cleaning</span>
              </h1>
              <p className="page-subtitle">
                Step-by-step data cleaning using read-only SQL. Every transformation demonstrated
                with clear before and after queries — source table unchanged.
              </p>
            </div>
            <div className="header-tag">
              SQL / Data Quality<br />
              56,477 Records<br />
              Nashville Dataset
            </div>
          </header>

          {/* Stats */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">01 —</span>
              <h2 className="section-title">At a Glance</h2>
              <span className="section-pill">3 Metrics</span>
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

          {/* Cleaning steps */}
          <section className="section">
            <div className="section-header">
              <span className="section-number">02 —</span>
              <h2 className="section-title">Cleaning Steps</h2>
              <span className="section-pill">5 Transforms</span>
            </div>
            <div className="steps-list">

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Step 01</span>
                  <p className="embed-desc">Date Standardization and Formatting</p>
                </div>
                <div className="embed-frame">
                  <DataCleaningDemo
                    title="1. Date Standardization and Formatting"
                    description="Convert dates into standardized and readable formats while keeping the original timestamp intact."
                    rawQuery={`-- Raw dates directly from the import
SELECT 
  sale_date
FROM nashville_housing;`}
                    cleanedQuery={`-- Standardized dates formatted properly
SELECT 
  sale_date AS original_sale_date,
  TO_CHAR(sale_date, 'Month DD, YYYY') AS formatted_sale_date,
  TO_CHAR(sale_date, 'YYYY-MM-DD') AS iso_sale_date
FROM nashville_housing;`}
                    cleaningSteps={[
                      'Identify raw date formats',
                      'Use TO_CHAR() to format dates consistently',
                      'Provide both human-readable and ISO-8601 representations',
                    ]}
                  />
                </div>
              </div>

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Step 02</span>
                  <p className="embed-desc">Populate Missing Property Addresses</p>
                </div>
                <div className="embed-frame">
                  <DataCleaningDemo
                    title="2. Populate Missing Property Addresses"
                    description="Fill NULL property addresses by joining with matching ParcelID records that contain address data."
                    rawQuery={`-- Records with missing property addresses
SELECT 
  unique_id,
  parcel_id,
  property_address
FROM nashville_housing
WHERE property_address IS NULL;`}
                    cleanedQuery={`-- Fill missing addresses using ParcelID lookup
SELECT 
  a.unique_id,
  a.parcel_id,
  a.property_address AS original_address,
  COALESCE(a.property_address, c.property_address) AS cleaned_populated_address
FROM nashville_housing a
LEFT JOIN nashville_housing c
  ON a.parcel_id = c.parcel_id 
  AND a.unique_id <> c.unique_id
WHERE a.property_address IS NULL;`}
                    cleaningSteps={[
                      'Identify NULL values in PropertyAddress column',
                      'Join table with itself on matching ParcelID',
                      'Use COALESCE() to populate addresses',
                      'Verify no data loss after population',
                    ]}
                  />
                </div>
              </div>

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Step 03</span>
                  <p className="embed-desc">Break Address into Components</p>
                </div>
                <div className="embed-frame">
                  <DataCleaningDemo
                    title="3. Break Address into Components"
                    description="Split full property addresses into street and city columns for easier analysis."
                    rawQuery={`-- Combined address field with mixed data
SELECT 
  property_address
FROM nashville_housing
WHERE property_address IS NOT NULL;`}
                    cleanedQuery={`-- Split address components using SPLIT_PART string function
SELECT
  property_address AS full_address,
  TRIM(SPLIT_PART(property_address, ',', 1)) AS property_street,
  TRIM(SPLIT_PART(property_address, ',', 2)) AS property_city
FROM nashville_housing
WHERE property_address IS NOT NULL;`}
                    cleaningSteps={[
                      'Identify address separator (comma)',
                      'Use SPLIT_PART for extraction',
                      'Trim extra spaces',
                      'Create separate columns for street and city',
                    ]}
                  />
                </div>
              </div>

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Step 04</span>
                  <p className="embed-desc">Standardize Text Formatting</p>
                </div>
                <div className="embed-frame">
                  <DataCleaningDemo
                    title="4. Standardize Text Formatting"
                    description="Normalize inconsistent owner name casing into Title Case."
                    rawQuery={`-- Inconsistent casing in Owner Names
SELECT 
  owner_name
FROM nashville_housing
WHERE owner_name IS NOT NULL;`}
                    cleanedQuery={`-- Standardized formatting using INITCAP
SELECT
  owner_name AS raw_owner_name,
  INITCAP(LOWER(owner_name)) AS title_case_owner_name
FROM nashville_housing
WHERE owner_name IS NOT NULL;`}
                    cleaningSteps={[
                      'Identify text formatting inconsistencies',
                      'Use LOWER() to normalize text',
                      'Use INITCAP() for Title Case formatting',
                    ]}
                  />
                </div>
              </div>

              <div className="embed-card">
                <div className="embed-meta">
                  <span className="embed-label">Step 05</span>
                  <p className="embed-desc">Identify Duplicate Records</p>
                </div>
                <div className="embed-frame">
                  <DataCleaningDemo
                    title="5. Identify Duplicate Records"
                    description="Detect duplicates using window functions without deleting any rows."
                    rawQuery={`-- Group by potential duplicates
SELECT
  parcel_id,
  property_address,
  sale_price,
  sale_date,
  COUNT(*) as duplicate_count
FROM nashville_housing
GROUP BY parcel_id, property_address, sale_price, sale_date
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;`}
                    cleanedQuery={`-- Use Window Functions to flag the duplicates directly
WITH duplicates_cte AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY parcel_id, property_address, sale_price, sale_date, legal_reference
      ORDER BY unique_id
    ) AS row_num
  FROM nashville_housing
)
SELECT parcel_id, property_address, sale_price, row_num 
FROM duplicates_cte
WHERE row_num > 1;`}
                    cleaningSteps={[
                      'Use ROW_NUMBER() to identify duplicates',
                      'Partition by key identifying columns',
                      'Flag rows with row_num > 1',
                      'Demonstrate selection without deletion',
                    ]}
                  />
                </div>
              </div>

            </div>
          </section>

          <footer className="page-footer">
            <span className="footer-left">Full Stack Developer & Data Analyst</span>
            <div className="footer-right">
              {['SQL', 'PostgreSQL', 'Next.js', 'TypeScript'].map((t) => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}