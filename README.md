# Rent a Human

**Human as a Service.** Got skills? Get paid.

Browse, book, and review real humans for any task. Moving, companionship, tech support, queue standing, and more. The marketplace for human services.

## Repo layout

Monorepo (pnpm workspaces):

- **apps/web** — Next.js frontend
- **apps/api** — Hono API on Cloudflare Workers

## Prerequisites

- Node.js
- pnpm

## Cloudflare (API deploy)

To deploy the API to Cloudflare Workers via GitHub Actions, add these **repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Where to get it |
|--------|------------------|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → use “Edit Cloudflare Workers” template (or custom: Account → Workers Scripts Edit). |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right sidebar or account URL. |

Local dev: run `pnpm dev:api` (from root) or `wrangler dev` in `apps/api`. Use `wrangler login` once to authenticate.

## Commands

From repo root:

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev:web` | Run Next.js dev server |
| `pnpm dev:api` | Run Hono API (Wrangler) |
| `pnpm build:web` | Build web app |
| `pnpm run lint` | Biome check |
| `pnpm run format` | Biome format |

## License

[AGPL v3](LICENSE)
