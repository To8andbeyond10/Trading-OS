import assert from 'node:assert/strict';
import test from 'node:test';
import { DIMENSIONS, evaluateResearch } from './engine.ts';
import type { ResearchSignal } from './engine.ts';
const signals: ResearchSignal[] = DIMENSIONS.map(d => ({dimension:d,score:50,source:'fixture',rationale:'Test data only'}));
const input = (s: ResearchSignal[] = signals) => ({symbol:'NVDA',assetClass:'equity' as const,signals:s});
test('complete and normalized seven-component score', () => {
  const result=evaluateResearch(input());
  assert.equal(result.status,'complete');
  assert.equal(result.coveragePct,100);
  assert.equal(result.compositeScore,50);
  assert.equal(result.executionEnabled,false);
});
test('higher risk lowers the final composite', () => {
  const low=evaluateResearch(input(signals.map(s=>s.dimension==='risk'?{...s,score:10}:s)));
  const high=evaluateResearch(input(signals.map(s=>s.dimension==='risk'?{...s,score:90}:s)));
  assert.ok(low.compositeScore! > high.compositeScore!);
  assert.match(high.warnings.join(' '), /high-risk/);
});
test('missing data cannot produce final composite', () => {
  const result=evaluateResearch(input(signals.slice(0,-1)));
  assert.equal(result.status,'insufficient-data');
  assert.equal(result.compositeScore,null);
  assert.deepEqual(result.missingDimensions,['risk']);
  assert.equal(result.coveragePct,85);
});
test('rejects duplicates, impossible scores, and bad symbols', () => {
  assert.throws(()=>evaluateResearch(input([...signals,signals[0]])),/Duplicate/);
  assert.throws(()=>evaluateResearch(input([{...signals[0],score:101}])),/Invalid score/);
  assert.throws(()=>evaluateResearch({...input(),symbol:'../orders'}),/Invalid symbol/);
});
