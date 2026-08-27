# Next.js + Tailwind CSS + Supabase Starter

A complete Next.js 14 (App Router) starter with Tailwind CSS and Supabase
wired up for authentication (email/password + email confirmation) and
database access, using `@supabase/ssr` for proper cookie-based sessions
across Server Components, Client Components, Route Handlers, and Middleware.

## Why you need to run one command locally

This project was generated in a sandboxed environment without internet
access, so dependencies could not be pre-installed. Everything else —
every config file and every line of app code — is done. You just need to
install the packages once on your own machine.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a Supabase project**

   Go to [supabase.com](https://supabase.com) → New project. Once created,
   go to **Project Settings → API** and copy your Project URL and anon/public key.

3. **Add environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Then fill in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **(Optional) Create a `profiles` table**

   The dashboard page queries a `profiles` table as an example. In the
   Supabase SQL Editor, run:

   ```sql
   create table profiles (
     id uuid primary key default gen_random_uuid(),
     email text,
     created_at timestamptz default now()
   );

   alter table profiles enable row level security;

   create policy "Users can view their own profile"
     on profiles for select
     using (auth.uid()::text = id::text);
   ```

   (Or point the query in `app/dashboard/page.tsx` at any table you like.)

5. **In Supabase Auth settings**, make sure your site URL and redirect URL
   include `http://localhost:3000` and `http://localhost:3000/auth/callback`
   (Authentication → URL Configuration).

6. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000.

## What's included

- `lib/supabase/client.ts` — Supabase client for Client Components
- `lib/supabase/server.ts` — Supabase client for Server Components / Route Handlers
- `middleware.ts` — refreshes the auth session on every request and protects `/dashboard`
- `app/login/page.tsx` — sign in / sign up form
- `app/auth/callback/route.ts` — handles email confirmation / magic link redirects
- `app/dashboard/page.tsx` — protected page with an example database query
- Tailwind CSS fully configured (`tailwind.config.ts`, `app/globals.css`)

## Project structure

```
app/
  auth/callback/route.ts
  dashboard/
    page.tsx
    sign-out-button.tsx
  login/page.tsx
  layout.tsx
  page.tsx
  globals.css
lib/
  supabase/
    client.ts
    server.ts
middleware.ts
tailwind.config.ts
postcss.config.js
next.config.js
tsconfig.json
package.json
```
# Zoufri
