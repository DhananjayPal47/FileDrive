# FileDrive

A file storage and sharing app for teams: upload PDFs, CSVs and images into an
organization, search and filter them, favorite them, and soft-delete to trash
with a scheduled cleanup job. Role-based permissions mean only the file owner or
an org admin can delete or restore a file.

Built with **React + JavaScript (Vite)**, **React Router**, **Convex** for the
database/file storage/cron jobs, **Clerk** for auth and organizations, and
**Tailwind CSS + shadcn/ui + Radix** for the interface.

## Features

- Email/social sign-in and organization support (Clerk)
- Upload files to Convex file storage; files are scoped to the active org or to
  the user's personal space
- Grid and table views (TanStack Table) with search and type filtering
- Favorites and a trash bin with restore
- Soft delete plus a Convex cron job that purges trashed files every minute
- Role-based access: only the uploader or an `org:admin` can delete/restore
- Clerk webhooks (verified with svix) keep users and org memberships in sync

## Tech stack

| Area     | Choice                                     |
| -------- | ------------------------------------------ |
| Frontend | React 18, JavaScript, Vite                 |
| Routing  | React Router v6                            |
| Backend  | Convex (queries, mutations, actions, crons)|
| Auth     | Clerk (`@clerk/clerk-react`)               |
| UI       | Tailwind CSS, shadcn/ui, Radix UI, lucide  |
| Forms    | React Hook Form + Zod                      |

## Getting started

```bash
npm install
```

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

Set up Convex (this prints your deployment URL and writes it to `.env.local`):

```bash
npx convex dev
```

Then in the [Clerk dashboard](https://dashboard.clerk.com):

1. Create an application and enable **Organizations**.
2. Copy the **Publishable key** into `VITE_CLERK_PUBLISHABLE_KEY`.
3. Create a **JWT template** named `convex` and copy its Issuer URL into
   `convex/auth.config.js` (replace the `domain` value).
4. Add a **webhook** pointing at `https://<your-convex-deployment>.convex.site/clerk`
   subscribed to `user.created`, `user.updated`,
   `organizationMembership.created` and `organizationMembership.updated`.
5. Set the webhook secret and Clerk hostname on Convex:

```bash
npx convex env set CLERK_WEBHOOK_SECRET whsec_xxx
npx convex env set CLERK_HOSTNAME your-app.clerk.accounts.dev
```

Run the app (keep `npx convex dev` running in a second terminal):

```bash
npm run dev
```

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Vite dev server                      |
| `npm run build`   | Production build into `dist/`        |
| `npm run preview` | Preview the production build         |
| `npx convex dev`  | Convex dev server + code generation  |

## Project structure

```
convex/                 Convex backend (schema, queries, mutations, crons, webhooks)
src/
  App.jsx               Route tree
  main.jsx              React entry point
  providers/            Clerk + Convex providers
  pages/                Landing, Files, Favorites, Trash, 404
  components/
    Header.jsx  Footer.jsx  SideNav.jsx
    DashboardLayout.jsx Nested layout with <Outlet />
    RequireAuth.jsx     Client-side route guard
    files/              Browser, card, table, actions, upload, search
    ui/                 shadcn/ui primitives
  lib/utils.js          Tailwind class helper
```

## Deployment

The app is a static SPA, so any static host works (Vercel, Netlify,
Cloudflare Pages). Because routing happens on the client, the host must rewrite
unknown paths to `index.html` — `vercel.json` and `public/_redirects` are
included for that. Deploy the Convex backend with `npx convex deploy` and set
the production environment variables on the host.

## Notes

`convex/_generated/` is created by the Convex CLI. The `.d.ts` files in it are
generated type hints that give editors autocomplete for `api.*`; they are
rewritten by `npx convex dev` and are not hand-maintained source.
