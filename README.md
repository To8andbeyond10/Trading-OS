# Trading OS

A mobile-first, research-focused trading intelligence terminal. An **original implementation**, with [QuantDinger](https://github.com/OpenByteInc/QuantDinger) used for high-level architecture and feature research (Apache-2.0). No QuantDinger code is included in this scaffold.

## Milestone 1 — Research terminal UI

- Responsive dark dashboard, mobile navigation and accessible filtering.
- Sample overview chart, sample watchlist and research assistant placeholder.
- Clear "DEMO DATA" labeling throughout. **Every displayed quote and performance statistic is illustrative** and must not be relied on for trading.
- Disabled trade execution; no wallet connections, broker authentication, personal financial information, or order endpoints.
- Health endpoint: `GET /api/health`.

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Deploy the repository to Vercel using the Next.js preset. The connected Vercel project may need to be linked manually (Settings → Git) if the provider connection is not yet authorized. No environment variables are required for Milestone 1.

## Next milestones

1. Replace illustrative data with a licensed, rate-limited data provider; add timestamps, stale-data indicators, caching, server-only credentials, normalized symbol and timeframe schemas, and fetch/error tests.
2. Implement saved watchlists, real screeners, asset pages, and authenticated user settings.
3. Add reproducible backtest workflows with fee/slippage modeling, holdout validation, paper-only accounts, and an auditable event log.
4. Evaluate live trading only after explicit user opt-in, broker integration security review, clear risk controls, and legal/compliance assessment.

## Safety

Research software; not financial advice. Demo metrics are not market feeds. There is no live or paper execution in Milestone 1.
