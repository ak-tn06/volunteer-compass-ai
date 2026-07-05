# Volunteer Compass AI

A personalized, AI-powered onboarding assistant for first-time nonprofit volunteers — built as a portfolio project for a Claude Corps Fellow application.

**[Open the prototype](./Volunteer_Compass_AI_Prototype.html)** — a single self-contained HTML file, no install required.

---

## Overview

Volunteer Compass AI walks a new volunteer through a short, conversational onboarding flow — role, experience level, concerns — and generates a personalized orientation, arrival checklist, and space for follow-up questions, closing with a before/after measure of how prepared they feel.

## The Problem

Nonprofits depend heavily on volunteers but run on limited staff time. New volunteers tend to arrive with the same handful of questions (what to wear, where to park, what the work actually involves, how physically demanding it is), and volunteer coordinators end up answering those same questions repeatedly — time that comes directly out of program work and community support. Most organizations solve this with a generic, one-size-fits-all orientation that isn't personalized to the volunteer's actual role or concerns.

## Why AI

Onboarding is repetitive in structure but genuinely contextual in content — a food-sorting volunteer worried about physical demands needs a different orientation than an office volunteer worried about parking. AI is well-suited to exactly this kind of task: generating a tailored response from a small set of inputs, instantly, without needing a human to author every combination in advance. This tool doesn't replace volunteer coordinators — it absorbs the repetitive logistics questions so staff can spend their time on the part of the job that actually requires a person: building relationships with volunteers.

## User Journey

1. **Welcome** — brief framing of what's about to happen
2. **Before rating** — "how prepared do you feel?" (1–5 stars), captured before any help is given
3. **Role** — food sorting, food packing, distribution, office/admin, or other
4. **Experience** — first shift or returning volunteer
5. **Concerns** — multi-select (what to wear, parking, physical demands, food safety, working with people, accessibility, or a free-text "something else")
6. **AI-generated orientation** — greeting, day overview, what to wear/bring, safety reminders, a role-specific tip, and encouragement, all shaped by the inputs above
7. **Arrival checklist** — a short, concrete list of what to do on arrival
8. **Reflective question** — "Is there anything you're still unsure about?" — answered in the volunteer's own words, with one personalized AI response
9. **Open follow-up Q&A** — optional, for anything else on their mind
10. **After rating** — the same 1–5 star question, asked again
11. **Closing screen** — a thank-you message plus a simple before/after star comparison

An **About this project** page is reachable from every screen via the top navigation, explaining the project's purpose, audience, and intentionally narrow scope.

## Technologies Used

- **Frontend:** vanilla HTML, CSS, and JavaScript — no framework, no build step
- **AI:** Claude (Sonnet), called directly from the browser for this prototype
- **Fonts:** Fraunces (headings) and Inter (body text), loaded from Google Fonts

## Architecture

This is a single self-contained HTML file. All state lives in one in-memory JavaScript object (no persistence, no accounts). The UI is a small hand-rolled state machine: one `state` object, one `render()` dispatcher, and one function per screen — there's no framework because the app doesn't need one at this size, and a framework would have added complexity without adding capability.

Every AI call — the orientation, the reflective response, and follow-up Q&A — routes through a single `requestClaude()` function, so there's exactly one place in the code that talks to the Anthropic API.

**A note on the API call and security:** this prototype calls `api.anthropic.com` directly from client-side JavaScript. That is acceptable *only* because this is a local, unhosted demo with no real API key at risk. It is explicitly **not** how this would be built for production: a real deployment would move that one function behind a small backend endpoint or serverless function (Node or Python), so the API key lives server-side and is never exposed to anyone opening browser dev tools. Because the whole app already funnels every AI call through one function, that migration is a small, localized change rather than a rewrite — a deliberate architecture choice made with that future step in mind.

## MVP Scope

**In scope:** role/experience/concern intake, AI-generated personalized orientation, arrival checklist, a reflective closing question, open follow-up Q&A, and a simple before/after preparedness rating.

