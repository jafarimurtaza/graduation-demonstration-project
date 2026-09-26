# Graduation demonstration — tasks

Live coding session. Each person takes one task, in order.

## Team

| #   | Name            | Task                             |
| --- | --------------- | -------------------------------- |
| 1   | Afifa Nazari    | Project structure                |
| 2   | Hadia Rauf      | Fetch graduates                  |
| 3   | Zahra Hassanzai | API route                        |
| 4   | Humaira Ahmadi  | List view                        |
| 5   | Nasim Haidari   | Wire `postGraduates` to the form |
| 6   | Samira Qoraishi | Wire the submit                  |
| 7   | Behishta Rauf   | Commit and push                  |
| 8   | Murtaza         | Deploy                           |

Each task below lists the owner and the work to do.

## Task 1 — Project structure

**Owner:** Afifa Nazari · Project structure

Create these folders:

- `src/app/api`
- `src/components`
- `src/lib`

Create these components:

- `src/components/MessageFormCard.tsx`
- `src/components/GraduateList.tsx`
- `src/components/HeroSection.tsx`
- `src/components/SuccessPanel.tsx`
- `src/components/GraduateListWrapper.tsx`

## Task 2 — Fetch graduates

**Owner:** Hadia Rauf · Graduates fetch

Create `src/lib/api.ts` with a `getGraduates()` function.

It fetches:

```
/api/graduate-profiles/public?page=1&pageSize=30
```

## Task 3 — API route

**Owner:** Zahra · API route

Create `src/app/api/messages/route.ts`.

- **Method:** `POST`
- **Forwards to:** `POST /api/graduation-messages/public`

Request body:

```json
{
  "message": "تبریک! به شما افتخار می‌کنیم.",
  "sender_name": "Zahra",
  "is_anonymous": false,
  "graduate": "{{graduateSlug}}"
}
```

## Task 4 — List view

**Owner:** Humaira · List view

Write the UI in these components:

- `GraduateLists.tsx`
- `GraduateWrapper.tsx`
- `GraduationMessages.tsx`
- `MessageForm.tsx`

Also:

- Show graduates in a clean grid
- Show an empty-state message when there are zero graduates
- Update `page.tsx`

## Task 5 — Wire `postGraduates` to the form

**Owner:** Nasim Haidari · Validation

In `src/lib/api.ts`, add `postGraduates()`.

- It calls the `/api/messages` endpoint
- Use it inside `MessageFormCard`

## Task 6 — Wire the submit

**Owner:** Samira Qoraishi · Submit wiring

Update `GraduateListWrapper.tsx` with these states:

- `isSubmitting` — disable submit while the request is sending
- `success` — show the success panel when the message is sent
- `error` — show an inline retry
- Reset clears the form so a second message can be sent

## Task 7 — Commit and push

**Owner:** Behishta Rauf · Commit and push

## Task 8 — Deploy

**Owner:** Murtaza · Deploy
