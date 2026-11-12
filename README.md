# Aquarius Home Health Care — Official Digital Platform

> **Established in 2016 in Stoney Creek, Ontario.**  
> Dedicated clinical in-home healthcare services for Ontario families and 24/7 institutional surge staffing for hospitals, long-term care homes, retirement residences, and medical clinics.

---

## 🏛️ Executive Architecture & Tech Stack

* **Frontend Framework:** React 19 (Hooks, Concurrent Rendering)
* **Build Tool & Bundler:** Vite 8 (Hot Module Replacement, Rolldown engine)
* **Styling & Design System:** Tailwind CSS with custom Canadian healthcare color grading
* **Iconography:** Lucide React
* **Typography:** Plus Jakarta Sans & Inter (Google Fonts with preconnect optimization)
* **Security & Cryptography:** Browser-native Web Crypto API (`window.crypto`), RFC 4122 UUID v4, OWASP-compliant input sanitization

---

## 🔒 Enterprise Security & Compliance Architecture

The platform is engineered with defence-in-depth security safeguards compliant with **Ontario PHIPA** (*Personal Health Information Protection Act*), **Canadian PIPEDA**, and **OWASP Top 10** standards:

### 1. Cryptographic UUID Ticket Generation
* Every service inquiry, facility dispatch request, and career application generates a cryptographically unique receipt identifier (e.g. `AQ-CARE-XXXXXXXX`, `AQ-DISP-XXXXXXXX`, `AQ-CAREER-XXXXXXXX`).
* Powered by browser-native `window.crypto.randomUUID()` with secure `crypto.getRandomValues()` fallback to prevent ticket predictability or enumeration.

### 2. Multi-Vector XSS & Injection Sanitization
* All user input fields are filtered through `sanitizeInput()` in [`src/utils/security.js`](./src/utils/security.js).
* Strips HTML brackets, `javascript:`, `data:`, `vbscript:`, inline DOM event handlers (`onclick=`, `onerror=`), and script execution blocks.
* Strict input length boundaries prevent buffer bloat and memory exhaustion attacks.

### 3. Client-Side Rate Limiting & Throttling
* Anti-flood throttler (`securityRateLimiter`) prevents automated form spamming and repeated rapid submissions.
* Automatically enforces dynamic countdown cooldown periods between user actions.

### 4. Invisible Anti-Bot Honeypots
* All intake forms embed hidden honeypot traps (`tabIndex={-1}`, hidden from sighted users and assistive tech).
* Submissions with filled honeypots are intercepted and discarded silently before processing.

### 5. Content Security Policy (CSP) & Defense-in-Depth Headers
* Strict CSP meta tags in [`index.html`](./index.html) and edge configuration in [`public/_headers`](./public/_headers) & [`vercel.json`](./vercel.json):
  * `default-src 'self'`
  * `frame-ancestors 'none'` (anti-clickjacking)
  * `object-src 'none'`
  * `X-Content-Type-Options: nosniff` (anti-MIME sniffing)
  * `X-Frame-Options: DENY`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

### 6. Ephemeral Session Audit Logging (Zero-PII Retention)
* Form submissions log structured telemetry into `sessionStorage` with automatic bounds (max 20 entries) without storing sensitive health or personal data, satisfying PHIPA privacy mandates.

### 7. RFC 9116 Security Disclosure Policy
* Compliant security disclosure file at [`public/.well-known/security.txt`](./public/.well-known/security.txt) detailing reporting channels for security researchers.

---

## 📱 Core Modules & Sections

1. **Fixed Responsive Header ([`Navbar.jsx`](./src/components/Navbar.jsx)):**  
   100% viewport-fixed executive header with official Aquarius logo badge, green status indicator, dynamic active section underlines, direct dispatch call (`905-525-5111`), and full-screen mobile drawer with dedicated Lucide icons.

2. **Dual-Audience Hero ([`HeroSection.jsx`](./src/components/HeroSection.jsx)):**  
   Segmented switch between *For Families* (home care) and *For Facilities* (shift staffing).

3. **4 Pillars of Excellence ([`PillarsSection.jsx`](./src/components/PillarsSection.jsx)):**  
   Manifesto detailing Qualified & Screened Staff, Compassion First, 24/7 Continuous Reliability, and Flexible Surge Support.

4. **In-Home Clinical Services ([`DualServicesSection.jsx`](./src/components/DualServicesSection.jsx)):**  
   Detailed cards for Personal Support Workers (PSW), Registered Practical Nurses (RPN), and Registered Nurses (RN).

5. **Healthcare Facilities Section ([`FacilitiesSection.jsx`](./src/components/FacilitiesSection.jsx)):**  
   Dedicated section for hospital wards, LTC homes, and retirement residences with `< 15 Min` confirmation metrics and direct dispatch actions.

6. **Careers & Recruitment Portal ([`CareersSection.jsx`](./src/components/CareersSection.jsx)):**  
   Fast-track clinical recruitment system for Ontario PSWs, RPNs, and RNs with embedded application and credential verification.

7. **60-Second Care Assessment Matcher ([`CareAssessmentWizard.jsx`](./src/components/CareAssessmentWizard.jsx)):**  
   Interactive multi-step triage tool matching family care needs with appropriate clinical staffing levels.

8. **Regional Operations & Coverage ([`ServiceAreaSection.jsx`](./src/components/ServiceAreaSection.jsx)):**  
   Operational HQ card for Stoney Creek, Hamilton, Burlington, Niagara, and surrounding municipalities.

---

## 🛠️ Local Development & Build

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Accessible at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates optimized, minified production assets in the `/dist` directory.

---

## 📍 Headquarters & Dispatch Contact

* **Organization:** Aquarius Home Health Care
* **Operational Address:** 800 Queenston Rd, Unit 309, Stoney Creek, ON L8G-1A7
* **24/7 Dispatch Phone:** (905) 525-5111
* **Email:** scheduling@aquariushomehealth.com
* **Regulatory Compliance:** College of Nurses of Ontario (CNO) standards, Ontario Ministry of Health, PHIPA & PIPEDA
