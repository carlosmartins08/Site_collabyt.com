<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1IzZC5V8YgXFbF42PUTtF-py_lDfTv5g6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Environment Variables

- `GEMINI_API_KEY` (required) – key used by the AI Consultant widget.
- `VITE_CONTACT_ENDPOINT` (recommended) – URL that receives contact form submissions (e.g., webhook, serverless function or CRM endpoint). Without it the form shows an error.
- `SITE_URL` – base URL used for sitemap generation and prerendered snapshots (`npm run generate:sitemap`, `npm run build`).

## Documentation

Full project documentation has been consolidated in the `docs/` folder. See the documentation index:

- [Documentation Index](docs/index.md)
