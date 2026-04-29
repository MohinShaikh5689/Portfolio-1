'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'

interface QueryResult {
  [key: string]: any
}

interface Query {
  name: string
  description: string
  sql: string
}

interface CovidDashboardProps {
  location?: string
}

export default function CovidDashboard({ location = 'India' }: CovidDashboardProps) {
  const [activeQuery, setActiveQuery] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<QueryResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasExecuted, setHasExecuted] = useState(false)

  const queries: Query[] = [
    {
      name: 'Daily Death Rate',
      description: "India's daily COVID death percentage trend",
      sql: `SELECT location, date, total_cases, total_deaths,
       ROUND((total_deaths::numeric / total_cases) * 100, 2) AS death_percent
FROM covid_deaths
WHERE location = '${location}'
ORDER BY date LIMIT 100;`,
    },
    {
      name: 'Infection Rate by Population',
      description: "India's daily infection rate based on population",
      sql: `SELECT location, date, total_cases, population,
       ROUND((total_cases::numeric / population) * 100, 4) AS infection_rate
FROM covid_deaths
WHERE location = '${location}'
ORDER BY date LIMIT 100;`,
    },
    {
      name: 'India Peak Statistics',
      description: "India's maximum cases and infection rate",
      sql: `SELECT location,
       MAX(total_cases) AS max_cases,
       MAX(population) AS population,
       ROUND((MAX(total_cases)::numeric / MAX(population)) * 100, 4) AS max_infection_rate
FROM covid_deaths
WHERE location = '${location}'
GROUP BY location;`,
    },
    {
      name: 'Global Infection Overview',
      description: 'Global cumulative cases, population, and infection rate',
      sql: `SELECT
    SUM(total_cases) AS total_global_cases,
    SUM(population) AS total_global_population,
    ROUND((SUM(total_cases)::numeric / SUM(population)) * 100, 4) AS global_infection_rate
FROM covid_deaths;`,
    },
    {
      name: 'Vaccination Progress',
      description: "India's vaccination rollout and coverage over time",
      sql: `SELECT d.date,
       d.population,
       v.people_vaccinated,
       v.people_fully_vaccinated,
       ROUND((v.people_vaccinated::numeric / d.population) * 100, 2) AS vaccinated_percent,
       ROUND((v.people_fully_vaccinated::numeric / d.population) * 100, 2) AS fully_vaccinated_percent
FROM covid_deaths d
JOIN covid_vaccinations v
    ON v.location = d.location AND v.date = d.date
WHERE v.location = '${location}'
ORDER BY d.date DESC LIMIT 100;`,
    },
    {
      name: 'Vaccination by Country',
      description: 'Worldwide vaccination coverage and death rates by country',
      sql: `SELECT d.location,
       MAX(d.population) AS population,
       ROUND((MAX(v.people_vaccinated)::numeric / MAX(d.population)) * 100, 2) AS vaccinated_percent,
       ROUND((MAX(v.people_fully_vaccinated)::numeric / MAX(d.population)) * 100, 2) AS fully_vaccinated_percent,
       ROUND((MAX(d.total_deaths)::numeric / MAX(d.population)) * 100, 4) AS death_rate
FROM covid_deaths d
JOIN covid_vaccinations v ON d.location = v.location AND d.date = v.date
GROUP BY d.location LIMIT 200;`,
    },
    {
      name: 'Top 40 Countries by Cases',
      description: 'Countries with highest total COVID cases recorded',
      sql: `SELECT location,
       MAX(total_cases) AS total_cases
FROM covid_deaths
WHERE continent IS NOT NULL AND total_cases IS NOT NULL
GROUP BY location
ORDER BY total_cases DESC LIMIT 40;`,
    },
    {
      name: 'Lowest 40 Countries by Cases',
      description: 'Countries with lowest total COVID cases recorded',
      sql: `SELECT location,
       MAX(total_cases) AS total_cases
FROM covid_deaths
WHERE continent IS NOT NULL AND total_cases IS NOT NULL
GROUP BY location
ORDER BY total_cases ASC LIMIT 40;`,
    },
    {
      name: 'Highest Death Rate Countries',
      description: 'Top 10 countries by death rate percentage',
      sql: `SELECT location,
       MAX(total_deaths) AS total_deaths,
       MAX(total_cases) AS total_cases,
       ROUND((MAX(total_deaths)::numeric / MAX(total_cases)) * 100, 2) AS death_rate_percent,
       ROUND((MAX(total_deaths)::numeric / MAX(population)) * 100, 4) AS death_rate_per_population
FROM covid_deaths
WHERE continent IS NOT NULL AND total_deaths IS NOT NULL AND total_cases IS NOT NULL
GROUP BY location
HAVING MAX(total_cases) > 0
ORDER BY death_rate_percent DESC LIMIT 10;`,
    },
    {
      name: 'Lowest Death Rate Countries',
      description: 'Bottom 10 countries by death rate percentage',
      sql: `SELECT location,
       MAX(total_deaths) AS total_deaths,
       MAX(total_cases) AS total_cases,
       ROUND((MAX(total_deaths)::numeric / MAX(total_cases)) * 100, 2) AS death_rate_percent,
       ROUND((MAX(total_deaths)::numeric / MAX(population)) * 100, 4) AS death_rate_per_population
FROM covid_deaths
WHERE continent IS NOT NULL AND total_deaths IS NOT NULL AND total_cases IS NOT NULL
GROUP BY location
HAVING MAX(total_cases) > 0
ORDER BY death_rate_percent ASC LIMIT 10;`,
    },
    {
      name: 'India Monthly Trends',
      description: "India's monthly aggregated cases and deaths",
      sql: `SELECT EXTRACT(YEAR FROM date) AS year,
       EXTRACT(MONTH FROM date) AS month,
       MAX(total_cases) AS monthly_cases,
       MAX(total_deaths) AS monthly_deaths
FROM covid_deaths
WHERE location = '${location}'
GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
ORDER BY year, month LIMIT 100;`,
    },
    {
      name: 'India Weekly Trends',
      description: "India's weekly aggregated cases and deaths",
      sql: `SELECT EXTRACT(YEAR FROM date) AS year,
       EXTRACT(WEEK FROM date) AS week_no,
       MAX(total_cases) AS weekly_cases,
       MAX(total_deaths) AS weekly_deaths
FROM covid_deaths
WHERE location = '${location}'
GROUP BY EXTRACT(YEAR FROM date), EXTRACT(WEEK FROM date)
ORDER BY year, week_no LIMIT 100;`,
    },
  ]

  const executeQuery = async (sql: string) => {
    setLoading(true)
    setError(null)
    setHasExecuted(false)
    setResults([])

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sql }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to execute query')
      }

      setResults(result.data || [])
      setHasExecuted(true)
    } catch (err: any) {
      console.error('Query error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const ResultsTable = ({ data }: { data: QueryResult[] }) => {
    if (data.length === 0) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          0 rows returned.
        </div>
      )
    }

    const columns = Object.keys(data[0] || {})

    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-5 py-4 font-semibold text-slate-600 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col} className="px-5 py-3 text-slate-700 truncate max-w-xs" title={String(row[col])}>
                      {row[col] === null ? <span className="text-slate-400 italic">null</span> : String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-8 py-6">
        <h2 className="text-2xl font-semibold text-slate-900">SQL Query Console</h2>
        <p className="text-sm text-slate-600 mt-2">
          Run curated SQL queries against the COVID datasets and review the output.
        </p>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Select a Query
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {queries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQuery(idx)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  activeQuery === idx
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="block font-semibold">{q.name}</span>
                <span className="block text-xs mt-1 opacity-70">{q.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900">{queries[activeQuery].name}</h4>
              <p className="text-xs text-slate-500 mt-1">{queries[activeQuery].description}</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">POSTGRES_DB</span>
          </div>

          <div className="p-6">
            <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 mb-6 overflow-x-auto max-h-64 overflow-y-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code>{queries[activeQuery].sql}</code>
              </pre>
            </div>

            <button
              onClick={() => executeQuery(queries[activeQuery].sql)}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                loading
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              {loading ? 'Running...' : 'Run Query'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {(hasExecuted || loading) && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Results</h3>
              {results.length > 0 && (
                <span className="text-xs text-slate-500">{results.length} rows</span>
              )}
            </div>
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
                Fetching results...
              </div>
            ) : (
              <ResultsTable data={results} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
