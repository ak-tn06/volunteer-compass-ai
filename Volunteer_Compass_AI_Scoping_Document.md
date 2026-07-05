# Project Scoping Document
## Volunteer Compass AI

**Status:** Draft — pre-development
**Prepared by:** Akhnaton Eraikhuemen

---

## Background

Volunteer-dependent nonprofits — food banks in particular — have faced a sustained volunteer shortage since the pandemic, with volunteer numbers down significantly and not fully recovered even as demand for services has grown. At the same time, onboarding for new volunteers is often handled informally: a brief verbal orientation covering the same logistical points for every volunteer, regardless of their role or what they're actually unsure about.

## Problem Discovery

Talking through this space surfaced a consistent pattern: the questions a new volunteer has (what to wear, where to park, how physically demanding the work is, what the day actually looks like) are highly predictable in category but vary in emphasis by role and by individual. A food-sorting volunteer worried about physical strain needs different reassurance than an office volunteer worried about parking. Coordinators end up re-explaining the same categories of information to every new volunteer, one at a time, which is a poor use of limited staff time.

## Why This Problem Matters

Poor onboarding has a direct link to volunteer retention: a volunteer who feels unprepared or overwhelmed on their first shift is less likely to return. For organizations that already struggle to recruit and retain volunteers, losing people at the very first touchpoint is an expensive, avoidable failure. It's also a problem that's easy for well-resourced organizations to solve with dedicated onboarding staff, and correspondingly hard for smaller, leaner nonprofits — which makes it a good candidate for a lightweight tool rather than a process fix that assumes staff bandwidth that doesn't exist.

## Why AI Is Appropriate

This is a case where the underlying task (explaining onboarding logistics) is repetitive, but the right answer depends on context (role, experience level, specific concerns) in a way that a single static page can't capture well. Writing every combination of role × experience × concern by hand ahead of time would be a lot of manual content work for marginal benefit. AI is well-suited specifically because it can generate a tailored response from a handful of inputs instantly, without a human needing to author every permutation in advance — and because onboarding content, unlike operational decisions or eligibility determinations, has low stakes if imperfect and can always defer to staff for anything specific.

## Alternative Solutions Considered

- **A longer, more detailed static FAQ page.** Rejected: still one-size-fits-all, and long FAQ pages tend to go unread by anxious first-time volunteers who want to be told what applies to *them*, not to search through everything that might.
- **A printed onboarding packet per role.** Rejected: better than a single generic page, but still requires staff time to write, maintain, and update per role, and doesn't handle individual concerns (e.g., accessibility, a specific worry) at all.
- **A live chatbot with no structured intake, just open Q&A.** Rejected: without structured intake first, the AI has no context about the volunteer's role or experience level, and volunteers may not know what to ask if they don't know what they don't know. Structured intake surfaces the right questions before the volunteer has to think of them.
- **A full volunteer management platform with onboarding as one feature.** Rejected as an MVP: far too large in scope, and most of that platform (scheduling, registration, accounts) isn't the actual problem being solved here.

## Proposed Solution

A short, structured, conversational web tool: the volunteer answers a few quick questions (role, experience, concerns), receives an AI-generated personalized orientation and arrival checklist, has room for one reflective closing question and any open follow-up questions, and closes with a simple before/after measure of how prepared they feel. No accounts, no database, no integration with real organizational systems — a focused single-purpose tool that could realistically be piloted by a small nonprofit without engineering support on their end.

## Project Constraints

- Built and evaluated as a solo project within a short timeframe, without a dedicated backend engineer or design team
- No real organizational partnership or real volunteer data available during development — the prototype must be built and validated using a generic, clearly-labeled demo organization
- No budget for hosting, a database, or paid infrastructure during the prototype phase
- Must be demonstrable as a single, self-contained artifact rather than a deployed, maintained service

## Timeline

- **Days 1–2:** Problem research and scoping (this document and the accompanying PRD)
- **Days 2–4:** Core build — intake flow, AI orientation generation, checklist, reflective question, follow-up Q&A
- **Day 5:** Feedback loop (before/after rating), About page, polish pass (accessibility, mobile, visual consistency)
- **Day 6:** Documentation (README), self-review, and preparation for presentation/demo

This is an MVP timeline measured in days, not weeks — consistent with the goal of proving the concept, not shipping a production system.

## Risks

- **Hallucinated specificity:** without careful prompt design, the AI could state organization-specific "facts" (exact addresses, named staff, specific policies) it has no way of actually knowing. Mitigation: explicit, consistent prompt instructions to acknowledge uncertainty and defer to staff for anything organization-specific.
- **Impersonal tone:** AI-generated text can read as generic or corporate if not deliberately guided toward warmth. Mitigation: prompt design and UI copy both reinforce a supportive, conversational tone rather than a form-letter one.
- **Security misconception:** calling an AI API directly from the browser (acceptable for this prototype) could be mistaken for a production-ready pattern if not clearly documented as a prototype-only shortcut.
- **Scope creep:** the temptation to add accounts, scheduling, or an admin dashboard to make the project look more "complete." Mitigation: an explicit, written out-of-scope list, treated as a real constraint rather than a suggestion.

## Future Improvements

- A real backend endpoint so the tool could be safely piloted rather than only demoed
- Actual user testing with first-time volunteers and a real volunteer coordinator, since this prototype's assumptions haven't yet been validated with real users
- A lightweight way for a coordinator to supply a handful of organization-specific facts (parking location, check-in process) without building a full admin system
- Multi-language support
- Aggregated, anonymized before/after ratings across volunteers, to show a coordinator whether the tool is working over time — without attaching any of that data to an individual

## Reflection on Design Tradeoffs

The central tradeoff in this project is between realism and scope discipline. A tool this narrow will inevitably raise the question "why doesn't it also do X" — scheduling, registration, org-specific customization. Each of those is a reasonable feature for a mature product, and each was deliberately left out here, because a nonprofit evaluating a pilot tool benefits far more from something that does one thing well and predictably than from something that tries to do everything and does most of it shallowly. The same logic applies to the client-side AI call: it's the wrong architecture for production, but the right one for proving the concept quickly, provided it's documented honestly rather than presented as deployment-ready. Good scoping, in this project, meant treating "what we're not building" as seriously as "what we are."