**Deliberately not built**, per explicit product scoping:
- Volunteer scheduling or registration
- User accounts or authentication
- A database or any persistence layer
- Calendar integration
- Eligibility screening for services
- Donation management
- Admin dashboards or analytics

Keeping the scope this narrow was a product decision, not a limitation — a focused tool that does one thing well is more useful to evaluate (and more realistic to actually pilot) than a broad one that does many things shallowly.

## Ethical Considerations

- The assistant does not determine eligibility for services, provide legal or medical advice, or make operational decisions on behalf of any organization.
- Every AI prompt in the app includes explicit instructions not to invent organization-specific facts (addresses, staff names, exact policies) and to acknowledge uncertainty plainly — phrases like "policies may vary by organization" and "your volunteer coordinator can confirm that" appear by design, not by accident.
- The tool uses a clearly fictional, generic organization name ("Example Food Bank (Demo)") throughout, and states outright — in the UI and in this README — that it isn't affiliated with any real nonprofit.
- No feedback or rating data is stored anywhere; it's acknowledged on-screen and then discarded when the browser tab closes.

## Local Setup

No installation needed. Download `Volunteer_Compass_AI_Prototype.html` and open it in any modern browser. The AI-powered steps (orientation generation, reflection response, follow-up Q&A) require the browser to reach `api.anthropic.com`; without network access, those steps will show a retry option instead of generated content.

## Deployment Instructions (for a real pilot)

This prototype is not deployed anywhere, by design — but if a nonprofit wanted to actually pilot it, the realistic path would be:

1. Move the contents of `requestClaude()` into a small backend endpoint (a single serverless function is enough — e.g. on Vercel or Netlify) that holds the Anthropic API key server-side.
2. Point the frontend's fetch calls at that endpoint instead of `api.anthropic.com` directly.
3. Host the static frontend on the same platform (Vercel/Netlify both serve static files and serverless functions together).
4. Swap in the organization's real name, logo, and specific onboarding details in place of the demo placeholders.

No database, accounts, or additional infrastructure would be needed for the scope this tool currently covers.

## What Success Looks Like

By the end of this project:
- A real, specific operational challenge nonprofits face (repetitive volunteer onboarding) was identified and grounded in outside research, not assumption.
- The solution was deliberately scoped narrow rather than trying to solve every onboarding-adjacent problem.
- A working, end-to-end prototype exists, covering intake through AI-generated orientation, reflection, follow-up Q&A, and feedback.
- Every product and technical decision in this document can be explained and defended in an interview — including the ones that were deliberately left out.

## Future Improvements (if given another month)

- A real backend endpoint, per the deployment path above, so this could actually be piloted rather than only demoed
- User testing with actual first-time volunteers (and, ideally, a real volunteer coordinator) to validate whether the AI-generated orientation content is actually more useful than a well-written static page — this is an open question this prototype doesn't yet answer
- A lightweight way for a coordinator to add 3–5 organization-specific facts (parking location, check-in process) that the AI could reference directly instead of deferring to "ask staff" every time — without building a full admin dashboard
- Multi-language support, since many volunteer populations aren't primarily English-speaking
- A slightly more structured feedback loop — e.g., aggregating (anonymized, no accounts) before/after ratings across many volunteers to show a coordinator whether the tool is working over time, without storing anything tied to an individual

## Tradeoffs Made

- **Client-side API calls vs. real backend:** chosen for this prototype to keep it a single file with no deployment step, at the explicit cost of not being production-safe. Documented clearly rather than hidden.
- **Structured JSON output vs. free-form AI text:** the orientation is generated as JSON so the UI can render it consistently. This adds a small risk of malformed JSON breaking the render (handled with a retry path) in exchange for a much more polished, predictable UI than parsing free-form prose would allow.
- **No org-specific customization vs. a config/admin layer:** a real pilot would need some way for a coordinator to input their organization's actual facts. Building that well would have meant either a database (explicitly out of scope) or a much more complex config file — so this version stays fully generic and honest about that limitation rather than half-building a customization feature.
