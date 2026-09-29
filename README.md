# 🛡️ Guardians of Humanity – Smart Missing Person Alert & Response System

> **National Social Impact Innovation Platform (SIH 2026 Ready)**  
> *“Every Second Matters. Report Missing. Act Fast. Save Lives.”*

---

## 🌟 Executive Overview
**Guardians of Humanity** is a real-time emergency response platform connecting families, police stations, transit networks, and the general public to locate missing persons during the crucial **Golden Hour** (the first 3 hours where recovery chances are >85%).

Built with an emergency-grade dark theme (`#030712` midnight aesthetic with pulsating red beacons and emerald resolution badges), glassmorphic panels, and sub-second telemetry.

---

## ⚡ Key Architecture & Features

### 1. 🚨 Dynamic Geo-Fencing Broadcast
- Calculates dynamic geographic radius (5km to 20km) based on elapsed time, transit accessibility, and crowd density.
- Floods cell towers via simulated 3GPP Cell Broadcast SMS, WhatsApp emergency channels, and digital signage without requiring high-speed data.

### 2. 🔐 Zero-Knowledge Aadhaar Verification (UIDAI Integration)
- Eliminates fake reports and pranks through instant cryptographic Aadhaar e-KYC hash authentication (`SHA-256`).
- Under penalty of IPC Section 182 / BNS Section 217.

### 3. 🗺️ Live Incident Telemetry Grid (Interactive Leaflet Radar)
- Dark-mode CartoDB map layers.
- Blinking high-priority red markers with expanding circular geo-fence perimeters.
- Instant jump filters for major metros (Delhi NCR, Mumbai, Bengaluru, Kolkata, Jaipur, Chennai).
- Popup dossiers and instant *"I Have Seen This Person"* sighting reporting.

### 4. 👁️ CCTV AI Vector Match & Police Console
- Simulates edge municipal CCTV nodes comparing live camera feeds against 512-dim facial landmark embeddings with similarity confidence scores (e.g. 91% match flagged at Janpath Metro).
- Station Duty Officer terminal for Level-1 Red Alert authorization and PCR van dispatch.

### 5. 🖨️ Official Emergency Poster Generator
- One-click generation of high-contrast printable police-grade flyers and missing notices with emergency hotlines (112, 1098 Childline, 1090).

### 6. 🔒 Automated Right-To-Be-Forgotten (DPDP Act 2023)
- Public photos and facial embeddings are automatically expunged from edge caches once the individual is safely verified and reunited.

### 7. 🔊 Web Audio API Emergency Siren & Ping Synthesizer
- Built-in dual-tone radar pings and emergency frequencies with mute toggle.

### 8. 🖱️ Custom Emergency Cursor & Animations
- Glowing center dot + trailing outer ring, turns red over urgent items, transforms into radar crosshair on the map, and creates ripples on click.

---

## 🚀 Running the Project

```bash
# Navigate to project directory
cd "C:\Users\Danisha R\.gemini\antigravity\scratch\guardians-of-humanity"

# Start the Vite development server
npm run dev

# Open in browser:
http://localhost:5173
```

---

## 📂 Project Structure

```
guardians-of-humanity/
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx             # Glowing dot + ring cursor with ripple effect
│   │   ├── Navbar.jsx                   # Brand, alert ticker, role switcher, sound toggle
│   │   ├── EmergencyAlertBanner.jsx     # Slide-down urgent banner with audio ping
│   │   ├── HeroSection.jsx              # Radar map canvas, live counters, emergency typography
│   │   ├── LiveRadarMap.jsx             # Leaflet dark map with pulsating radius markers
│   │   ├── HowItWorks.jsx               # 5-step animated response timeline
│   │   ├── Features.jsx                 # 6 technology cards with hover glow
│   │   ├── SuccessStories.jsx           # Emotional before/after story slider + confetti
│   │   ├── SecurityPortal.jsx           # Aadhaar verification demo & DPDP compliance
│   │   ├── MobileBottomNav.jsx          # Mobile sticky bottom bar + floating report button
│   │   ├── Footer.jsx                   # National 112/1098 helplines & legal notices
│   │   └── Dashboard/
│   │       ├── DashboardView.jsx        # Command center layout with sidebar & stat cards
│   │       ├── CaseCard.jsx             # High-tech emergency card with photo & badges
│   │       ├── CaseDetailModal.jsx      # Dossier with AI facial landmark toggle
│   │       ├── ReportMissingModal.jsx   # 4-step emergency reporting wizard
│   │       ├── ReportSightingModal.jsx  # Geotagged sighting submission with photo
│   │       ├── PoliceApprovalPortal.jsx # Police CCTV AI matches & authorization queue
│   │       └── PosterGeneratorModal.jsx # Printable high-contrast missing flyer
│   ├── data/
│   │   └── mockData.js                  # Realistic Indian metro cases, stats & activity feeds
│   ├── utils/
│   │   └── audio.js                     # Web Audio API emergency dual-tone synthesizer
│   ├── App.jsx                          # Main reactive application shell
│   ├── index.css                        # Tailwind v4, glassmorphism, radar pulse keyframes
│   └── main.jsx                         # Application entrypoint
├── index.html                           # Header, Google Fonts, Leaflet CSS
├── package.json                         # Dependencies & scripts
└── vite.config.js                       # Vite + React + Tailwind v4 plugin
```
