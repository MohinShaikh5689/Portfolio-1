import { supabaseServer } from '@/lib/supabaseServer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query) {
      return NextResponse.json({ error: 'Query required' }, { status: 400 })
    }

    console.log('Executing query:', query)

    // Execute RPC query for custom SQL-like operations
    const { data, error } = await supabaseServer.rpc('execute_query', { query_text: query })

    if (error) {
      console.error('RPC error details:', JSON.stringify(error, null, 2))
      throw error
    }

    // Handle the response - data is already a JSON array from the RPC function
    const resultData = Array.isArray(data) ? data : (typeof data === 'string' ? JSON.parse(data) : [])

    return NextResponse.json({ data: resultData })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Query execution failed'
    console.error('Query execution error:', errorMsg, error)
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    )
  }
}
