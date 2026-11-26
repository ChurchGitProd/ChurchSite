# SCRIPTURA Digital Library — CMS & Web Application

A modern, editorial digital library and theological resource platform built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **TinaCMS 2.2**.

---

## Technical Specifications & Requirements

- **Framework**: Next.js 14.2.5 (App Router)
- **UI / Styling**: React 18.3.1, Tailwind CSS 3.4
- **Language**: TypeScript 5
- **CMS**: TinaCMS 2.2.3 with `@tinacms/cli` 1.5.47
- **Node.js Requirement**: **Node.js `>= 18.17.0`** (Node.js 20.x LTS strongly recommended)
- **Package Manager**: `npm` (v10+ recommended)

---

## Required Production Environment Variables

To perform a full production build (`npm run build`) and connect to Tina Cloud for live editorial capabilities, configure the following environment variables in your deployment hosting provider:

| Variable | Requirement | Description |
| :--- | :---: | :--- |
| `GITHUB_CLIENT_ID` | **Required** | The Tina Cloud Client ID associated with this project. |
| `GITHUB_TOKEN` | **Required** | The Tina Cloud Content API read/write token. |
| `GITHUB_API_URL` | Optional | Custom Git API endpoint (defaults to `https://api.github.com` if omitted). |

An example template is available in `.env.example`.

> **Security Note**: Never commit actual tokens or `.env` files into source control. All `.env*` files are ignored by `.gitignore`.

---

## Build & Run Commands

### Production Build
```bash
npm run build
```
*This executes `tinacms build && next build`. TinaCMS compiles the production admin assets and Next.js prerenders all static and dynamic pages.*

### Production Runtime / Start
```bash
# Standard Next.js server start (recommended after build phase)
npx next start

# Or using the package start script:
npm run start
```

### Local Development
```bash
npm run dev
```
*Starts the local TinaCMS dev server with GraphQL indexing and Next.js dev server concurrently at `http://localhost:3000` and `http://localhost:3000/admin/index.html`.*

### Type Checking
```bash
npx tsc --noEmit
```

---

## Production Deployment Guide

This project is platform-agnostic and can be deployed to any modern Node.js hosting platform:

### 1. Vercel / Netlify
1. Connect your GitHub repository to your Vercel or Netlify project.
2. In **Project Settings > Environment Variables**, add:
   - `GITHUB_CLIENT_ID`: Your Tina Cloud Client ID
   - `GITHUB_TOKEN`: Your Tina Cloud Token
3. Ensure the Build Command is set to `npm run build` and Output Directory is `.next`.
4. Ensure the Node.js version is set to `20.x` (or `>= 18.17.0`).
5. Trigger deployment.

### 2. Render / Railway / Self-Hosted VPS
1. Create a Web Service pointing to the repository.
2. Configure Environment Variables:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_TOKEN`
   - `NODE_ENV=production`
3. Set Build Command: `npm run build`
4. Set Start Command: `npx next start` (or `npm run start`)
5. Deploy service.

---

## Content Architecture & Routes

- **Singleton Pages**:
  - `/`: Home (`content/home/index.md`)
  - `/about`: About Us (`content/about/index.md`)
  - `/contact`: Contact Office (`content/contact/index.md`)
  - `/newsletter`: Daily Letter (`content/newsletter/index.md`)
  - `/archives`: Historical Archives (`content/archives/index.md`)
  - `/resources`: Useful Resources (`content/resources/index.md`)
  - `/quick-links`: Quick Links (`content/quick-links/index.md`)
  - `/zoom-info`: Zoom Seminar Info (`content/zoom-info/index.md`)
- **Canonical MDX Collections**:
  - `/newsletter/[slug]`: 5 Daily Devotionals
  - `/archives/[slug]`: 3 Historical Archival Documents
  - `/resources/[slug]`: 8 Canonical Scholarly Resources
  - `/quick-links/[slug]`: 8 Quick Navigation Shortcuts
  - `/lessons/[slug]`, `/references/[slug]`, `/videos/[slug]`, `/images/[slug]`, `/books/[slug]`, `/library/[slug]`
- **CMS Admin**: Accessible in browser at `/admin/index.html`.
