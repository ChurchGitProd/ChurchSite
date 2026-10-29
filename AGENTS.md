# Project guidance

- Tina's CLI embeds the configured API token in generated clients. Keep `tina/__generated__/` out of Git, including after production builds.
- Use `npm run dev` to regenerate Tina artifacts for local development before running the application. Do not run directly against a previously generated cloud client.
- `npx tsc --noEmit --incremental false` checks TypeScript without updating the incremental build cache.
- Keep real environment files ignored; `.env.example` is the tracked placeholder template.
