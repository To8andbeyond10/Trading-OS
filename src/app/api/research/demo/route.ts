import { NextRequest, NextResponse } from 'next/server';
import { DEMO_ASSETS } from '@/lib/research/demo-fixtures';
import { evaluateResearch } from '@/lib/research/engine';

export const dynamic = 'force-dynamic';

/** Read-only demo endpoint. Never attach credentials, AI provider calls or an order handler here. */
export function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get('symbol') ?? 'NVDA').trim().toUpperCase();
  const fixture = Object.hasOwn(DEMO_ASSETS, symbol) ? DEMO_ASSETS[symbol] : undefined;
  if (!fixture) {
    return NextResponse.json({ error: 'Unknown sample asset', availableSymbols: Object.keys(DEMO_ASSETS) },
      { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
  return NextResponse.json({
    report: evaluateResearch(fixture),
    generatedAt: new Date().toISOString(),
    mode: 'synthetic-demo',
    disclaimer: 'Illustrative inputs only. Not live market research, model output or investment advice.',
  }, { headers: { 'Cache-Control': 'no-store' } });
}
