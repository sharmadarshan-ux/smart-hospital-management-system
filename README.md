# QueueCare

> Low-latency, multi-role hospital queue and patient flow orchestration engine.

QueueCare is an offline-resilient, role-based patient queue management system engineered for high-density outpatient departments and emergency triage. Built to replace fragmented paper ticket dispensers and noisy announcement systems with a synchronized local-first pipeline.

Conceived and engineered during a hackathon at **SRM Institute of Science and Technology (Ramapuram Campus)**, designed to address real-world bottlenecking, patient anxiety, and triage routing challenges in clinical environments.

---

## Origin

Built under hackathon constraints at SRM Ramapuram. The objective was straightforward: strip away the bloat of traditional enterprise hospital information systems and build a fast, deterministic queue coordinator that operates cleanly on hospital LANs without depending on external cloud infrastructure.

---

## Highlights

- **Five Tailored Consoles:** Dedicated, isolated workflows for Reception, Doctors, Patients, Public Hall Displays, and Administration.
- **Dynamic ETA Engine:** Real-time wait-time modeling factoring department loads, historical consultation velocities, and emergency prioritization.
- **Bilingual & Accessible:** Full English and Hindi localization with high-contrast, WCAG AA compliant interfaces suitable for public kiosk hardware.
- **Thermal Slip Generation:** Instant printable token slips with scannable QR verification and patient journey indicators.
- **Local-First Resilience:** Designed for unthrottled LAN operation inside hospital intranets without external cloud dependencies.

---

## System Architecture

```
[ Reception Kiosk ] ───( Check-In & Triage )───┐
                                              ▼
[ Public Displays ] ◄───( State Machine / Event Bus )───► [ Doctor Console ]
                                │                                 │
                                ▼                                 ▼
                        [ Patient Web View ]              [ Admin Analytics ]
```

### Module Breakdown

| Interface | Route | Primary Objective |
| :--- | :--- | :--- |
| **Patient Portal** | `/patient` | Mobile-first live queue telemetry, step-by-step visit progress, and dynamic wait times. |
| **Reception Triage** | `/reception` | High-throughput walk-in intake, priority tagging (Normal, Senior, Emergency), and token printing. |
| **Doctor Console** | `/doctor` | Consultation sequencing, one-click caller controls, transfer routing, and clinical notes. |
| **Hall Signage** | `/display` | High-visibility digital signage board designed for waiting hall screens with current token callouts. |
| **Admin Control** | `/admin` | Operational intelligence, department velocity tracking, bottleneck detection, and daily load summaries. |

---

## Tech Stack

- **Runtime & UI:** React 19, TypeScript
- **Tooling:** Vite, Oxlint
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sharmadarshan-ux/smart-hospital-management-system.git
cd smart-hospital-management-system

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## Hackathon & Attribution

- Developed during the Hackathon at **SRM Institute of Science and Technology (Ramapuram Campus)**.
- Focused on public healthcare accessibility and clinical queue optimization.

---

## License

MIT License.
