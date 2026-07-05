# Product Requirements Document
## Volunteer Compass AI

**Status:** Draft — pre-development
**Prepared by:** Akhnaton Eraikhuemen
**Version:** 1.0

---

## Project Overview

Volunteer Compass AI is an AI-powered onboarding assistant for nonprofit volunteer programs. It walks a new volunteer through a short set of questions about their role, experience level, and concerns, then generates a personalized orientation, a practical arrival checklist, and a space for follow-up questions — replacing a generic, one-size-fits-all orientation with something tailored to the individual.

## Problem Statement

Nonprofits depend heavily on volunteers but operate with limited staff time. New volunteers consistently arrive with the same handful of questions — what to wear, where to park, what the shift actually involves, how physically demanding it is. Volunteer coordinators end up answering these same questions repeatedly, which takes time directly away from program delivery and community support. Most organizations address this with a generic orientation that isn't personalized to a volunteer's specific role or concerns, leaving some volunteers over-explained and others under-prepared.

## Goals

- Help first-time volunteers feel informed, confident, and prepared before their first shift
- Reduce the amount of repetitive, logistical explaining volunteer coordinators have to do
- Demonstrate a focused, well-scoped use of AI in a nonprofit operational context — personalization at a level static materials can't reach, without overbuilding

## Target Users

**Primary: first-time volunteer**
- Goals: feel confident, know what to expect, reduce anxiety, arrive prepared
- Pain points: doesn't know what to expect, what to wear, where to park, or how physically demanding the work is

**Secondary: volunteer coordinator**
- Goals: spend less time repeating the same orientation information, reduce repetitive questions, help volunteers arrive ready, support volunteer retention

## User Journey

1. Welcome screen
2. Baseline check-in: "How prepared do you currently feel for your first volunteer shift?" (1–5 stars)
3. Role selection (food sorting, food packing, distribution, office/admin, other)
4. Experience selection (first shift vs. returning volunteer)
5. Concern selection (multi-select: what to wear, parking, physical demands, food safety, working with people, accessibility, or free-text "something else")
6. AI-generated personalized orientation (greeting, day overview, what to wear/bring, safety reminders, a role-specific tip, encouragement)
7. Arrival checklist
8. Reflective closing question ("Is there anything you're still unsure about before your first shift?") with one personalized AI response
9. Optional open follow-up Q&A
10. Post-orientation check-in: the same preparedness question, asked again
11. Closing screen: thank-you message plus a simple before/after comparison

An "About this project" page, reachable at any point, explains the project's purpose, audience, and intentionally narrow scope.

## Functional Requirements

**Must have:**
- Role, experience, and concern intake
- AI-generated, personalized orientation content
- Arrival checklist
- Reflective closing question with a single personalized AI response
- Open-ended follow-up Q&A, scoped to onboarding topics
- Before/after preparedness rating (1–5 stars) with a simple comparison shown at the end
- An About page describing the project's purpose and scope
- A clean, warm, accessible interface

**Nice to have (only if time permits):**
- PDF upload for organization-specific documents
- Save orientation as a PDF
- Dark mode
- Multiple languages
- Admin analytics page

## Non-Functional Requirements

- **Accessibility:** keyboard navigable, visible focus states, sufficient color contrast (WCAG AA), semantic HTML, appropriate ARIA labeling, and a logical heading hierarchy
- **Responsiveness:** usable on mobile without horizontal overflow, with tap targets sized for touch
- **Reliability of AI output:** AI-generated content should be structured predictably enough to render consistently, with a graceful retry path if generation fails
- **Transparency:** AI responses should communicate appropriate uncertainty rather than presenting invented specifics as fact
- **Performance:** each step should feel near-instant except where an AI call is genuinely in progress, which should be clearly signaled

## MVP Scope

The MVP is intake (role, experience, concerns) → AI-generated orientation → checklist → reflective question → optional Q&A → before/after feedback. Everything in this document's "Must have" list defines the MVP boundary.

## Out-of-Scope Features

The following are deliberately excluded, to keep the MVP focused and to demonstrate scoping discipline rather than feature creep:

- Volunteer scheduling
- Volunteer registration
- User accounts or authentication
- A database or any persistence layer
- Calendar integration
- Eligibility screening for services
- Donation management
- Admin dashboards or analytics

## Success Metrics

- A first-time volunteer can complete the experience in roughly 2–3 minutes
- Volunteers report feeling more prepared after the experience than before (captured directly via the before/after rating)
- The tool can be demonstrated end-to-end without relying on any real organizational data or partnership

## Technical Architecture (High Level)

- **Frontend:** HTML, CSS, and JavaScript, built as a single-page, state-machine-driven interface (no framework required at this scope)
- **AI:** Claude, called to generate the personalized orientation, the reflective response, and follow-up Q&A answers
- **Backend:** for a real deployment, a small server or serverless function should sit between the frontend and the Claude API, so the API key is never exposed client-side. For an initial prototype/demo, a direct client-side call is acceptable only because no real key or hosted deployment is at risk.
- **Deployment (intended, for a real pilot):** static frontend hosting (e.g., Vercel or Netlify) with a paired backend endpoint for AI requests
- **Data:** no database; all state is held in memory for the duration of a single session and discarded afterward

## Risks and Assumptions

**Risks:**
- AI-generated content could include invented, organization-specific details if not carefully constrained — mitigated by explicit prompt instructions to avoid fabricating specifics and to defer to staff where appropriate
- A generic AI tone could feel impersonal if not deliberately designed for warmth
- Client-side API calls are not production-safe and must not be mistaken for a deployment-ready architecture

**Assumptions:**
- Volunteers have access to a smartphone or computer before their shift
- A short, structured intake (role/experience/concerns) is sufficient signal to meaningfully personalize an orientation
- Organizations would be willing to provide a small set of accurate facts (parking, check-in process) if this were adapted for real use
