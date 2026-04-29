import { supabaseServer } from '@/lib/supabaseServer'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const table = req.nextUrl.searchParams.get('table')
    const queryType = req.nextUrl.searchParams.get('type')

    if (!table) {
      return NextResponse.json({ error: 'Table name required' }, { status: 400 })
    }

    let query = supabaseServer.from(table).select('*')

    if (queryType === 'housing') {
      // Get housing data with raw address
      const { data, error } = await query.limit(10)
      if (error) throw error
      return NextResponse.json({ data })
    }

    if (queryType === 'covid') {
      const location = req.nextUrl.searchParams.get('location') || 'India'
      const { data, error } = await query.eq('location', location).limit(100)
      if (error) throw error
      return NextResponse.json({ data })
    }

    const { data, error } = await query.limit(50)
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
