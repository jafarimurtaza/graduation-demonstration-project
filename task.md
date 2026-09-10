# Task 1 — Setup + static UI

**Afifa Nazari · `feat/project-setup`**

create the follwoing folders;

`src/app/api`

## src/components:

```
components/MessageFormCard.tsx
components/GraduateList.tsx
components/HeroSection.tsx
components/SuccessPanel.tsx
components/GraduateListWrapper.tsx

```

## lib

create a folder call it `lib`

`src/lib`

# task 2 — Real graduates

**Hadia Rauf · `feat/graduates-fetch`**

Create `api.ts` in
`lib/api.ts`:

create a function:
`getGraduates()` fetches
`/api/graduate-profiles/public?page=1&pageSize=30`

# Task 3 — List view

**Humaira · `feat/list-view`**
Write your ui code in

Component:

```

GraduateLists.tsx
GraduateWrapper.tsx
GraduationMessages.tsx
MessageForm.tsx

```

Create a clean grid, an `empty-state message`
for the (unlikely) zero-graduates case,

## Update the `page.tsx`

# Task 4 — API route

**Zahra · `feat/api-route`**

In `src/app/api`

Create a new route call it:

`app/api/messages/route.ts`,

Methdod: `POST `
body:

```
{
  "message": "تبریک! به شما افتخار می‌کنیم.",
  "sender_name": "Zahra",
  "is_anonymous": false,
  "graduate": "{{graduateSlug}}"
}
```

forwards to `POST /api/graduation-messages/public`

# Task 5 — Wire the postGraduates to the form

**Khatera Fayazi · `feat/validation`**

Create a function in `lib/api.ts` call it `postGraduates()`
to call the `/api/messages` endpoint

and use the function in the `MessageFormCard`

# Task 6 — Wire the submit

**Samira Qoraishi · `feat/submit-wiring`**

Status state `success` - `error` `isSubmitting` . Submit disabled while sending, success panel shown on `sent`, inline retry on `error`, reset clears everything for a second message.

**Done:** full flow produces a draft in Strapi and shows the success panel.

# Task 7 — Find and fix the bug

**Nassim Haidary · `feat/lint-fix`**

## step 1

`bun add -d eslint eslint-config-next`

## Step 2

Create `eslint.config.mjs` with the Next.js config in the root level:

## Step 3

```
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
```

## Step 4

Run ESLint:
`bunx eslint .`

## Step 5

And see where we have erros and warrnings

**Done:** `bunx eslint .` is clean, and the fix doesn't touch anything unrelated.
