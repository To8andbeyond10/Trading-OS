# 1rok review and Trading OS reconstruction plan

## Reference and license

Reference: https://github.com/achaljhawar/1rok (MIT, copyright 2026 Achal Jhawar).
See https://github.com/achaljhawar/1rok/blob/main/LICENSE for the upstream license.
This milestone uses an **original implementation** of a transparent scoring demonstration. No upstream source code, agent prompts, or packaged dependencies have been copied. If future changes incorporate upstream code, include the required MIT copyright and license notice.

## What was inspected

- 1rok provides a Bun/TypeScript CLI rather than a Next.js website.
- Its `run` path creates JSON portfolio-research artifacts, separate from its `execute` path that can send Alpaca orders when live mode is explicitly enabled.
- It has a local Zod-validated tool registry, specialist agents, provider adapters and data services (Alpaca, Yahoo Finance, FRED, Tavily).
- **Execution-label caveat in this inspected revision:** the CLI names its opt-in flag `--live`, but `getCredentialsForModel()` in `src/harness/core/order-executor.ts` hardcodes `https://paper-api.alpaca.markets`, and default `execute` is a dry run. The README and CLI warning language do not fully describe the actual execution target. Do not reuse these labels or assume live-broker support without an independent code audit.
- The README describes parallel analysis, but the inspected pipeline currently sets `agentConcurrency = 1`; real throughput/cost must be benchmarked before designing any hosted orchestration.
- The pipeline coordinates macro context, screening, six analytical disciplines, synthesis and portfolio construction.
- It currently saves artifacts to local disk and expects service credentials and an appropriate runtime; lifting the CLI into a serverless request handler would be unsafe and unreliable for multi-minute operations.

## This PR: a safe vertical slice

- A native, responsive Next.js `/research` screen with three selectable synthetic equity fixtures.
- A pure, independently testable, 7-dimension score aggregator with published weights; risk inputs are **inverted** because higher risk should not increase composite quality.
- Fail-closed aggregation: missing categories suppress the overall score instead of silently renormalizing.
- Validation for duplicate dimensions, out-of-range scores, bad symbols and absent provenance.
- `GET /api/research/demo?symbol=NVDA|AAPL|TSLA` provides only fixture data, explicitly marked synthetic; no brokerage SDK or credentials.
- Explicit prohibition on live order execution, LLM provider calls or market-data presentation in this milestone.

## Engineering roadmap

1. **Market data**: source approved feeds through server-only adapters; include provider, timestamp, exchange/session, currency, staleness and entitlements in every datum. Separate equities from crypto schemas.
2. **Read-only tools**: validate and allowlist tool execution; add budgets, timeouts, retries, token costs, audit logs, and rate limits.
3. **Agent orchestration**: durable job queue + datastore, rather than a long-running Vercel HTTP request. Support partial failures with explicit incomplete reports and evidence trails.
4. **Research experience**: individual specialist outputs, model/provider selection, hypothesis testing, cross-checks, saved reports, and backtest linkages.
5. **Paper-only simulation**: independent account, modeled fees/slippage, idempotent artifacts, position limits and reconciliation.
6. **Live brokerage**: separate service boundary and authorization with human order review, explicit opt-in, kill switch, hard risk caps, credential isolation, and legal/compliance review; not part of this PR.

### Safety gate

Never turn a score into a live order without a separate reviewed executor. The `/api/research/demo` route cannot place orders, load brokerage keys, or call AI services. Any future public paid-data endpoint needs authentication, usage limits and licensing checks before launch.

## Local checks

`npm run test:research` invokes the built-in Node test runner on the pure scoring engine. The GitHub PR needs normal CI/build verification separately before merge.
