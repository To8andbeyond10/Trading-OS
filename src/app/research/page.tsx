'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, ArrowRight, Atom, BrainCircuit, CheckCircle2, ChevronRight, CircleAlert, FlaskConical, Layers3, Play, ShieldCheck, Sparkles } from 'lucide-react';
import type { ResearchReport } from '@/lib/research/engine';
import './research.css';

const assets = [
  { symbol: 'NVDA', name: 'NVIDIA', initials: 'N', sector: 'Equity · demo fixture' },
  { symbol: 'AAPL', name: 'Apple', initials: 'A', sector: 'Equity · demo fixture' },
  { symbol: 'TSLA', name: 'Tesla', initials: 'T', sector: 'Equity · demo fixture' },
];
const descriptions: Record<string, string> = {
  macro: 'Macroeconomic regime', fundamental: 'Company fundamentals',
  valuation: 'Relative valuation', technical: 'Price structure',
  sentiment: 'Market sentiment', catalyst: 'Potential catalysts', risk: 'Downside exposure',
};
const stages = ['Macro context', 'Asset screening', 'Specialist research', 'Risk gate', 'Composite report'];
type DemoResponse = { report: ResearchReport; generatedAt: string; mode: string; disclaimer: string; error?: string };

export default function ResearchLabPage() {
  const [symbol, setSymbol] = useState('NVDA');
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [generatedAt, setGeneratedAt] = useState('');
  const [error, setError] = useState('');
  async function runDemo() {
    setBusy(true); setError(''); setReport(null);
    try {
      const response = await fetch(`/api/research/demo?symbol=${encodeURIComponent(symbol)}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not fetch the demo report.');
      const data: DemoResponse = await response.json();
      if (!data.report?.simulation || data.report.executionEnabled !== false) throw new Error('Unexpected research response.');
      setReport(data.report); setGeneratedAt(data.generatedAt);
    } catch(e) {
      setError(e instanceof Error ? e.message : 'Research demo unavailable.');
    } finally { setBusy(false); }
  }
  return <main className="research-shell">
    <div className="research-container">
      <header className="research-top">
        <Link href="/" className="research-back"><ArrowLeft size={17}/> Dashboard</Link>
        <div className="research-brand"><Activity size={18}/> TRADING <span>OS</span><span className="research-divider">/</span><strong>RESEARCH LAB</strong></div>
        <div className="research-readonly"><ShieldCheck size={15}/> READ ONLY</div>
      </header>
      <section className="research-heading">
        <div className="research-eyebrow"><span className="research-led"/> INTELLIGENCE WORKSPACE <span className="research-v">ALPHA 0.2</span></div>
        <h1>See every angle<span>.</span></h1>
        <p>A transparent, multi-specialist research foundation inspired by 1rok. Explore how independent signals become a structured report, before connecting any real data or AI provider.</p>
      </section>
      <div className="research-banner"><CircleAlert size={19}/><div><strong>SYNTHETIC DEMONSTRATION</strong><span>All scores are invented test values. No AI models, live quotes, brokerage accounts, paper orders, or real trades are connected.</span></div></div>
      <div className="research-layout">
        <section className="research-card research-config">
          <div className="research-card-title"><div><span className="research-card-overline">01 / INPUT</span><h2>Research universe</h2></div><Layers3 size={19}/></div>
          <p className="research-muted">Choose an illustrative equity fixture to test the full scoring flow.</p>
          <div className="research-asset-list">
            {assets.map(asset => <button key={asset.symbol} className={`research-asset ${symbol === asset.symbol ? 'picked' : ''}`} aria-pressed={symbol === asset.symbol} onClick={() => {setSymbol(asset.symbol);setReport(null);setError('')}}>
              <span className="research-symbol">{asset.initials}</span><span className="research-asset-copy"><strong>{asset.symbol} <small>{asset.name}</small></strong><em>{asset.sector}</em></span><ChevronRight size={16}/></button>)}
          </div>
          <button className="research-run" onClick={runDemo} disabled={busy}><Play size={17} fill="currentColor"/>{busy ? 'Calculating sample...' : 'Generate sample report'}<ArrowRight size={17}/></button>
          <p className="research-under"><ShieldCheck size={14}/> No portfolio or order permissions.</p>
        </section>
        <section className="research-card research-pipeline">
          <div className="research-card-title"><div><span className="research-card-overline">02 / ARCHITECTURE</span><h2>Analysis pipeline</h2></div><Atom size={20}/></div>
          <p className="research-muted">Modular stages for future live agents. The demo currently performs deterministic aggregation only.</p>
          <div className="research-stages">{stages.map((stage,i)=><div className="research-stage" key={stage}><span className="research-step">{String(i+1).padStart(2,'0')}</span><span>{stage}</span><span className="research-stage-status">{i===4?'DEMO ONLY':'PLANNED'}</span></div>)}</div>
          <div className="research-architecture"><BrainCircuit size={19}/><div><strong>Seven independent scoring dimensions</strong><p>Fundamentals · Valuation · Technicals · Sentiment · Catalysts · Macro · Risk</p></div></div>
        </section>
      </div>
      <section className="research-card research-result">
        <div className="research-card-title"><div><span className="research-card-overline">03 / OUTPUT</span><h2>Research report {report && <span className="research-ticker">{report.symbol}</span>}</h2></div><span className="research-result-tag"><FlaskConical size={15}/> SAMPLE</span></div>
        {error ? <div className="research-message research-error" role="alert">{error}</div> : !report ? <div className="research-empty"><div className="research-empty-icon"><Sparkles size={26}/></div><strong>Waiting for research input</strong><p>Choose an asset, then generate a synthetic report to see the scoring breakdown.</p></div> : <>
          <div className="research-score-row"><div><div className="research-score-label">ILLUSTRATIVE COMPOSITE</div><div className="research-score">{report.compositeScore === null ? '—' : report.compositeScore.toFixed(2)}<small> / 100</small></div><div className="research-score-caption">Weighted demonstration — not a prediction, price target, or trade signal.</div></div><div className="research-score-details"><span><CheckCircle2 size={16}/> {report.coveragePct}% mock-data coverage</span><span><ShieldCheck size={16}/> Execution disabled</span><span>Generated: {new Date(generatedAt).toLocaleString()}</span></div></div>
          <div className="research-breakdown">{report.breakdown.map(row=><article className="research-dimension" key={row.dimension}><div className="research-dimension-top"><strong>{descriptions[row.dimension]}</strong><span>{row.weightPct}% weight</span></div><div className="research-barline"><div className={`research-bar ${row.dimension === 'risk' ? 'research-risk' : ''}`} style={{width: `${row.score}%`}}/><span>{row.score}/100</span></div><p>{row.rationale}</p>{row.dimension === 'risk' && <small>For risk only, a higher input indicates greater hypothetical downside.</small>}</article>)}</div>
          <div className="research-notes">{report.warnings.map(note=><div key={note}><CircleAlert size={16}/>{note}</div>)}</div>
        </>}
      </section>
      <footer className="research-footer"><span>TRADING OS / RESEARCH LAB 0.2</span><span>Prototype only · Not financial advice</span></footer>
    </div>
  </main>;
}
