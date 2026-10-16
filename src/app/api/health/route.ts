import { NextResponse } from 'next/server';
export function GET() { return NextResponse.json({ status: 'ok', service: 'trading-os', milestone: 1, dataMode: 'demo', executionEnabled: false }); }
