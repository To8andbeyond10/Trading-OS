import { DIMENSIONS } from './engine';
import type { Dimension, ResearchInput, ResearchSignal } from './engine';

/** Synthetic inputs, deliberately NOT sourced from any external asset or market data. */
const mock = (dimension: Dimension, score: number): ResearchSignal => ({
  dimension,
  score,
  source: 'Synthetic fixture — not a market data provider',
  rationale: dimension === 'risk'
    ? 'Demonstrates risk weighting; higher raw scores represent greater hypothetical downside.'
    : `Illustrative ${dimension} assessment for testing aggregation only. No current-company evidence.`,
});
const fixture = (symbol: string, scores: Record<Dimension, number>): ResearchInput => ({
  symbol,
  assetClass: 'equity',
  signals: DIMENSIONS.map(d => mock(d, scores[d])),
});
export const DEMO_ASSETS: Readonly<Record<string, ResearchInput>> = Object.freeze({
  NVDA: fixture('NVDA', { macro:62, fundamental:78, valuation:42, technical:74, sentiment:67, catalyst:76, risk:58 }),
  AAPL: fixture('AAPL', { macro:55, fundamental:72, valuation:61, technical:51, sentiment:59, catalyst:48, risk:32 }),
  TSLA: fixture('TSLA', { macro:58, fundamental:54, valuation:35, technical:63, sentiment:81, catalyst:67, risk:84 }),
});
