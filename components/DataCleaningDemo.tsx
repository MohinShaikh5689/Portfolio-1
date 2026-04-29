'use client'

import { useState } from 'react'
import { Play, Database, CheckCircle2, Loader2 } from 'lucide-react'

interface DataRow {
  [key: string]: any
}

interface DataCleaningDemoProps {
  title: string
  description: string
  rawQuery: string
  cleanedQuery: string
  cleaningSteps: string[]
}

export default function DataCleaningDemo({
  title,
  description,
  rawQuery,
  cleanedQuery,
  cleaningSteps,
}: DataCleaningDemoProps) {
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'raw' | 'cleaned'>('raw')
  const [error, setError] = useState<string | null>(null)
  const [hasExecuted, setHasExecuted] = useState(false)

  const executeQuery = async (queryToRun: string) => {
    setLoading(true)
    setError(null)
    setHasExecuted(false)
    setData([])

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToRun }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to execute query')
      }

      setData(result.data || [])
      setHasExecuted(true)
    } catch (err: any) {
      console.error('Query error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab: 'raw' | 'cleaned') => {
    setActiveTab(tab)
    setHasExecuted(false)
    setData([])
    setError(null)
  }

  const DataTable = ({ data }: { data: DataRow[] }) => {
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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-10">
      <div className="border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Database size={20} />
          </span>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {cleaningSteps.map((step, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            >
              <CheckCircle2 size={12} className="text-slate-500" />
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-200 flex">
        <button
          onClick={() => handleTabChange('raw')}
          className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'raw' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Raw Query
        </button>
        <button
          onClick={() => handleTabChange('cleaned')}
          className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'cleaned' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Cleaned Query
        </button>
      </div>

      <div className="p-8">
        <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 overflow-x-auto max-h-64 overflow-y-auto">
          <pre className="text-sm font-mono leading-relaxed">
            <code>{activeTab === 'raw' ? rawQuery : cleanedQuery}</code>
          </pre>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => executeQuery(activeTab === 'raw' ? rawQuery : cleanedQuery)}
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
          {hasExecuted && !error && <span className="text-xs text-slate-500">Query completed</span>}
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
              {data.length > 0 && <span className="text-xs text-slate-500">{data.length} rows</span>}
            </div>
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
                Fetching results...
              </div>
            ) : (
              <DataTable data={data} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
