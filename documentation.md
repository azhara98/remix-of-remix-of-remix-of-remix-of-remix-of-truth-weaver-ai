# TruthLens AI Fact Checker - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Components Reference](#components-reference)
6. [Hooks & State Management](#hooks--state-management)
7. [Workflows & User Flows](#workflows--user-flows)
8. [Data Models & Types](#data-models--types)
9. [Routing](#routing)
10. [Styling & Design System](#styling--design-system)
11. [Persistence & Storage](#persistence--storage)

---

## Project Overview

**TruthLens** is an AI-powered fake news detection and fact-checking web application. It analyzes news articles, URLs, and text content to provide credibility scores, source verification, and detailed analysis reports.

### Key Capabilities
- Real-time news verification and fact-checking
- Multi-format content analysis (text, URL, image, video, audio)
- AI-powered language pattern and sentiment analysis
- Source cross-referencing against trusted news outlets
- Persistent search history with instant result recall
- Single-page interactive verification workflow

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.3.1 |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + CSS Variables |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM v6 |
| **State Management** | React Context API + useState/useCallback |
| **Data Fetching** | TanStack React Query |
| **Form Handling** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Notifications** | Sonner + Custom Toast |

---

## Project Structure

```
src/
├── assets/                    # Static assets (images)
│   └── hero-bg.jpg
├── components/
│   ├── ui/                    # shadcn/ui components (60+ components)
│   ├── AboutSection.tsx       # About page content
│   ├── AnalysisResultCard.tsx # Individual result display
│   ├── AnalyzeOptionsPopover.tsx # Media upload options
│   ├── DashboardMetrics.tsx   # Platform statistics display
│   ├── Features.tsx           # Feature showcase section
│   ├── Footer.tsx             # Site footer
│   ├── FullReportSection.tsx  # Complete analysis report
│   ├── Header.tsx             # Navigation header
│   ├── HeroSection.tsx        # Main input & results area
│   ├── HowItWorks.tsx         # Process explanation
│   ├── Logo.tsx               # Brand logo component
│   ├── NavLink.tsx            # Navigation link component
│   ├── RealTimeNews.tsx       # Live news feed
│   ├── RecentSearchesPanel.tsx # Search history panel
│   ├── SettingsDropdown.tsx   # Settings menu
│   ├── ShareDropdown.tsx      # Share options
│   └── VerificationProgress.tsx # Analysis progress stepper
├── contexts/
│   └── SearchHistoryContext.tsx # Search history state
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection
│   ├── use-toast.ts           # Toast notifications
│   └── useNewsAnalysis.ts     # Core analysis logic
├── lib/
│   └── utils.ts               # Utility functions (cn)
├── pages/
│   ├── AnalysisResults.tsx    # Results page (legacy)
│   ├── Auth.tsx               # Authentication page
│   ├── DetailedReport.tsx     # Detailed report (legacy)
│   ├── Index.tsx              # Main landing page
│   ├── NotFound.tsx           # 404 page
│   └── Settings.tsx           # User settings
├── test/
│   ├── example.test.ts        # Example test
│   └── setup.ts               # Test configuration
├── App.tsx                    # App root with providers
├── App.css                    # Global styles
├── index.css                  # Tailwind + CSS variables
└── main.tsx                   # React entry point
```

---

## Core Features

### 1. News Analysis Engine
**File:** `src/hooks/useNewsAnalysis.ts`

The core verification engine that simulates a multi-step fact-checking process:

**Verification Pipeline (5 Steps):**
1. **Search Trusted Sources** (8-12s) - Queries major news databases
2. **Verify Across Outlets** (6-10s) - Compares headlines and content
3. **Cross-Reference Fact-Checks** (5-8s) - Checks Alt News, Boom Live, AFP
4. **AI Analysis** (8-12s) - NLP language pattern analysis
5. **Compile Report** (2-3s) - Generates final verification report

**Trusted Sources Database:**
- National: Times of India, The Hindu, NDTV, India Today
- International: Reuters India
- News Agency: PTI News
- Fact-Checkers: Alt News, Boom Live, India Fact Check, AFP Fact Check

### 2. Single-Page Verification Workflow
**File:** `src/components/HeroSection.tsx`

The entire verification experience happens on one page:
- Input section with search bar and media upload options
- Real-time verification progress with animated stepper
- Auto-appearing full report below progress
- Action buttons for download, share, and re-analysis

### 3. Persistent Search History
**File:** `src/contexts/SearchHistoryContext.tsx`

- Stores up to 10 recent searches in localStorage
- Persists full analysis results with each entry
- Instant recall - clicking history item loads cached result
- Survives page refresh and browser restart

### 4. Multi-Format Content Input
**File:** `src/components/AnalyzeOptionsPopover.tsx`

Supports multiple input methods:
- **Text Input** - Direct text/headline entry
- **URL Input** - News article URLs
- **Camera** - Live image capture
- **Image Upload** - Image file analysis
- **Video Upload** - Video file analysis
- **Audio Upload** - Audio file analysis
- **Link Paste** - Quick URL entry

### 5. Comprehensive Report Display
**File:** `src/components/FullReportSection.tsx`

Displays all report sections in a single scrollable view:
- Verdict header with credibility score
- Quick stats (sources checked, confirming, disputing)
- Summary section
- Sources checked with individual status
- AI Analysis scores (Language, Claims, Tone, Credibility)
- Recommendations

---

## Components Reference

### Layout Components

#### `Header.tsx`
- Fixed navigation header with glass-morphism effect
- Desktop and mobile responsive layouts
- Navigation links: How it Works, Features, About
- Recent Searches panel integration
- Settings and authentication buttons

#### `Footer.tsx`
- Multi-column link layout (Product, Resources, Company, Legal)
- Social media links (Twitter, GitHub, LinkedIn)
- Brand description and copyright

#### `Logo.tsx`
- Brand logo with brain circuit icon
- Animated sparkle indicator
- "TruthLens - AI Fact Checker" branding

### Main Content Components

#### `HeroSection.tsx`
**The core interactive component handling:**
- Animated gradient background with neural network effect
- Search input with real-time validation
- Integration with `useNewsAnalysis` hook
- Conditional rendering of:
  - Input form (when idle)
  - `VerificationProgress` (during analysis)
  - `FullReportSection` (when results ready)
- History item selection handling
- Auto-scroll to results

#### `VerificationProgress.tsx`
Animated progress stepper showing:
- 5 verification steps with icons
- Active/completed/pending states
- Real-time status updates
- Overall progress percentage bar
- Smooth enter/exit animations

#### `FullReportSection.tsx`
Complete report display with:
- **Verdict Card** - Icon, label, credibility score, description
- **Action Buttons** - Download, Share, Check Another, Re-run
- **Quick Stats** - Sources checked, confirming, disputing
- **Summary Card** - Analysis summary text
- **Sources Card** - List of all checked sources with status
- **AI Analysis Card** - 4 score cards with findings
- **Recommendations Card** - Numbered action items

#### `RecentSearchesPanel.tsx`
Popover panel with:
- History icon with count badge
- "+ New Analysis" button
- Scrollable history list
- Per-item: shortened query, timestamp, verdict icon, credibility score
- Clear history button

#### `AnalyzeOptionsPopover.tsx`
Media upload popover with:
- Camera capture
- Image/Video/Audio file upload
- Link paste dialog
- Toast notifications on selection

### Landing Page Sections

#### `DashboardMetrics.tsx`
Platform statistics display:
- 99.2% Detection Accuracy
- 10M+ Articles Analyzed
- <30s Average Analysis Time

#### `RealTimeNews.tsx`
Live news feed with:
- Category filtering (All, Politics, Sports, Entertainment, Economy, Health)
- Mock news items with credibility check buttons
- Per-item: title, source, timestamp, category badge

#### `HowItWorks.tsx`
4-step process explanation:
1. Submit Content
2. NLP Analysis
3. Fact Verification
4. Get Results

#### `Features.tsx`
8-feature grid:
- Real-Time Detection, Global Coverage, Multi-Language
- Credibility Scoring, Source Verification, Bias Detection
- Historical Context, Privacy First

#### `AboutSection.tsx`
Comprehensive about section:
- Mission statement
- Analysis capabilities (Text, URL, Image, Video, Audio, Bias)
- Key benefits list
- Target users (Students, Journalists, General Public)

---

## Hooks & State Management

### `useNewsAnalysis.ts`

**State Interface:**
```typescript
type AnalysisState = {
  isAnalyzing: boolean;      // Analysis in progress
  currentStep: number;       // Current step index (0-4)
  steps: VerificationStep[]; // All verification steps
  result: AnalysisResult | null; // Final analysis result
  error: string | null;      // Error message if failed
};
```

**Returned Methods:**
- `analyze(content: string)` - Starts analysis workflow
- `reset()` - Clears all state
- `setResult(result)` - Manually sets result (for history recall)

### `SearchHistoryContext.tsx`

**Context Interface:**
```typescript
interface SearchHistoryContextType {
  history: SearchHistoryItem[];           // All history items
  addToHistory: (query, result?) => string; // Add new entry
  updateHistoryResult: (id, result) => void; // Update existing
  clearHistory: () => void;               // Clear all
  selectedHistoryItem: SearchHistoryItem | null;
  setSelectedHistoryItem: (item) => void;
  getHistoryItemById: (id) => SearchHistoryItem | undefined;
}
```

**Storage Key:** `truthlens_search_history`

---

## Workflows & User Flows

### Primary Analysis Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. ENTER CONTENT                                               │
│     └─→ Text input OR URL OR Media upload                       │
│                                                                 │
│  2. CLICK "ANALYZE NOW"                                         │
│     └─→ Validates input                                         │
│     └─→ Adds to history (without result)                        │
│     └─→ Starts analysis                                         │
│                                                                 │
│  3. VIEW PROGRESS                                               │
│     └─→ Step 1: Searching trusted sources (8-12s)               │
│     └─→ Step 2: Verifying across outlets (6-10s)                │
│     └─→ Step 3: Cross-referencing fact-checks (5-8s)            │
│     └─→ Step 4: AI analyzing content (8-12s)                    │
│     └─→ Step 5: Compiling report (2-3s)                         │
│                                                                 │
│  4. VIEW RESULTS (auto-appears)                                 │
│     └─→ Verdict + Credibility Score                             │
│     └─→ Summary                                                 │
│     └─→ Sources Checked                                         │
│     └─→ AI Analysis Scores                                      │
│     └─→ Recommendations                                         │
│                                                                 │
│  5. TAKE ACTION                                                 │
│     └─→ Download Report (TXT)                                   │
│     └─→ Share Results                                           │
│     └─→ Check Another Article                                   │
│     └─→ Re-run Analysis                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### History Recall Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    HISTORY RECALL FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Click History Icon (top-right)                              │
│     └─→ Popover opens showing recent searches                   │
│                                                                 │
│  2. Click History Item                                          │
│     └─→ If has stored result:                                   │
│         └─→ Instantly display cached report                     │
│     └─→ If no stored result:                                    │
│         └─→ Show "Click to re-analyze" prompt                   │
│                                                                 │
│  3. View Cached Report                                          │
│     └─→ Same full report display                                │
│     └─→ "Re-run" button available for fresh analysis            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Models & Types

### `AnalysisResult`
```typescript
type AnalysisResult = {
  verdict: "real" | "fake" | "misleading" | "unverified";
  credibilityScore: number; // 0-100
  sourceVerification: {
    totalSourcesChecked: number;
    confirmingSources: number;
    disputingSources: number;
    crossPlatformConsistency: number; // 0-100
    trustedSources: TrustedSource[];
  };
  aiAnalysis: {
    languagePatterns: { score: number; findings: string[]; };
    claimConsistency: { score: number; findings: string[]; };
    emotionalTone: { score: number; tone: string; findings: string[]; };
    credibilityIndicators: { score: number; findings: string[]; };
  };
  summary: string;
  recommendations: string[];
};
```

### `TrustedSource`
```typescript
type TrustedSource = {
  name: string;        // e.g., "Times of India"
  url: string;         // Source URL
  found: boolean;      // Whether source was found
  matchScore: number;  // 0-100 match percentage
  reportType: "confirms" | "disputes" | "unrelated" | "not_found";
  snippet?: string;    // Relevant quote from source
};
```

### `VerificationStep`
```typescript
type VerificationStep = {
  id: string;          // e.g., "search", "verify", "analyze"
  label: string;       // Display label
  status: "pending" | "active" | "completed" | "error";
  details?: string;    // Current status message
  sources?: TrustedSource[]; // Sources found (for verify step)
};
```

### `SearchHistoryItem`
```typescript
interface SearchHistoryItem {
  id: string;          // Unique ID (timestamp-based)
  query: string;       // Search query or URL
  timestamp: Date;     // When searched
  type: "url" | "text"; // Content type
  result?: AnalysisResult; // Cached result
}
```

---

## Routing

**File:** `src/App.tsx`

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` | Main landing page with analysis |
| `/auth` | `Auth` | Sign in / Sign up page |
| `/results` | `AnalysisResults` | Legacy results page |
| `/report` | `DetailedReport` | Legacy detailed report |
| `/settings` | `Settings` | User preferences |
| `*` | `NotFound` | 404 page |

**Note:** The primary workflow now happens entirely on the Index page (`/`). The `/results` and `/report` routes are legacy and may be deprecated.

---

## Styling & Design System

### Color Palette (CSS Variables)
```css
/* Light Mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--secondary: 175 71% 41%;     /* Teal accent */
--accent: 217 91% 60%;        /* Blue accent */
--success: 142 76% 36%;       /* Green */
--destructive: 0 84% 60%;     /* Red */
--warning: 38 92% 50%;        /* Orange */
```

### Typography
- **Display Font:** `font-display` class for headings
- **Body Font:** System default sans-serif

### Animation Classes
- `animate-pulse` - Pulsing effect
- `animate-spin` - Loading spinner
- Framer Motion for complex animations

### Utility Classes
- `gradient-glass` - Glass-morphism effect
- `gradient-card` - Card with gradient background
- `shadow-soft` - Subtle shadow
- `shadow-glow` - Glowing shadow effect
- `text-gradient` - Gradient text effect

---

## Persistence & Storage

### localStorage Usage

**Key:** `truthlens_search_history`

**Structure:**
```json
[
  {
    "id": "1706123456789",
    "query": "https://example.com/article",
    "timestamp": "2024-01-24T10:30:00.000Z",
    "type": "url",
    "result": {
      "verdict": "real",
      "credibilityScore": 85,
      "sourceVerification": {...},
      "aiAnalysis": {...},
      "summary": "...",
      "recommendations": [...]
    }
  }
]
```

**Limits:**
- Maximum 10 items stored
- Oldest items removed when limit exceeded
- Full `AnalysisResult` object stored with each entry

---

## Authentication (Placeholder)

**File:** `src/pages/Auth.tsx`

Current implementation is a UI placeholder:
- Mobile number + password authentication
- Sign in / Sign up toggle
- Form validation (10-digit mobile, 6+ char password)
- Simulated authentication (no backend)

**Future Integration:** Connect to Lovable Cloud for real authentication.

---

## Settings

**File:** `src/pages/Settings.tsx`

Available settings:
1. **Language** - English / Tamil (தமிழ்)
2. **Notifications** - Push notification toggle
3. **Theme** - Light / Dark mode

Theme changes apply immediately via `document.documentElement.classList`.

---

## Future Enhancements

1. **Backend Integration** - Connect to Lovable Cloud for real AI analysis
2. **User Authentication** - Implement real auth with session management
3. **Database Storage** - Move history from localStorage to cloud database
4. **Real API Integration** - Connect to actual fact-checking APIs
5. **Multi-language Analysis** - Support content in multiple languages
6. **Browser Extension** - One-click verification from any page

---

*Documentation generated for TruthLens AI Fact Checker v1.0*
*Last updated: February 2024*
