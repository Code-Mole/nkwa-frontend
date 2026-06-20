# Nkwa Frontend

React frontend for **Nkwa**, a GenAI emergency dispatch copilot for Ghana's
112 emergency line. This package contains two surfaces:

- **Caller web app** (`/call`) — the browser page a person opens on their
  phone to place a 112 call.
- **Dispatcher dashboard** (`/dashboard`) — the live operations view
  dispatchers and judges watch during the demo.

Both are designed to match the existing mobile app's visual identity
(purple gradient headers, soft pastel icon badges, rounded white cards).

## Setup

This was scaffolded in a sandboxed environment with no npm registry
access, so dependencies have **not** been installed yet. On your machine,
with normal internet access:

```bash
cd nkwa-frontend
npm install
npm run dev
```

Then open:
- `http://localhost:5173/` — internal launcher (pick a surface)
- `http://localhost:5173/call` — caller web app
- `http://localhost:5173/dashboard` — dispatcher dashboard

## Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS (utility classes, theme tokens in `tailwind.config.js`)
- lucide-react for icons

## Design system

All visual tokens live in `tailwind.config.js` under `theme.extend.colors`,
extracted from the mobile app screens:

| Token | Use |
|---|---|
| `nkwa-500` / `nkwa-600` / `nkwa-700` | Primary brand purple ramp — buttons, active nav, gradient header |
| `surface` / `surface.card` | Page background (light lavender) / white cards |
| `severity.critical` / `urgent` / `nonEmergency` / `prank` | Triage colour coding — red / amber / green / grey |
| `service.ambulance` / `fire` / `police` / `sos` | Service icon badge colours, matching mobile Home screen |
| `ink-900` / `700` / `500` / `300` | Text colour scale |

Shared components in `src/components/shared/`:
- `Button` — pill-shaped gradient primary button, plus secondary/ghost/danger/outline variants
- `Card` — white rounded container
- `GradientHeader` — the purple curved header block used on most mobile screens
- `SeverityBadge` — CRITICAL / URGENT / NON_EMERGENCY / PRANK pill, used identically on both surfaces
- `IconBadge` — soft coloured icon container (ambulance/fire/police/sos)
- `Pill` — small chip for tags/filters/language selectors
- `EmptyState` — empty list/queue placeholder

## Project structure

```
src/
  components/
    shared/      — design-system primitives used by both surfaces
    caller/      — caller web app specific components (stage 2)
    dashboard/   — dispatcher dashboard specific components (stage 3)
  pages/
    Launcher.jsx — dev/demo screen to switch between surfaces
    CallerApp.jsx
    Dashboard.jsx
  context/       — shared app state (mock call store, stage 4)
  data/          — mock data + simulated WebSocket events (stage 4)
  hooks/
  utils/
  styles/index.css — Tailwind directives + global base styles
```

## Caller web app flow (stage 2)

`src/pages/CallerApp.jsx` drives a small state machine (`src/hooks/useCallFlow.js`)
through five screens:

1. **Select** — pick a service (Ambulance/Fire/Police/SOS) and a language (English/Twi/Ga/Ewe)
2. **Permissions** — requests real browser mic + geolocation permission (will prompt the actual browser dialogs)
3. **Ready** — large tap-to-call button, matches mobile call screen
4. **Active** — live call view with pulsing call button and a first-aid guidance panel that steps through a mock script over time
5. **Ended** — confirmation screen

Mic and GPS permission requests are real (`navigator.mediaDevices.getUserMedia`,
`navigator.geolocation`) and will trigger genuine browser permission prompts —
worth testing on an actual phone browser, not just desktop Chrome, since
permission UX differs.

Every point where this currently fakes a backend response is marked with a
`// BACKEND TODO` comment, concentrated in `useCallFlow.js` and
`InCallGuidance.jsx`. Search for that tag to find: call-init request,
audio/GPS streaming, and where the AI-driven first-aid script should replace
the local mock timer.

## Backend integration points

Every place the frontend needs a real backend call is marked in code with:

```js
// BACKEND TODO: <description>
```

Search the codebase for `BACKEND TODO` to find every integration point
once your AWS account and API endpoints are ready.

## Build status

- [x] Stage 1 — project scaffold + design system
- [x] Stage 2 — Caller web app
- [ ] Stage 3 — Dispatcher dashboard
- [ ] Stage 4 — mock data, simulated WebSocket events, polish
