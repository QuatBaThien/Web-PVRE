# Deploy Guide

## Vercel

1. Push source code to GitHub.
2. Import the repository into Vercel.
3. Keep the default settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

`vercel.json` is included so React routes rewrite back to `index.html`.

## GitHub Pages

1. Push the repository to GitHub.
2. Ensure the default branch is `main`, or update `.github/workflows/deploy-pages.yml`.
3. In GitHub:
   - Open `Settings` -> `Pages`
   - Set `Source` to `GitHub Actions`
4. Push to `main` or manually run the workflow.

The workflow automatically builds with `--base=/<repo-name>/` so assets and routes work under the Pages subpath.

## Local verification

Default build:

```powershell
npm run build
```

GitHub Pages style build:

```powershell
npm run build -- --base=/your-repo-name/
```
