# Atharva Gite

Personal site. One page: work, experience, education, skills, and contact.

Copy lives in `lib/content.ts`. Statements are limited to the software and quantitative resumes and the project audits of those repositories.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub Pages

Pushes to `main` build a static export and publish it with GitHub Actions. The site is `https://atharva-gite.github.io`.

Pages has to be set to deploy from GitHub Actions (Settings → Pages → Source). The workflow does the rest.
