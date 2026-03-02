# hs-card-web

A webpage for viewing [Hearthstone](https://hearthstone.blizzard.com/en-us) cards.

## Production Link

The webpage can be viewed on: [hscards.william-winkler.com](https://hscards.william-winkler.com).

## Environment

Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required variables:

- `VITE_API_BASE_URL`: backend API base URL (for example `https://hscards.william-winkler.com/api/v1`)

## Local Development

```bash
bun install
bun run dev
```

## Quality Checks

```bash
bun run lint
bun run test
bun run typecheck
bun run build
```

## Production Build and Start

```bash
bun run build
bun run start
```

## API Client Regeneration

The file `src/api/api-client.ts` is generated from `swagger.yml`.

```bash
bun run generate-api
```

## Backend

hs-card-web uses [hs-card-service](https://github.com/williamwinkler/hs-card-service) as backend. <br>
