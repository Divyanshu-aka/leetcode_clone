# Project Interview Analysis — LeetLab (LeetCode Clone)
### Prepared for: Infosys Specialist Programmer (SP) Interview

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Purpose](#2-project-purpose)
3. [Complete Technology Stack](#3-complete-technology-stack)
4. [Repository Structure](#4-repository-structure)
5. [System Architecture](#5-system-architecture)
6. [Component-by-Component Analysis](#6-component-by-component-analysis)
7. [Complete Data Flow](#7-complete-data-flow)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Backend Architecture](#9-backend-architecture)
10. [API Architecture](#10-api-architecture)
11. [Database Architecture](#11-database-architecture)
12. [ORM / Database Access](#12-orm--database-access)
13. [Authentication & Security](#13-authentication--security)
14. [Webhooks](#14-webhooks)
15. [Real-Time Communication](#15-real-time-communication)
16. [Async Programming](#16-async-programming)
17. [External Services](#17-external-services)
18. [AI / RAG](#18-ai--rag)
19. [Docker & Infrastructure](#19-docker--infrastructure)
20. [Deployment](#20-deployment)
21. [Code Structure](#21-code-structure)
22. [Design Patterns](#22-design-patterns)
23. [Core Technology Concepts](#23-core-technology-concepts)
24. [Design Decisions & Trade-offs](#24-design-decisions--trade-offs)
25. [Performance](#25-performance)
26. [Scalability](#26-scalability)
27. [Error Handling](#27-error-handling)
28. [Testing](#28-testing)
29. [Potential Improvements](#29-potential-improvements)
30. [Technical Challenges](#30-technical-challenges)
31. [Project Explanation — 30 Seconds](#31-project-explanation--30-seconds)
32. [Project Explanation — 1 Minute](#32-project-explanation--1-minute)
33. [Project Explanation — 3 Minutes](#33-project-explanation--3-minutes)
34. [Infosys SP Interview Questions](#34-infosys-sp-interview-questions)
35. [Scenario-Based Questions](#35-scenario-based-questions)
36. [Why-Questions](#36-why-questions)
37. [Beginner Explanation](#37-beginner-explanation)
38. [Glossary](#38-glossary)
39. [Final Interview Cheat Sheet](#39-final-interview-cheat-sheet)

---

## 1. Executive Summary

**LeetLab** is a full-stack web application that clones the core features of LeetCode — a competitive programming and interview-prep platform. It allows users to browse coding problems, write solutions in a browser-based code editor, execute their code against hidden test cases, track submissions, and organize problems into personal playlists.

The project is a **two-tier client-server application**:
- **Frontend**: React 19 + Vite + Zustand + TailwindCSS/DaisyUI
- **Backend**: Node.js + Express 5 + Prisma ORM + PostgreSQL
- **External Code Judge**: Judge0 (self-hosted or API)
- **Email**: Nodemailer + Mailtrap (SMTP relay)

The code is well-structured but has several incomplete features (e.g., `updateProblem` is an empty function, `resendVerificationEmail` still uses a Mongoose-style `User.findOne` which would crash, discussion tabs are placeholders). These are important to acknowledge honestly in the interview.

---

## 2. Project Purpose

**Problem it solves**: Competitive programming platforms like LeetCode are proprietary. This project builds a functional, self-hosted alternative that demonstrates:

- Full-stack engineering (React + Node.js)
- Database design with relationships
- JWT-based authentication
- Integration with a real code execution API (Judge0)
- Role-based access control (Admin vs User)
- Playlist/bookmark management for problems

**Name used in UI**: `LeetLab` (seen in HomePage.jsx: *"Welcome to LeetLab"*)

---

## 3. Complete Technology Stack

### Languages

| Language | Where Used | Why |
|---|---|---|
| JavaScript (ES Modules) | Backend (Node.js) + Frontend (React) | Universal JS across stack, no need for separate backend language |
| JSX | Frontend React components | JSX extends JS to write HTML-like UI in JavaScript |
| SQL (via Prisma) | Database queries | PostgreSQL is relational, SQL is the query language |

### Frontend

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| React | 19.1.0 | UI component library | Component-based, huge ecosystem, virtual DOM for efficient updates |
| React DOM | 19.1.0 | Renders React to browser DOM | Necessary companion to React |
| React Router DOM | 7.6.3 | Client-side routing (SPA navigation) | Declarative routing, no page reloads |
| Vite | 7.0.4 | Build tool and dev server | Extremely fast HMR, ES module native |
| Tailwind CSS | 4.1.11 | Utility-first CSS framework | Rapid UI development with pre-defined utility classes |
| DaisyUI | 5.0.46 | Component library built on Tailwind | Pre-built UI components (buttons, modals, tables, badges) |
| Zustand | 5.0.6 | Global state management | Lightweight, simpler than Redux, no boilerplate |
| Axios | 1.10.0 | HTTP client for API calls | Promise-based, interceptors, better than native `fetch` for large apps |
| React Hook Form | 7.60.0 | Form state management | Performant forms, minimal re-renders |
| Zod | 4.0.5 | Schema validation | Type-safe frontend validation that integrates with React Hook Form |
| @hookform/resolvers | 5.1.1 | Bridges Zod + React Hook Form | Needed adapter |
| @monaco-editor/react | 4.7.0 | VS Code-like browser code editor | Same editor as VS Code, rich syntax highlighting, language support |
| react-hot-toast | 2.5.2 | Toast notifications | Non-intrusive user feedback |
| lucide-react | 0.525.0 | Icon library | Clean, consistent SVG icons |

### Backend

| Technology | Version | Role | Why Chosen |
|---|---|---|---|
| Node.js | runtime | JS runtime for server | Non-blocking I/O, same language as frontend |
| Express | 5.1.0 | Web framework | Minimal, flexible, vast middleware ecosystem |
| Nodemon | dev | Auto-restart on file changes | Developer experience improvement |
| cookie-parser | 1.4.7 | Parse HTTP cookies | Needed to extract JWT from cookies |
| cors | 2.8.5 | Cross-Origin Resource Sharing | Allows frontend (different port) to call backend |
| dotenv | 17.2.0 | Load environment variables | Secrets management |
| bcryptjs | 3.0.2 | Password hashing | Industry-standard slow hash algorithm for passwords |
| jsonwebtoken | 9.0.2 | Create and verify JWTs | Stateless authentication tokens |
| express-validator | 7.2.1 | Input validation middleware | Validate request bodies before they reach controllers |
| axios | 1.10.0 | HTTP client (calls Judge0 API) | Makes HTTP requests to Judge0 from the backend |
| nodemailer | 7.0.5 | Send emails via SMTP | Email verification and password reset |
| mailgen | 2.0.29 | Generate beautiful HTML emails | Templates for verification/reset emails |
| crypto | built-in Node.js | Generate random tokens | Email verification tokens, password reset tokens |

### Database

| Technology | Role |
|---|---|
| PostgreSQL | Primary relational database — stores all application data |
| Prisma ORM | Database access layer — type-safe queries, migrations, schema |

### External Services

| Service | Role |
|---|---|
| Judge0 | Code execution engine — runs user-submitted code against test cases |
| Mailtrap | SMTP email sandbox — receives verification emails in dev without real delivery |

### Infrastructure / Dev Tools

| Tool | Role |
|---|---|
| VS Code Dev Tunnels | Exposes localhost to internet for testing (tunnel URLs in cors config) |
| Cloudflare Tunnel | Alternative tunnel for public URL access |
| ESLint | JavaScript linting for code quality |

---

## 4. Repository Structure

```
leetcode_clone/
├── Backend/
│   ├── .gitignore
│   ├── package.json              ← Backend dependencies, "type": "module" (ES Modules)
│   ├── package-lock.json
│   ├── prisma/
│   │   ├── schema.prisma         ← Database schema definition (source of truth)
│   │   └── migrations/           ← SQL migration history (6 migrations total)
│   └── src/
│       ├── index.js              ← Express app entry point, middleware registration, global error handler
│       ├── controllers/
│       │   ├── auth.controller.js        ← Register, login, logout, verify email, profile
│       │   ├── executeCode.controller.js ← Code submission + Judge0 integration
│       │   ├── playlist.controller.js    ← CRUD for playlists
│       │   ├── problem.controller.js     ← CRUD for problems
│       │   └── submission.controller.js  ← Fetch submission history
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── execution.routes.js
│       │   ├── playlist.routes.js
│       │   ├── problem.routes.js
│       │   └── submission.routes.js
│       ├── middlewares/
│       │   ├── auth.middleware.js        ← JWT verification, attaches req.user
│       │   └── validator.middleware.js   ← express-validator error collector
│       ├── libs/
│       │   ├── db.js                     ← Prisma Client singleton
│       │   └── judge0.lib.js             ← Judge0 API wrappers (submitBatch, pollBatchResults)
│       ├── utils/
│       │   ├── api-error.js              ← Custom ApiError class
│       │   ├── api-response.js           ← Standardized ApiResponse class
│       │   ├── async-handler.js          ← Wraps async controllers to catch errors
│       │   └── mail.js                   ← Email sending utilities (Nodemailer + Mailgen)
│       └── validators/
│           └── validator.js              ← express-validator rule chains
│
└── Frontend/
    ├── .gitignore
    ├── README.md
    ├── package.json              ← Frontend dependencies
    ├── vite.config.js            ← Vite build config + dev server config
    ├── eslint.config.js
    ├── index.html                ← HTML entry point with <div id="root">
    └── src/
        ├── main.jsx              ← React app bootstrap (createRoot, BrowserRouter)
        ├── App.jsx               ← Route definitions, auth guard, auth check on load
        ├── index.css             ← Global CSS
        ├── assets/               ← Static assets (logo, svg)
        ├── layout/
        │   └── Layout.jsx        ← Shared layout wrapper (Navbar + Outlet)
        ├── pages/
        │   ├── LandingPage.jsx   ← Public marketing landing page
        │   ├── LoginPage.jsx     ← Login form (React Hook Form + Zod)
        │   ├── SingUpPage.jsx    ← Signup form
        │   ├── HomePage.jsx      ← Problem list page (protected)
        │   ├── ProblemPage.jsx   ← Individual problem + Monaco editor + submissions
        │   ├── ProfilePage.jsx   ← User profile (stats, solved problems, playlists)
        │   └── AddProblem.jsx    ← Admin-only problem creation page (renders CreateProblemForm)
        ├── components/
        │   ├── Navbar.jsx               ← Top navigation bar
        │   ├── AdminRoute.jsx           ← Route guard for admin-only routes
        │   ├── ProblemTable.jsx         ← Filterable, paginated problem list
        │   ├── CreateProblemForm.jsx    ← Large admin form with Monaco editor for adding problems
        │   ├── Submission.jsx           ← Displays single submission results
        │   ├── SubmissionList.jsx       ← Lists all submissions for a problem
        │   ├── AddToPlaylist.jsx        ← Modal to add problem to a playlist
        │   ├── CreatePlaylistModal.jsx  ← Modal to create a new playlist
        │   ├── LogoutButton.jsx         ← Logout action button
        │   ├── AuthImagePattern.jsx     ← Decorative grid pattern for auth pages
        │   └── Background.jsx           ← Animated background component
        ├── store/
        │   ├── useAuthStore.js          ← Zustand: auth state (login, logout, checkAuth)
        │   ├── useExecutionStore.js     ← Zustand: code execution state
        │   ├── useProblemStore.js       ← Zustand: problem list & single problem
        │   ├── useSubmissionStore.js    ← Zustand: submission history
        │   ├── usePlaylistStore.js      ← Zustand: playlist CRUD
        │   └── useAction.js             ← Zustand: delete problem action
        └── lib/
            ├── axios.js                 ← Axios instance with baseURL + withCredentials
            └── lang.js                  ← Language ID ↔ name mapping (Judge0 language IDs)
```

---

## 5. System Architecture

**Architecture Type**: **Client-Server Monolith** (not microservices)

- The backend is a single Express application handling all routes
- The frontend is a single-page React application
- They communicate over HTTP REST
- No message queues, no event-driven architecture, no separate services

```
                      ┌─────────────────────────────┐
                      │           USER               │
                      │  (Browser at localhost:5173) │
                      └──────────────┬──────────────┘
                                     │ HTTP/HTTPS
                                     │ (with credentials: cookies)
                      ┌──────────────▼──────────────┐
                      │        REACT FRONTEND        │
                      │  Vite Dev Server | Port 5173 │
                      │                             │
                      │  ┌──────────────────────┐   │
                      │  │   React Router DOM    │   │
                      │  │  (Client-side routes) │   │
                      │  └──────────┬───────────┘   │
                      │             │               │
                      │  ┌──────────▼───────────┐   │
                      │  │   Zustand Stores      │   │
                      │  │ (Global state mgmt)   │   │
                      │  └──────────┬───────────┘   │
                      │             │               │
                      │  ┌──────────▼───────────┐   │
                      │  │  Axios HTTP Client    │   │
                      │  └──────────┬───────────┘   │
                      └─────────────┼───────────────┘
                                    │ REST API calls
                                    │ http://localhost:8080/api/v1
                      ┌─────────────▼───────────────┐
                      │       EXPRESS BACKEND         │
                      │   Node.js | Port 8080         │
                      │                              │
                      │  ┌────────────────────────┐  │
                      │  │  Global Middleware       │  │
                      │  │  - express.json()        │  │
                      │  │  - cookie-parser()       │  │
                      │  │  - cors()                │  │
                      │  └───────────┬─────────────┘  │
                      │              │                │
                      │  ┌───────────▼─────────────┐  │
                      │  │       ROUTERS             │  │
                      │  │  /auth | /problems        │  │
                      │  │  /execute-code            │  │
                      │  │  /submission | /playlist  │  │
                      │  └───────────┬─────────────┘  │
                      │              │                │
                      │  ┌───────────▼─────────────┐  │
                      │  │  Route Middlewares        │  │
                      │  │  - authMiddleware (JWT)   │  │
                      │  │  - checkAdmin (RBAC)      │  │
                      │  │  - validate (input check) │  │
                      │  └───────────┬─────────────┘  │
                      │              │                │
                      │  ┌───────────▼─────────────┐  │
                      │  │      CONTROLLERS          │  │
                      │  │  Business logic           │  │
                      │  └───────────┬─────────────┘  │
                      │              │                │
                      │  ┌───────────▼─────────────┐  │
                      │  │   Prisma Client (db)     │  │
                      │  └───────────┬─────────────┘  │
                      └─────────────┼──────────────────┘
                           ┌────────┼────────┐
                           │                 │
              ┌────────────▼──────┐  ┌───────▼──────────────┐
              │   PostgreSQL DB    │  │    Judge0 API         │
              │  (via DATABASE_URL)│  │  (code execution)     │
              └───────────────────┘  │  process.env.TEST      │
                                     └──────────────────────┘

              Also:
              ┌────────────────────────┐
              │  Mailtrap SMTP Server   │
              │  (email verification)   │
              └────────────────────────┘
```

---

## 6. Component-by-Component Analysis

### 6.1 Express App Entry Point (`src/index.js`)

**Responsibility**: Bootstrap the Express server, register all global middleware, mount routers, define global error handler, start listening.

**Key middleware chain** (order matters):
1. `express.json()` — parse JSON request bodies
2. `express.urlencoded()` — parse URL-encoded form data
3. `cors(...)` — allow cross-origin requests from specific origins
4. `cookieParser()` — parse `Cookie` header into `req.cookies`
5. Custom dev tunnel middleware — adjusts cookie `SameSite`/`Secure` attributes when running via VS Code Dev Tunnels or Cloudflare tunnels (allows cross-site cookies over HTTPS tunnels)

**Route mounting**:
```
/api/v1/auth        → authRoutes
/api/v1/problems    → problemRoutes
/api/v1/execute-code → executionRoutes
/api/v1/submission  → submissionRoutes
/api/v1/playlist    → playlistRoutes
```

**Global error handler** (4-argument Express middleware):
- Checks if the error is an instance of `ApiError`
- Returns structured JSON with status code and error details
- Otherwise returns 500 Internal Server Error

### 6.2 Auth Controller (`auth.controller.js`)

Handles: `registerUser`, `verifyUserEmail`, `loginUser`, `profile`, `logoutUser`, `resendVerificationEmail`, `check`

**Note — Incomplete function found in actual code**:
`resendVerificationEmail` still uses `User.findOne({ email })` (Mongoose syntax) and `user.generateTemporaryToken()` (a Mongoose instance method). This code would **throw a ReferenceError** at runtime because `User` is never imported in this file and Prisma doesn't have instance methods. This function is **not fully implemented**.

### 6.3 Problem Controller (`problem.controller.js`)

**`createProblem`** — Admin only:
1. For each language in `referenceSolutions`, runs all test cases via Judge0
2. If any test case fails, rejects the problem creation
3. Only saves to DB if all reference solutions pass all test cases

This is a **validation-before-save** pattern — ensures data integrity of the problem.

**`updateProblem`** — **Empty function body** — not implemented.

### 6.4 Execute Code Controller (`executeCode.controller.js`)

This is the **most complex and important controller**. It:
1. Receives: source code, language ID, array of inputs, array of expected outputs, problem ID
2. Builds a batch submission array for Judge0
3. POSTs to Judge0 batch endpoint — receives tokens
4. Polls Judge0 every 1 second until all submissions are done
5. Compares actual outputs vs expected outputs
6. Saves a `Submission` record to PostgreSQL
7. If ALL tests pass, upserts a `ProblemSolved` record
8. Saves individual `TestCaseResult` records
9. Returns the full submission with test case results

### 6.5 Prisma Client Singleton (`libs/db.js`)

```javascript
const globalForPrisma = globalThis;
export const db = globalForPrisma.Prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.Prisma = db;
}
```

**Why this pattern?** In development with hot-reload (nodemon), the module is re-evaluated on each file change. Without this singleton pattern, a new `PrismaClient` would be created on every reload, eventually exhausting database connection limits. By caching the client on `globalThis`, the same instance is reused across hot-reloads.

### 6.6 Judge0 Library (`libs/judge0.lib.js`)

**`getJudge0LanguageId(language)`** — Maps human-readable language names to Judge0 numeric IDs:
- PYTHON → 71
- JAVA → 62
- JAVASCRIPT → 63
- TYPESCRIPT → 74

**`submitBatch(submissions)`** — POSTs array of `{source_code, language_id, stdin}` objects to `process.env.TEST/submissions/batch`. Returns an array of tokens.

**`pollBatchResults(tokens)`** — Polls GET `/submissions/batch?tokens=...` every 1 second until all submissions have a terminal status (not `1=In Queue` or `2=Processing`). Returns final results.

**Important observation**: The RapidAPI headers (`judge0Headers`) are commented out, and the URL uses `process.env.TEST`. This means the project is configured to use a **self-hosted or locally running Judge0 instance** rather than the RapidAPI cloud version.

---

## 7. Complete Data Flow

### 7.1 User Registration Flow

```
User fills signup form (SingUpPage.jsx)
    │
    ▼ Zod validation (zodResolver)
    │ if invalid → show field errors inline
    ▼
useAuthStore.signup(data)
    │
    ▼ axiosInstance.post("/auth/register", data)
    │
    ▼ Express Router: POST /api/v1/auth/register
    │
    ▼ Middleware Chain:
    │   1. userRegisterationValidator() → express-validator rules
    │   2. validate middleware → checks for validation errors → throws ApiError(422)
    │
    ▼ registerUser controller:
    │   1. Check if email/username/password present
    │   2. db.user.findUnique({ where: { email } }) → check duplicate
    │   3. bcrypt.hash(password, 10) → hash password
    │   4. db.user.create({ email, username, fullname, hashedPassword, role: USER })
    │   5. crypto.randomBytes(32) → generate unhashedToken
    │   6. crypto.createHash("sha256").update(unhashedToken) → hashedToken
    │   7. sendMail() → Nodemailer → Mailtrap SMTP → verification email
    │   8. db.user.update() → save hashedToken + expiry to DB
    │   9. Return 201 with success message
    │
    ▼ Frontend: toast.success(message), redirect to "/"
```

### 7.2 Email Verification Flow

```
User clicks link in email: GET /api/v1/auth/verify/:token
    │
    ▼ verifyUserEmail controller:
    │   1. crypto.createHash("sha256").update(token) → hashedtoken
    │   2. db.user.findFirst({ where: { emailVerificationToken: hashedtoken, expiry: { gt: now } }})
    │   3. If not found → 404 (invalid or expired token)
    │   4. db.user.update({ emailVerified: true, token: null, expiry: null })
    │   5. Return 200 success
```

### 7.3 Login Flow

```
User submits login form (LoginPage.jsx)
    │
    ▼ Zod validation (LoginSchema)
    ▼ useAuthStore.login(data)
    ▼ axiosInstance.post("/auth/login", data)
    │
    ▼ POST /api/v1/auth/login
    ▼ userLoginValidator() → validate →
    ▼ loginUser controller:
    │   1. Find user by email OR username (OR query)
    │   2. bcrypt.compare(password, user.password)
    │   3. jwt.sign({ id, email, role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
    │   4. jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
    │   5. db.user.update({ refreshToken }) → store refresh token in DB
    │   6. res.cookie("refreshToken", ..., { httpOnly: true, secure, sameSite })
    │   7. res.cookie("accessToken", ..., { httpOnly: false, maxAge: 15min })
    │   8. Return { accessToken, user: { id, email, username, fullname, role } }
    │
    ▼ Frontend:
    │   set({ authUser: res.data.user })
    │   toast.success(message)
    │   window.location.href = "/"
```

### 7.4 Code Execution Flow (Most Complex)

```
User opens ProblemPage (ProblemPage.jsx)
    │
    ▼ useEffect → getProblemById(id) → GET /api/v1/problems/get-problem/:id
    ▼ Problem loaded: sets code from codeSnippets[language], testcases[]
    │
User writes code in Monaco Editor, clicks "Run Code"
    │
    ▼ handleRunCode():
    │   language_id = getLanguageId(selectedLanguage)  ← maps "javascript" → 63
    │   stdin = problem.testcases.map(tc => tc.input)   ← ["1 2", "3 4"]
    │   expected_outputs = problem.testcases.map(tc => tc.output)
    │   executeCode(code, language_id, stdin, expected_outputs, id)
    │
    ▼ useExecutionStore.executeCode()
    ▼ axiosInstance.post("/execute-code", { source_code, language_id, stdin, expected_outputs, problemId })
    │
    ▼ POST /api/v1/execute-code
    ▼ authMiddleware (JWT check)
    ▼ executeCode controller:
    │
    │   STEP 1: Validate inputs
    │   ├── stdin must be non-empty array
    │   └── expected_outputs length must match stdin length
    │
    │   STEP 2: Build batch submissions
    │   ├── submissions = stdin.map(input => ({ source_code, language_id, stdin: input }))
    │
    │   STEP 3: submitBatch(submissions)
    │   ├── POST to Judge0: /submissions/batch
    │   └── Returns: [{ token: "abc" }, { token: "def" }, ...]
    │
    │   STEP 4: pollBatchResults(tokens)
    │   ├── GET /submissions/batch?tokens=abc,def,...
    │   ├── Check if all status.id !== 1 (In Queue) AND !== 2 (Processing)
    │   ├── If not done: await sleep(1000), loop again
    │   └── Return final results array
    │
    │   STEP 5: Analyze results
    │   ├── For each result: stdout.trim() === expected_output.trim() → passed
    │   └── If any failed: allPassed = false
    │
    │   STEP 6: Save Submission to PostgreSQL
    │   ├── db.submission.create({ userId, problemId, sourceCode, language, ... })
    │   └── status = allPassed ? "Accepted" : "Wrong Answer"
    │
    │   STEP 7: If allPassed → Mark problem as solved
    │   └── db.problemSolved.upsert({ userId_problemId }) ← unique compound key prevents duplicates
    │
    │   STEP 8: Save TestCaseResult records
    │   └── db.testCaseResult.createMany(testCaseResults)
    │
    │   STEP 9: Fetch submission with test cases, return to frontend
    │
    ▼ Frontend:
    │   set({ submission: res.data.submission })
    │   Renders <Submission> component showing status, avg memory, avg time, per-test-case results
```

---

## 8. Frontend Architecture

### 8.1 React and Component Model

**React** is a JavaScript library for building user interfaces using **components** — reusable, self-contained pieces of UI.

**JSX** (JavaScript XML) lets you write HTML-like syntax inside JavaScript:
```jsx
const Button = ({ label }) => <button className="btn">{label}</button>;
```

**Key React concepts used in this project**:

- **`useState`**: Local component state (e.g., `const [code, setCode] = useState("")`)
- **`useEffect`**: Side effects — runs code after render (e.g., fetch problem on page load)
- **`useParams`**: Extracts URL parameters (e.g., `/problem/:id` → `id`)
- **`useLocation`**: Gets current URL path (Navbar uses this to show different content on landing page)
- **`useMemo`**: Memoizes expensive computations (filtering/sorting problems in ProblemTable)
- **`Outlet`**: React Router placeholder for nested route components

### 8.2 State Management with Zustand

Instead of Redux (complex, lots of boilerplate) or local state (can't share across components), this project uses **Zustand** — a minimal global state manager.

**How Zustand works**:
```javascript
const useStore = create((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
}));
// Any component: const { count, increment } = useStore();
```

**Stores in this project**:

| Store | State | Actions |
|---|---|---|
| `useAuthStore` | `authUser`, `isLoggingIn`, `isCheckingAuth` | `login`, `logout`, `signup`, `checkAuth` |
| `useProblemStore` | `problems`, `problem`, `solvedProblems`, loading flags | `getAllProblems`, `getProblemById`, `getSolvedProblemByUser` |
| `useExecutionStore` | `submission`, `isExecuting` | `executeCode` |
| `useSubmissionStore` | `submissions`, `submission`, `submissionCount` | `getAllSubmissions`, `getSubmissionForProblem`, `getSubmissionCountForProblem` |
| `usePlaylistStore` | `playlists`, `currentPlaylist`, `isLoading` | `createPlaylist`, `getAllPlaylists`, `addProblemToPlaylist`, etc. |
| `useActions` | `isDeletingProblem` | `onDeleteProblem` |

### 8.3 Routing

React Router v7 provides client-side routing — the browser never reloads the page:

```
/           → LandingPage (if !authUser) OR redirect to /home (if authUser)
/home       → HomePage (protected) OR redirect to /login
/login      → LoginPage (if !authUser) OR redirect to /home
/signup     → SignUpPage (if !authUser) OR redirect to /home
/problem/:id → ProblemPage (protected)
/profile    → ProfilePage (protected)
/add-problem → AddProblem (admin only, via AdminRoute guard)
```

**Route Guards**:
- `authUser` check in route elements (`element={authUser ? <Page/> : <Navigate to="/login"/>}`)
- `AdminRoute` component checks `authUser.role === "ADMIN"`, redirects to "/" if not

### 8.4 Form Handling

LoginPage and SignUpPage use **React Hook Form + Zod**:
- Zod schema defines validation rules (`z.string().email()`, `z.string().min(6)`)
- `zodResolver` bridges Zod into React Hook Form
- `register` connects inputs to form state
- `handleSubmit` calls validation before submitting
- `formState.errors` shows validation messages inline

**CreateProblemForm** (Admin) is a very large form (1055 lines) using `useFieldArray` for dynamic test case fields, and Monaco Editor for code snippets in each language.

### 8.5 Axios Configuration

```javascript
// lib/axios.js
export const axiosInstance = axios.create({
  baseURL: MODE === "development" ? "http://localhost:8080/api/v1" : "/api/v1",
  withCredentials: true,  // ← sends cookies with every request
});
```

`withCredentials: true` is critical — it tells Axios to include cookies (which hold the JWT) in cross-origin requests.

### 8.6 Monaco Editor

Monaco Editor is the **same code editor engine that powers VS Code**, embedded in the browser via `@monaco-editor/react`. Used in:
- `ProblemPage.jsx` — Code editor where users write solutions
- `CreateProblemForm.jsx` — Admin writes reference solutions per language

```jsx
<Editor
  height="100%"
  language={selectedLanguage}    // "javascript" | "python" | "java"
  theme="vs-dark"
  value={code}
  onChange={(value) => setCode(value)}
  options={{ fontSize: 20, lineNumbers: "on", minimap: { enabled: false } }}
/>
```

---

## 9. Backend Architecture

### 9.1 Express 5

**Express** is a minimal web framework for Node.js. It provides:
- HTTP routing
- Middleware chain
- Request/Response abstraction

**Express 5** (used here) has built-in async error handling — if an async route handler throws, Express 5 automatically catches it and passes to the error handler. (Express 4 required explicit try/catch or `asyncHandler` wrapper.)

However, this project **still uses `asyncHandler`** as a safety wrapper — a good practice that works with both Express 4 and 5.

### 9.2 Middleware Pattern

```
Request
   ↓
express.json()          ← Parse body
   ↓
express.urlencoded()    ← Parse form data
   ↓
cors()                  ← CORS headers
   ↓
cookieParser()          ← Parse cookies
   ↓
Dev Tunnel Middleware   ← Adjust cookie options for tunnels
   ↓
Router                  ← Match URL to route
   ↓
Route-specific MW       ← authMiddleware, checkAdmin, validate
   ↓
Controller              ← Business logic
   ↓
Response sent
   ↓ (if error thrown)
Global Error Handler    ← Catch all errors, format response
```

### 9.3 Controller Design

Each controller function uses `asyncHandler` which wraps it in a Promise.resolve().catch(next) pattern:

```javascript
function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
      next(err);  // passes error to global error handler
    });
  };
}
```

This means unhandled promise rejections inside controllers are automatically forwarded to Express's global error handler instead of crashing the server.

### 9.4 Standardized Responses

**`ApiResponse`** class:
```javascript
class ApiResponse {
  constructor(status, data, message = "success") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;  // true for 2xx/3xx, false for 4xx/5xx
  }
}
```

**`ApiError`** class extends `Error`:
```javascript
class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
  }
}
```

**Benefit**: Every API response has a consistent structure. Frontend can always check `res.data.success` and `res.data.message`.

---

## 10. API Architecture

### Complete API Table

| Method | Endpoint | Auth | Admin | Purpose |
|---|---|---|---|---|
| POST | `/api/v1/auth/register` | No | No | Register new user |
| GET | `/api/v1/auth/verify/:token` | No | No | Verify email |
| POST | `/api/v1/auth/resend` | No | No | Resend verification email (broken) |
| POST | `/api/v1/auth/login` | No | No | Login, get JWT cookies |
| POST | `/api/v1/auth/logout` | Yes | No | Logout, clear cookies |
| GET | `/api/v1/auth/profile` | Yes | No | Get current user profile |
| GET | `/api/v1/auth/check` | Yes | No | Check if token is valid |
| POST | `/api/v1/problems/create-problem` | Yes | Yes | Create new problem (validates via Judge0) |
| GET | `/api/v1/problems/get-all-problems` | Yes | No | Get all problems with solved status |
| GET | `/api/v1/problems/get-problem/:id` | Yes | No | Get single problem by ID |
| PUT | `/api/v1/problems/update-problem/:id` | Yes | Yes | Update problem (NOT IMPLEMENTED) |
| DELETE | `/api/v1/problems/delete-problem/:id` | Yes | Yes | Delete problem |
| GET | `/api/v1/problems/get-solved-problems` | Yes | No | Get problems solved by user |
| POST | `/api/v1/execute-code` | Yes | No | Execute code + save submission |
| GET | `/api/v1/submission/get-all-submissions` | Yes | No | Get all user's submissions |
| GET | `/api/v1/submission/get-submission/:problemId` | Yes | No | Get user's submissions for a problem |
| GET | `/api/v1/submission/get-submissions-count/:problemId` | Yes | No | Get total submission count for problem |
| GET | `/api/v1/playlist` | Yes | No | Get all user's playlists |
| GET | `/api/v1/playlist/:playlistId` | Yes | No | Get single playlist with problems |
| POST | `/api/v1/playlist/create-playlist` | Yes | No | Create a new playlist |
| POST | `/api/v1/playlist/:playlistId/add-problem` | Yes | No | Add problem(s) to playlist |
| DELETE | `/api/v1/playlist/:playlistId` | Yes | No | Delete a playlist |
| DELETE | `/api/v1/playlist/:playlistId/remove-problem` | Yes | No | Remove problem(s) from playlist |

### REST Concepts Applied

**HTTP Methods**:
- `GET` — retrieve data (no side effects)
- `POST` — create new resource or trigger action
- `PUT` — update existing resource (full update)
- `DELETE` — remove resource

**Status Codes used**:
- `200 OK` — successful read/update
- `201 Created` — successful creation
- `400 Bad Request` — validation error or bad input
- `401 Unauthorized` — missing or invalid token
- `403 Forbidden` — authenticated but insufficient permission
- `404 Not Found` — resource doesn't exist
- `422 Unprocessable Entity` — validation failed (express-validator errors)
- `429 Too Many Requests` — rate limit (resend email)
- `500 Internal Server Error` — unexpected server error

**Path Parameters**: `/problems/get-problem/:id` — `:id` extracted via `req.params.id`
**Query Parameters**: Not prominently used in this project
**Request Body**: JSON payloads sent in POST/PUT requests
**Headers**: `Cookie` header carries JWT tokens

### Statelessness

REST APIs are stateless — the server does not store session state. Every request must carry authentication. This project implements this via JWT in cookies — the server re-validates the token on every protected request.

---

## 11. Database Architecture

### 11.1 Technology: PostgreSQL

**What is PostgreSQL?** A powerful, open-source, relational database management system (RDBMS). "Relational" means data is organized in tables with defined relationships (foreign keys).

**Why PostgreSQL over MongoDB?**
- The data in this project is clearly relational: Users have Problems, Problems have Submissions, Submissions have TestCaseResults, Users have Playlists, Playlists have Problems
- Strong consistency needed: A submission result must always accurately reflect which user submitted what
- Transactions: If saving a submission fails, the test case results should not be saved either
- ACID guarantees: Atomicity, Consistency, Isolation, Durability

### 11.2 Entity-Relationship Diagram

```
User
 ├── id         UUID PK
 ├── fullname   String? (nullable)
 ├── username   String UNIQUE
 ├── email      String UNIQUE
 ├── image      String? (nullable)
 ├── role       Enum(USER, ADMIN) DEFAULT USER
 ├── password   String (bcrypt hash)
 ├── emailVerified Boolean DEFAULT false
 ├── emailVerificationToken String?
 ├── emailVerificationTokenExpiry DateTime?
 ├── refreshToken String? (stored in DB for logout invalidation)
 ├── forgotPasswordToken String?
 ├── forgotPasswordTokenExpiry DateTime?
 ├── lastverificationEmailSent DateTime?
 ├── createdAt  DateTime DEFAULT now()
 └── updatedAt  DateTime @updatedAt
         │
         │ 1:N (one user creates many problems)
         ▼
Problem
 ├── id          UUID PK
 ├── title       String
 ├── description String (long text)
 ├── difficulty  Enum(EASY, MEDIUM, HARD)
 ├── tags        String[] (PostgreSQL array)
 ├── userId      String FK → User.id CASCADE DELETE
 ├── examples    Json  { JAVASCRIPT: {input,output,explanation}, PYTHON: {...}, JAVA: {...} }
 ├── constraints String
 ├── hints       String?
 ├── editorial   String?
 ├── testcases   Json  [{ input: "...", output: "..." }, ...]
 ├── codeSnippets Json { javascript: "...", python: "...", java: "..." }
 ├── referenceSolutions Json { JAVASCRIPT: "...", PYTHON: "...", JAVA: "..." }
 ├── createdAt   DateTime
 └── updatedAt   DateTime
         │
         ├─── 1:N ─────────────────────────────────┐
         ▼                                          ▼
Submission                                    ProblemSolved (junction)
 ├── id           UUID PK                     ├── id        UUID PK
 ├── userId       FK → User.id CASCADE         ├── userId    FK → User.id CASCADE
 ├── problemId    FK → Problem.id CASCADE      ├── problemId FK → Problem.id CASCADE
 ├── sourceCode   Json                         ├── createdAt
 ├── language     String                       └── updatedAt
 ├── stdin        String? (joined inputs)       UNIQUE(userId, problemId)
 ├── stdout       String? (JSON array)
 ├── stderr       String? (JSON array)
 ├── compileOutput String?
 ├── status       String (Accepted / Wrong Answer)
 ├── memory       String? (JSON array)
 ├── time         String? (JSON array)
 ├── createdAt
 └── updatedAt
         │
         │ 1:N
         ▼
TestCaseResult
 ├── id             UUID PK
 ├── submissionId   FK → Submission.id CASCADE
 ├── testcase       Int (test case number)
 ├── passed         Boolean
 ├── stdout         String?
 ├── expectedOutput String
 ├── stderr         String?
 ├── compileOutput  String?
 ├── status         String
 ├── memory         String?
 ├── time           String?
 ├── createdAt
 └── updatedAt
 INDEX: submissionId   ← has explicit index for query performance

Playlist
 ├── id          UUID PK
 ├── name        String
 ├── description String?
 ├── userId      FK → User.id CASCADE
 ├── createdAt
 └── updatedAt
 UNIQUE(userId, name)   ← A user can't have two playlists with the same name
         │
         │ 1:N (through junction)
         ▼
ProblemsInPlaylist (junction/join table)
 ├── id         UUID PK
 ├── playListId FK → Playlist.id CASCADE
 ├── problemId  FK → Problem.id CASCADE
 ├── createdAt
 └── updatedAt
 UNIQUE(playListId, problemId)  ← A problem can only be in a playlist once
```

### 11.3 Relationships Summary

| Relationship | Type | Implementation |
|---|---|---|
| User → Problems | One-to-Many | `Problem.userId` FK |
| User → Submissions | One-to-Many | `Submission.userId` FK |
| Problem → Submissions | One-to-Many | `Submission.problemId` FK |
| Submission → TestCaseResults | One-to-Many | `TestCaseResult.submissionId` FK |
| User ↔ Problem (solved) | Many-to-Many | `ProblemSolved` junction table |
| User → Playlists | One-to-Many | `Playlist.userId` FK |
| Playlist ↔ Problem | Many-to-Many | `ProblemsInPlaylist` junction table |

### 11.4 Design Observations

**Good choices**:
- UUIDs as primary keys (avoids sequential ID guessing attacks)
- `UNIQUE(userId, problemId)` on ProblemSolved prevents duplicate solved records — and `upsert` is used in code
- `UNIQUE(userId, name)` on Playlist prevents same-name playlists per user
- `UNIQUE(playListId, problemId)` on ProblemsInPlaylist prevents duplicate entries
- `INDEX(submissionId)` on TestCaseResult improves query performance when fetching test case results for a submission
- `onDelete: Cascade` — deleting a user deletes all their problems, submissions, etc.
- Enum types for `UserRole` and `Difficulty` — enforces valid values at DB level

**Potential issues**:
- `testcases`, `examples`, `codeSnippets`, `referenceSolutions`, `sourceCode` stored as `Json` type — flexible but no schema enforcement at DB level
- `stdout`, `stderr`, `memory`, `time` in Submission store JSON arrays as strings (e.g., `'["123 KB", "134 KB"]'`) — requires JSON.parse on frontend, could have been a separate table
- `refreshToken` stored in DB as plaintext — if DB is breached, tokens are exposed. Should be hashed.
- Missing indexes on frequently queried fields: `userId` on `Submission`, `problemId` on `Submission` — could cause full table scans at scale
- `Problem.tags` as `String[]` (PostgreSQL array) — querying by tag is not indexed, could be slow

### 11.5 Cascading Behavior

All foreign keys use `onDelete: Cascade`, meaning:
- Delete a User → deletes their Problems, Submissions, ProblemSolved records, Playlists
- Delete a Problem → deletes its Submissions, ProblemSolved records, TestCaseResults, ProblemsInPlaylist entries
- Delete a Playlist → deletes its ProblemsInPlaylist entries
- Delete a Submission → deletes its TestCaseResults

---

## 12. ORM / Database Access

### 12.1 What is an ORM?

**ORM (Object-Relational Mapper)** is a library that lets you interact with a relational database using your programming language's objects instead of raw SQL.

Without ORM:
```sql
SELECT * FROM "User" WHERE email = 'user@example.com';
```

With Prisma ORM:
```javascript
const user = await db.user.findUnique({ where: { email: 'user@example.com' } });
```

### 12.2 Prisma Specifically

**Prisma** consists of:
1. **Prisma Schema** (`schema.prisma`) — defines data models, relations, and DB connection
2. **Prisma Client** — auto-generated, type-safe query builder
3. **Prisma Migrate** — manages database schema migrations

**How schema.prisma works**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")     // reads from .env
}

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma" // where to generate client code
}

model User {
  id       String @id @default(uuid())  // UUID primary key
  email    String @unique               // unique constraint
  // ...
  problems Problem[]                    // relation
}
```

### 12.3 Migrations

Prisma tracks schema changes over time via migrations. When you run `npx prisma migrate dev`:
1. Prisma compares the current `schema.prisma` with the last migration
2. Generates a new SQL migration file
3. Applies it to the database
4. Updates the migration history

**Migrations in this project** (from the `/migrations` directory):
1. `20250710063908_usermodel` — Created User table
2. `20250710093413_problem_model_is_added` — Added Problem table
3. `20250711042215_updated_user` — Updated User model
4. `20250714070123_added_submission_testcases_problemsolved` — Added Submission, TestCaseResult, ProblemSolved
5. `20250716115253_added_playlist_and_problemsinplaylist_models` — Added Playlist and ProblemsInPlaylist
6. `20250718080659_fix_typo_passes_passed` — Fixed typo in field name

### 12.4 Key Prisma Queries Used

**Find unique with relation**:
```javascript
const problem = await db.problem.findMany({
  include: {
    solvedBy: { where: { userId: req.user.id } }
  }
});
```
This fetches all problems AND for each problem, includes only the `ProblemSolved` records for the current user. The frontend uses `problem.solvedBy.length > 0` to show the checkbox as checked.

**Upsert** (update if exists, create if not):
```javascript
await db.problemSolved.upsert({
  where: { userId_problemId: { userId, problemId } },
  update: {},      // nothing to update
  create: { userId, problemId }
});
```
The compound unique key `@@unique([userId, problemId])` makes the `where` clause work.

**Create Many** (bulk insert):
```javascript
await db.testCaseResult.createMany({ data: testCaseResults });
```
More efficient than creating records one by one in a loop.

**Transaction safety**: The execute code controller doesn't use an explicit transaction — if `db.submission.create` succeeds but `db.testCaseResult.createMany` fails, you'd have an orphaned submission with no test case results. This is a real bug in the current implementation.

---

## 13. Authentication & Security

### 13.1 Authentication vs Authorization

- **Authentication**: "Who are you?" — verifying identity (username + password)
- **Authorization**: "What can you do?" — checking permissions (are you an ADMIN?)

This project implements both.

### 13.2 JWT (JSON Web Token)

**What is JWT?** A token format for stateless authentication. A JWT has 3 parts separated by dots:
```
HEADER.PAYLOAD.SIGNATURE
eyJhbGci...  .eyJpZCI6...  .signature
```

- **Header**: `{ "alg": "HS256", "typ": "JWT" }`
- **Payload**: `{ "id": "uuid", "email": "...", "role": "USER", "iat": 1234, "exp": 1234 }`
- **Signature**: `HMAC-SHA256(base64(header) + "." + base64(payload), secret)`

The signature is what makes JWT secure. The server signs it with a secret key. Only the server can verify it.

**This project uses TWO tokens**:

| Token | Stored In | Expiry | Purpose |
|---|---|---|---|
| Access Token | Cookie (`httpOnly: false`) | 15 minutes | Sent with every API request for auth |
| Refresh Token | Cookie (`httpOnly: true`) + DB | 7 days | Used to get new access token (NOT implemented — see below) |

**Important Note**: The refresh token mechanism (using the refresh token to get a new access token) is **not implemented**. The code comments say: `//refresh access token` but the function doesn't exist. When the 15-minute access token expires, users will get 401 errors and must log in again.

**Why `httpOnly: false` on accessToken?** To allow the frontend JavaScript to read it (though in this project, it reads it from the cookie automatically via `withCredentials: true`).

**Why `httpOnly: true` on refreshToken?** HttpOnly cookies cannot be accessed by JavaScript — protects against XSS attacks stealing the refresh token.

### 13.3 Auth Middleware (`auth.middleware.js`)

```javascript
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.accessToken;    // Read from cookie
  if (!token) return res.status(401).json(...);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") return 401
    if (error.name === "JsonWebTokenError") return 401
  }

  const user = await db.user.findUnique({ where: { id: decoded.id }, select: {...} });
  if (!user) return res.status(401).json(...);

  req.user = user;  // attach user to request object
  next();
};
```

Every request to a protected route goes through this middleware. It:
1. Extracts the JWT from the `accessToken` cookie
2. Verifies signature and expiry with `jwt.verify`
3. Looks up the user in the database (confirms user still exists)
4. Attaches the user object to `req.user`
5. Calls `next()` to proceed to the controller

### 13.4 RBAC (`checkAdmin` middleware)

```javascript
export const checkAdmin = async (req, res, next) => {
  const user = await db.user.findUnique({ where: { id: req.user.id }, select: { role: true } });
  if (!user || user.role !== "ADMIN") return res.status(403).json(...);
  next();
};
```

This middleware always runs AFTER `authMiddleware` (req.user exists). It makes another DB query to verify the role. Used on `createProblem`, `updateProblem`, `deleteProblem`.

**Redundancy**: The role is already in `req.user` (set by authMiddleware). The extra DB query is unnecessary — could just check `req.user.role !== "ADMIN"`.

### 13.5 Password Hashing with bcrypt

**Why not store plain passwords?** If the database is breached, all users are compromised.

**bcrypt** is a slow hashing algorithm designed specifically for passwords:
- Automatically handles salt generation (random data added before hashing)
- "Work factor" of 10 (salt rounds) makes brute-force attacks expensive
- Same password produces different hash each time (due to random salt)

```javascript
const hashedPassword = await bcrypt.hash(password, 10);  // during registration
const verified = await bcrypt.compare(plainPassword, hashedPassword);  // during login
```

### 13.6 Email Verification Token

```javascript
const unhashedToken = crypto.randomBytes(32).toString("hex");  // 64-char hex string
const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex");
```

- `unhashedToken` is sent in the email URL
- `hashedToken` is stored in the database
- When user clicks the link, their token is hashed and compared with DB — if they match, verification succeeds
- This protects against DB breach: even if the `emailVerificationToken` column is exposed, attacker can't verify accounts without knowing the pre-hash token

### 13.7 CORS (Cross-Origin Resource Sharing)

**What is CORS?** Browsers enforce a "Same-Origin Policy" — JavaScript on `http://localhost:5173` cannot by default make requests to `http://localhost:8080`. CORS headers on the server allow this.

**This project's CORS config**:
```javascript
cors({
  origin: [
    "http://localhost:5173",
    "https://fv1w1ts7-5173.inc1.devtunnels.ms",
    "https://facility-separately-magnetic-preliminary.trycloudflare.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true,   // ← allow cookies to be sent/received cross-origin
})
```

`credentials: true` on the server AND `withCredentials: true` on Axios together enable cross-origin cookie sending.

### 13.8 Security Mechanisms: Present vs Absent

| Security Feature | Present? | Where |
|---|---|---|
| Password hashing (bcrypt) | ✅ Yes | `auth.controller.js` |
| JWT authentication | ✅ Yes | `auth.middleware.js` |
| Role-based access control | ✅ Yes | `checkAdmin` middleware |
| Email verification | ✅ Yes | `verifyUserEmail`, `sendMail` |
| Secure HttpOnly cookies | ✅ Yes | refreshToken cookie |
| CORS configuration | ✅ Yes | `index.js` |
| Input validation | ✅ Partial | express-validator on auth routes only |
| Rate limiting | ❌ No | Not implemented |
| CSRF protection | ❌ No | Not implemented |
| SQL injection protection | ✅ Yes | Via Prisma (parameterized queries) |
| XSS protection | ⚠️ Partial | HttpOnly cookies help, but no Content-Security-Policy header |
| HTTPS enforcement | ❌ No | Not enforced (dev uses HTTP) |
| Refresh token rotation | ❌ No | Not implemented |

---

## 14. Webhooks

**Webhooks are NOT used in this project.**

The project uses a synchronous polling pattern for code execution results (polling Judge0 every 1 second). No external service sends HTTP callbacks to this application.

---

## 15. Real-Time Communication

**WebSockets, Socket.IO, WebRTC, and Server-Sent Events are NOT used in this project.**

All communication is standard HTTP request-response. The "real-time" feeling of code execution uses **server-side polling** of Judge0:

```javascript
// Backend polls Judge0 every 1 second
while (true) {
  const { data } = await axios.get(`/submissions/batch?tokens=...`);
  const isAllDone = results.every(r => r.status.id !== 1 && r.status.id !== 2);
  if (isAllDone) return results;
  await sleep(1000);
}
```

This means the HTTP request from the frontend **stays open** (hanging GET) while the backend polls Judge0 internally. The frontend shows a loading state (`isExecuting: true`) during this time.

**Limitation**: If Judge0 takes a long time, the HTTP request could timeout. Express has a default 5-second timeout (though configurable).

---

## 16. Async Programming

### 16.1 JavaScript's Event Loop

**Synchronous code** runs line by line, blocking execution:
```javascript
const result = fs.readFileSync("file.txt");  // blocks until done
console.log(result);
```

**Asynchronous code** doesn't block:
```javascript
const result = await fs.promises.readFile("file.txt");  // non-blocking
console.log(result);
```

Node.js uses an **event loop** to handle many concurrent requests without threads:
1. Receives a request
2. Starts async operation (DB query, HTTP call)
3. Returns to event loop to handle other requests
4. When the async operation completes, resumes the original handler

### 16.2 async/await in This Project

Every controller that touches the database or makes HTTP calls uses `async/await`:

```javascript
const loginUser = asyncHandler(async (req, res) => {
  const user = await db.user.findFirst({ where: { OR: [{ email }, { username }] }});
  const verified = await bcrypt.compare(password, user.password);
  const accessToken = jwt.sign(...);  // synchronous
  await db.user.update({ data: { refreshToken } });
  res.cookie(...);
  res.json(...);
});
```

### 16.3 Promise.all Potential

The `pollBatchResults` function could use `Promise.all` to check results in parallel, but it currently uses a simple while loop. The batch API already returns all tokens' statuses in one call, so this is actually fine.

### 16.4 sleep() Utility

```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```

This creates a Promise that resolves after `ms` milliseconds. Using `await sleep(1000)` in the polling loop pauses execution without blocking the event loop — other requests can be handled during that 1 second.

### 16.5 Error Propagation

With `async/await`:
- `await` inside a try/catch: exceptions are caught
- `asyncHandler` wraps the handler in `Promise.resolve().catch(next)` — uncaught rejections go to Express error handler

---

## 17. External Services

### 17.1 Judge0

**What is Judge0?** An open-source code execution engine. It accepts source code, a language ID, and stdin, executes the code in a sandboxed environment, and returns stdout, stderr, compile output, execution time, and memory usage.

**How this project uses it**:

**Configuration**: Uses `process.env.TEST` as the base URL. The commented-out RapidAPI headers suggest the project currently uses a **self-hosted Judge0 instance** (not the cloud API).

**Batch Submission API**:
- `POST /submissions/batch?base64_encoded=false` with body `{ submissions: [{ source_code, language_id, stdin }] }`
- Returns: `[{ token: "unique-id" }, ...]` — one token per submission

**Batch Results API**:
- `GET /submissions/batch?tokens=abc,def,ghi&base64_encoded=false`
- Returns: `{ submissions: [{ status: { id, description }, stdout, stderr, ... }] }`

**Judge0 Status IDs**:
- `1` = In Queue
- `2` = Processing
- `3` = Accepted
- `4` = Wrong Answer
- `5` = Time Limit Exceeded
- `6` = Compilation Error
- etc.

**In `createProblem`**: Reference solutions are validated against all test cases. If `result.status.id !== 3`, the problem is rejected.

**In `executeCode`**: After execution, `stdout.trim() === expected_output.trim()` determines if the test case passed (independent of Judge0's status, which handles TLE/CE etc. separately).

**What happens if Judge0 goes down?**
- `submitBatch()` → `axios.post()` throws an error
- `asyncHandler` catches it and calls `next(err)`
- Global error handler returns 500 to the frontend
- Frontend toast shows "Error executing code"

### 17.2 Nodemailer + Mailtrap

**Nodemailer** is a Node.js library for sending emails via SMTP.
**Mailtrap** is an email testing service — it catches all outgoing emails in a sandbox inbox. No real emails are delivered.

**Configuration** (from `mail.js`):
```javascript
nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  auth: { user: process.env.MAILTRAP_SMTP_USER, pass: process.env.MAILTRAP_SMTP_PASSWORD }
})
```

**Mailgen** generates beautiful HTML emails from a simple JSON configuration. The project uses it for:
- `verificationEmailContentGen` — Welcome email with "Verify your email address" button
- `forgotPasswordEmailContentGen` — Password reset email (template exists but flow not implemented)

**What happens if email service fails?**: The `sendMail` function has a try/catch that only `console.error`s the error without propagating it. User registration still succeeds even if the email fails to send. This is intentional UX — don't fail registration if email delivery fails.

---

## 18. AI / RAG

**No AI or RAG components exist in this project.**

There is no integration with OpenAI, Gemini, embeddings, vector databases, or any ML components.

---

## 19. Docker & Infrastructure

**Docker and Docker Compose are NOT used in this project.**

No `Dockerfile`, `docker-compose.yml`, or containerization config exists in the repository.

**How the project is run locally**:
- Backend: `npm run dev` → `nodemon src/index.js` on port 8080 (inferred from `http://localhost:8080`)
- Frontend: `npm run dev` → `vite` on port 5173
- PostgreSQL: Run separately (locally or cloud-hosted) — connection via `DATABASE_URL` env var
- Judge0: Run separately (self-hosted) — connection via `process.env.TEST` env var

---

## 20. Deployment

**No production deployment configuration exists in this project.**

**Current setup is development-only**:
- VS Code Dev Tunnels and Cloudflare Tunnels are used for **exposing localhost to the internet** for testing/demos (evident from hardcoded tunnel URLs in CORS config and Vite config)
- No Dockerfile, no Nginx config, no CI/CD pipeline, no cloud deployment config

**To deploy to production**, you would need:
1. Host PostgreSQL on a cloud service (e.g., Supabase, Railway, AWS RDS)
2. Host Judge0 (Docker required — it has its own Docker setup)
3. Host Backend on a server (e.g., EC2, Railway, Render)
4. Build Frontend (`npm run build` → static files) and host on CDN (e.g., Vercel, Netlify)
5. Set production environment variables
6. Configure HTTPS
7. Update CORS origins to production URLs

---

## 21. Code Structure

### 21.1 Backend Structure — MVC Pattern

The backend follows **MVC (Model-View-Controller)** pattern:
- **Model**: Prisma schema (defines data structure)
- **View**: JSON responses (APIs don't have traditional views)
- **Controller**: Business logic in `controllers/` directory
- **Routes**: URL-to-controller mapping in `routes/` directory

Additional layers:
- **Middleware** (`middlewares/`): Cross-cutting concerns (auth, validation)
- **Utilities** (`utils/`): Reusable helpers (ApiError, ApiResponse, asyncHandler, mail)
- **Libraries** (`libs/`): Third-party service wrappers (db.js for Prisma, judge0.lib.js for Judge0)
- **Validators** (`validators/`): Input validation rule definitions

### 21.2 Frontend Structure

| Folder | Responsibility |
|---|---|
| `pages/` | Full-page components, one per route |
| `components/` | Reusable UI components used by pages |
| `store/` | Zustand stores (global state + API calls) |
| `lib/` | Utility modules (axios instance, language map) |
| `layout/` | Shared page structure (Navbar + Outlet) |
| `assets/` | Static files (images, SVGs) |

### 21.3 Separation of Concerns

- API calls are in Zustand stores (not inside components) — components just call store actions
- Validation logic is in Zod schemas and express-validator rules — not mixed into business logic
- Database access is only in controllers (via Prisma) — routes don't touch the DB
- JWT logic is only in auth middleware and auth controller

---

## 22. Design Patterns

### 22.1 Singleton Pattern — Prisma Client

**Confirmed from `libs/db.js`**:
```javascript
export const db = globalForPrisma.Prisma || new PrismaClient();
```
Only one Prisma Client instance is created per process. This is a classic Singleton pattern — ensures one shared connection pool.

### 22.2 Middleware Chain Pattern (Chain of Responsibility)

**Confirmed from route definitions**:
```javascript
problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createProblem);
```
Each middleware function calls `next()` to pass control to the next handler. This is the **Chain of Responsibility** pattern.

### 22.3 Factory Function Pattern — Validators

**Confirmed from `validator.js` and `auth.routes.js`**:
```javascript
const userRegisterationValidator = () => { return [...rules] };
// Usage:
authRoutes.route("/register").post(userRegisterationValidator(), validate, registerUser);
```
`userRegisterationValidator()` is a **factory function** — it creates and returns the array of validator rules each time it's called. The comment in the route file even says `/**factory pattern */`.

### 22.4 Store Pattern (Observer-like) — Zustand

Zustand stores are subscribed to by components. When store state changes, all subscribing components re-render. This is similar to the Observer/Publisher-Subscriber pattern.

### 22.5 Wrapper Pattern — asyncHandler

`asyncHandler` wraps any async function to add error forwarding. This is an **Adapter/Decorator pattern** — it enhances the behavior of the original function without modifying it.

---

## 23. Core Technology Concepts

### 23.1 What is REST?

**REST (Representational State Transfer)** is an architectural style for APIs:
- **Stateless**: Each request is independent
- **Resources**: URLs identify resources (`/problems/123`)
- **HTTP Methods**: GET=read, POST=create, PUT=update, DELETE=remove
- **Uniform Interface**: Consistent structure across all endpoints

### 23.2 What is JWT internally?

JWT = `base64url(header) + "." + base64url(payload) + "." + HMAC_SHA256(header + "." + payload, secret)`

The secret key is only known to the server. Anyone can decode (base64url decode) the payload and read it, but they cannot change it without invalidating the signature. This is why sensitive data shouldn't be put in JWT — it's encoded not encrypted.

### 23.3 What is Prisma Client doing under the hood?

Prisma Client generates SQL from your JavaScript/TypeScript method calls:
```javascript
db.user.findUnique({ where: { email } })
// Generates: SELECT * FROM "User" WHERE email = $1 LIMIT 1
```
It uses **parameterized queries** which prevent SQL injection by sending data separately from the SQL command.

### 23.4 What is bcrypt doing internally?

bcrypt = `$2b$10$[22-char-salt][31-char-hash]`

The "10" is the work factor (2^10 = 1024 iterations of hashing). It is intentionally slow — making it computationally expensive to brute-force. A modern GPU can try billions of MD5 hashes per second but only thousands of bcrypt hashes per second.

### 23.5 What is the Event Loop?

Node.js is single-threaded but handles many concurrent requests via the event loop:
1. A request comes in → starts a DB query (non-blocking)
2. While waiting for DB, event loop handles another request
3. DB query completes → event loop executes the callback
4. Response sent

This is why Node.js is great for I/O-bound (database, HTTP) operations but bad for CPU-bound operations (image processing, heavy computation).

### 23.6 What is CORS and why is it needed?

Browsers enforce Same-Origin Policy: `http://localhost:5173` cannot make requests to `http://localhost:8080`. CORS allows the server to say "I trust requests from `localhost:5173`."

Browsers first send a **preflight OPTIONS request** to check if the cross-origin request is allowed, then send the actual request if permitted.

### 23.7 What does Vite do?

**Vite** (French for "fast") is a modern frontend build tool:
- In development: serves files directly as ES modules via native browser ESM — extremely fast startup
- Uses **HMR (Hot Module Replacement)** to update only changed modules without full page reload
- In production: `npm run build` uses **Rollup** to bundle everything into optimized static files

### 23.8 What is Zustand vs Redux?

| Feature | Zustand | Redux |
|---|---|---|
| Boilerplate | Minimal | Heavy (actions, reducers, store config) |
| Size | ~1KB | ~2KB + Redux Toolkit |
| Learning curve | Low | High |
| DevTools | Yes | Yes |
| Used for | Simple-medium apps | Large-scale apps with complex state |

---

## 24. Design Decisions & Trade-offs

### Decision 1: PostgreSQL over MongoDB

**Chosen**: PostgreSQL

**Reason**: The data model is clearly relational — users, problems, submissions, test cases all have strict relationships. Transactions are needed (submission + test case results should be atomic). Strong consistency is required.

**Alternative**: MongoDB

**Trade-off gained**: ACID transactions, foreign keys, joins, relational integrity
**Trade-off lost**: Schema flexibility (but actually wanted here), horizontal scaling simplicity

### Decision 2: JWT in Cookies over Authorization Header

**Chosen**: JWT stored in cookies, sent automatically

**Alternative**: JWT in `localStorage`, manually sent in `Authorization: Bearer <token>` header

**Reason**: HttpOnly cookies are inaccessible to JavaScript — prevents XSS attacks from stealing tokens

**Trade-off gained**: Better XSS protection
**Trade-off lost**: CSRF vulnerability (cookies are sent with every request including cross-site form submissions) — but this project has no CSRF protection

### Decision 3: Prisma over raw SQL or Sequelize

**Chosen**: Prisma ORM

**Alternative**: Sequelize, TypeORM, raw `pg` queries

**Reason**: Type-safe query builder, excellent TypeScript/JS types, clean migration system, great DX

**Trade-off gained**: Type safety, auto-completion, migrations
**Trade-off lost**: Some complex queries are harder to express in Prisma than raw SQL

### Decision 4: Zustand over Redux

**Chosen**: Zustand

**Alternative**: Redux Toolkit, React Context + useReducer

**Reason**: Much less boilerplate, simple API, handles all state needs for this app size

**Trade-off gained**: Simpler code, faster development
**Trade-off lost**: Less structured for very large teams (Redux enforces patterns)

### Decision 5: Polling Judge0 vs Webhooks

**Chosen**: Server-side polling (1-second interval)

**Alternative**: Webhooks (Judge0 pushes results when done) or WebSockets (real-time updates)

**Reason**: Simple to implement, no need for public URL (for webhooks) or persistent connections

**Trade-off gained**: Simplicity
**Trade-off lost**: Extra network requests, server resources held during polling, scalability issues

### Decision 6: Storing JSON in PostgreSQL for test cases, code snippets

**Chosen**: `Json` type for `testcases`, `examples`, `codeSnippets`, `referenceSolutions`

**Alternative**: Separate tables (e.g., `CodeSnippet` table with `language` and `code` columns)

**Reason**: Flexible, avoids complex joins for reading a single problem

**Trade-off gained**: Simple reads, schema flexibility
**Trade-off lost**: No DB-level validation, harder to query by specific language, more complex partial updates

---

## 25. Performance

### Current Performance Characteristics

**What is optimized**:
- `TestCaseResult` has an index on `submissionId` — fast lookup by submission
- `ProblemSolved.@@unique([userId, problemId])` doubles as an index
- Prisma connection pooling (default pool of 10 connections)
- `useMemo` in ProblemTable — avoids re-computing filtered/paginated problems on every render
- Prisma `select` — only fetches needed fields (e.g., auth middleware only selects id, image, fullname, username, email, role)

**Potential bottlenecks**:

1. **N+1 Query Risk**: `getAllProblems` fetches all problems with `include: { solvedBy: { where: userId } }`. For 1000 problems, Prisma actually handles this efficiently with a single JOIN query (not N+1), but the response payload could become very large.

2. **No pagination on getAllProblems**: The API returns ALL problems in one request. At scale, this needs server-side pagination.

3. **No database indexes on `Submission.userId` and `Submission.problemId`**: Queries filtering by userId/problemId will do full table scans as submissions grow.

4. **Polling loop blocking**: The polling in `pollBatchResults` uses a busy `while(true)` loop. If Judge0 takes 10 seconds, the HTTP request hangs for 10 seconds, holding a connection from the pool.

5. **Large JSON columns**: `codeSnippets` and `referenceSolutions` in the Problem table store full code for each language. Fetching the problem list returns all of this data even when only title and difficulty are needed.

6. **Client-side filtering/pagination**: ProblemTable does filtering and pagination in the browser using `useMemo`. Fine for small datasets; at scale, this should be server-side.

---

## 26. Scalability

### 26.1 Current Architecture at Different Scales

**10 users**:
Current implementation works perfectly. Single server, single DB, simple polling.

**1,000 users**:
- Database queries remain fast with existing indexes
- 1,000 concurrent users could cause issues if many are executing code simultaneously (polling holds connections)
- Node.js's event loop handles concurrent connections well for I/O-bound operations

**100,000 users**:
Current implementation would struggle:
- Single Express process becomes a bottleneck
- PostgreSQL connection pool exhausted (default 10 connections)
- Judge0 API rate limits become critical
- `getAllProblems` returning all problems without pagination crushes the DB

**1 million users**:
Major architectural changes needed (see below)

### 26.2 What Is Currently Implemented

- Stateless JWT-based auth → backend instances can be scaled horizontally (no session state)
- Prisma connection pooling (basic)
- Client-side filtering to reduce DB query load

### 26.3 What Would Be Required for Large Scale (Not Implemented)

- **Load balancer** (Nginx/AWS ALB) distributing requests across multiple Node instances
- **Database read replicas** for read-heavy operations (getAllProblems)
- **Redis cache** for frequently accessed data (problem list, user profile)
- **Server-side pagination** instead of returning all problems
- **Background job queue** (Bull/BullMQ) for async code execution instead of blocking HTTP
- **WebSockets or SSE** for real-time execution status updates instead of polling
- **CDN** for static frontend assets
- **Database indexes** on Submission.userId, Submission.problemId, Problem.difficulty
- **Rate limiting** (Redis-based) to prevent API abuse

---

## 27. Error Handling

### 27.1 Backend Error Handling Strategy

**Layer 1 — Route-level validation** (`validate` middleware):
- express-validator catches format errors (invalid email, short password)
- Throws `ApiError(422, "Received data is not valid", errors)`

**Layer 2 — Controller try/catch**:
- Most controllers have `try { } catch (error) { return res.status(500).json(...) }`
- Some use `asyncHandler` which passes errors to `next(err)`

**Layer 3 — Global error handler** (`index.js`):
```javascript
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(new ApiResponse(err.statusCode, err.errors, err.message));
  }
  res.status(500).json(new ApiResponse(500, [], "Internal Server Error"));
});
```

### 27.2 Error Flow Example: Judge0 Fails

```
executeCode controller calls submitBatch()
    │
    ▼ axios.post(Judge0 URL) → network error (connection refused)
    │
    ▼ axios throws Error
    │
    ▼ try/catch in executeCode controller catches it
    │
    ▼ return res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    │
    ▼ Frontend: toast.error("Error executing code")
    │  set({ isExecuting: false })
```

### 27.3 Frontend Error Handling

Each Zustand store action has try/catch:
```javascript
try {
  const res = await axiosInstance.get(...);
  set({ data: res.data });
} catch (error) {
  console.log("Error", error);
  toast.error("Error message");
} finally {
  set({ isLoading: false });  // always reset loading state
}
```

**Issue**: Error details from the server (specific error message) are often swallowed — frontend always shows generic "Error getting problems" instead of the actual server error message.

---

## 28. Testing

**No tests are present in this project.**

There are no unit tests, integration tests, end-to-end tests, or test configuration files anywhere in the repository. No Jest, Mocha, Vitest, Cypress, or any testing framework is installed.

**What should be tested in an ideal version**:
- Unit tests: `asyncHandler`, `ApiError`, `ApiResponse`, `getJudge0LanguageId`
- Integration tests: Auth routes (register, login, logout flow)
- API tests: Problem CRUD, execution endpoint
- Database tests: Schema constraints (unique violations, cascade deletes)
- Frontend tests: Component rendering, store actions

---

## 29. Potential Improvements

1. **Fix broken `resendVerificationEmail`** — Uses Mongoose syntax in a Prisma project; will crash at runtime

2. **Implement `updateProblem`** — Function body is empty

3. **Implement refresh token rotation** — Currently, when the 15-minute access token expires, users must log in again; add `POST /auth/refresh` endpoint

4. **Add database indexes** — On `Submission.userId`, `Submission.problemId`

5. **Add pagination to `getAllProblems`** — Server-side pagination with `skip` and `take` Prisma parameters

6. **Wrap executeCode in a database transaction** — Submission + TestCaseResults should be atomic

7. **Hash the refresh token in DB** — Plain refresh tokens in DB are a security risk

8. **Add rate limiting** — Use `express-rate-limit` to prevent brute-force attacks on login

9. **Add server-side filtering** — Move problem filtering to DB queries (WHERE difficulty = ?, LIKE title%)

10. **Add CSRF protection** — Use `csurf` middleware or `SameSite=Strict` cookies

11. **Remove debug `console.log` statements** — Production code shouldn't expose internal data

12. **Add tests** — No tests exist at all

13. **Add Docker support** — Makes deployment and Judge0 setup reproducible

14. **Implement discussion feature** — Tab exists in UI but shows "No discussions yet"

15. **Implement forgot password flow** — Template exists in `mail.js` but the endpoint is missing

---

## 30. Technical Challenges

### Challenge 1: Judge0 Polling While HTTP Request is Open

**Problem**: Code execution can take multiple seconds. The frontend must wait. Simple HTTP doesn't support "push" notifications.

**Solution**: Backend holds the HTTP connection open while it polls Judge0 internally. The frontend shows a loading spinner.

**Limitation**: Long-running executions can approach HTTP timeout limits.

### Challenge 2: Cross-Origin Cookies

**Problem**: Frontend runs on port 5173, backend on 8080. Browsers block cross-origin cookies by default.

**Solution**: CORS `credentials: true` + Axios `withCredentials: true` + explicit origin allowlist. For tunnel URLs (HTTPS), cookies need `SameSite=None; Secure`. The dev tunnel middleware in `index.js` handles this dynamically.

### Challenge 3: Preventing Duplicate ProblemSolved Records

**Problem**: If a user submits correct code twice, two `ProblemSolved` records shouldn't be created.

**Solution**: `@@unique([userId, problemId])` constraint in Prisma schema + `db.problemSolved.upsert()` in the controller.

### Challenge 4: Validating Problems Before Saving

**Problem**: Admin might provide a broken reference solution or wrong test cases, causing the problem to be unsolvable.

**Solution**: Before saving to DB, run all reference solutions against all test cases via Judge0. Only save if every solution passes every test case.

---

## 31. Project Explanation — 30 Seconds

"I built a LeetCode-inspired coding platform called LeetLab. It's a full-stack web app where users can browse coding problems, write solutions in a browser code editor, run their code against test cases, and track their progress. The frontend is React with Zustand for state management, the backend is Node.js and Express, the database is PostgreSQL managed through Prisma ORM, and code execution is powered by the Judge0 API which safely runs code in a sandboxed environment."

---

## 32. Project Explanation — 1 Minute

"LeetLab is a full-stack LeetCode clone that I built using a React frontend and a Node.js/Express backend, with PostgreSQL as the database and Prisma as the ORM.

The key feature is code execution — when a user submits code, the backend sends it to Judge0, an open-source code execution API, which runs the code against hidden test cases and returns results. The backend polls Judge0 every second until all tests finish, then saves the submission to the database.

Authentication uses JWT tokens stored in HTTP-only cookies. There's role-based access control — Admin users can create and delete problems; regular users can only solve them.

Users can also organize problems into personal playlists and track their submission history.

The system is designed with a clean separation: React components use Zustand stores for state and API calls, the backend uses a controller-service-middleware architecture, and the database is normalized with proper foreign keys and cascade deletes."

---

## 33. Project Explanation — 3 Minutes

"LeetLab is a platform inspired by LeetCode that I built to demonstrate full-stack engineering skills.

**Frontend**: Built with React 19 using Vite as the build tool. State management uses Zustand — lightweight alternative to Redux. I used Tailwind CSS and DaisyUI for the UI. Forms use React Hook Form with Zod for client-side schema validation. The code editor is Monaco Editor — the same engine that powers VS Code, embedded in the browser.

**Backend**: Node.js with Express 5. I structured it using MVC — routes map URLs to controllers, controllers contain business logic, and middleware handles cross-cutting concerns like authentication and validation. I have a custom ApiError class and ApiResponse class for consistent response shapes, and an asyncHandler wrapper that forwards unhandled promise rejections to Express's global error handler.

**Database**: PostgreSQL managed through Prisma ORM. I have 6 tables: User, Problem, Submission, TestCaseResult, ProblemSolved, Playlist, and ProblemsInPlaylist. The relationships are: a User creates many Problems, Problems have many Submissions, Submissions have many TestCaseResults, and Users and Problems have a many-to-many relationship through ProblemSolved.

**Code Execution**: The most interesting part. When a user submits code, I extract the test cases from the problem, build a batch submission for Judge0 (one submission per test case), POST it to Judge0, receive tokens, then poll the batch results API every 1 second until all executions finish. I compare actual output versus expected output, save everything to PostgreSQL, and if all test cases pass, mark the problem as solved using an upsert to prevent duplicates.

**Authentication**: JWT-based. Access token (15 minutes, readable by JS) and refresh token (7 days, HTTP-only) stored in cookies. The auth middleware verifies the JWT signature and expiry, then fetches the user from DB to confirm they still exist. RBAC is handled by a separate checkAdmin middleware.

**Email**: Registration sends a verification email through Mailtrap via Nodemailer. The token uses crypto.randomBytes for generation, SHA-256 hash for storage — so even if the DB is compromised, the attacker can't use the stored hash to verify accounts."

---

## 34. Infosys SP Interview Questions

### Level 1 — Basic

**Q1: Explain your project in brief.**
> LeetLab is a full-stack coding interview platform similar to LeetCode. Users can solve coding problems in a browser-based code editor, execute their code, see results, and track their progress. Admins can add new problems.

**Q2: Why did you build this project?**
> To learn and demonstrate full-stack development skills — frontend with React, backend with Node.js/Express, database design with PostgreSQL/Prisma, and third-party API integration with Judge0 for secure code execution.

**Q3: What technologies did you use?**
> Frontend: React, Vite, Zustand, Tailwind CSS, DaisyUI, Axios, Monaco Editor, React Hook Form, Zod.
> Backend: Node.js, Express 5, Prisma ORM.
> Database: PostgreSQL.
> External: Judge0 (code execution), Nodemailer + Mailtrap (email), JSON Web Tokens.

**Q4: Explain the architecture.**
> It's a client-server architecture. The React SPA runs in the browser and communicates with the Express backend via REST API over HTTP. The backend uses Prisma to interact with PostgreSQL. Code execution is delegated to Judge0.

**Q5: What is your role in this project?**
> I was the sole developer — designed the architecture, wrote frontend and backend code, designed the database schema, and integrated all external services.

---

### Level 2 — Technical

**Q6: How does JWT authentication work in your project?**
> On login, I create two JWTs — an access token (expires in 15 minutes) and a refresh token (expires in 7 days). Both are stored as cookies. The access token is not HTTP-only so the frontend can read it. The refresh token is HTTP-only for XSS protection. On every protected API call, the authMiddleware reads the access token from the cookie, verifies it with `jwt.verify()`, and fetches the user from DB.

**Q7: Why did you use bcrypt for password hashing?**
> bcrypt is specifically designed for password hashing. Unlike SHA-256 or MD5 which are fast, bcrypt is intentionally slow (configurable work factor). This makes brute-force attacks expensive. It also automatically handles salt generation — adding random data to the password before hashing — so the same password produces a different hash each time, preventing rainbow table attacks.

**Q8: How does code execution work?**
> The frontend sends the source code, language ID, array of test inputs, expected outputs, and problem ID to the backend. The backend builds a batch submission for Judge0 with one submission per test case, POSTs to Judge0, receives tokens, then polls every second until all executions finish. It compares actual outputs with expected outputs, saves the submission and test case results to PostgreSQL, and if all tests pass, marks the problem as solved.

**Q9: What is Prisma and why did you use it?**
> Prisma is an ORM — it lets me interact with PostgreSQL using JavaScript method calls instead of raw SQL. It generates a type-safe client from my schema, handles migrations, and prevents SQL injection through parameterized queries. I used it for developer productivity and schema management.

**Q10: What is CORS and why did you need it?**
> CORS (Cross-Origin Resource Sharing) is a browser security mechanism. My frontend runs on port 5173 and backend on 8080 — they're different "origins." Without CORS headers on the backend, the browser would block all API calls. I configured CORS to allow specific origins and credentials (cookies).

**Q11: How does React Router work?**
> React Router is a client-side routing library. When you navigate to `/problem/123`, no new HTML page is fetched from the server. Instead, React Router intercepts the URL change, matches it against defined routes, and renders the appropriate component — ProblemPage with id="123" from useParams(). This is what makes it a Single-Page Application.

**Q12: What is Zustand and why not Redux?**
> Zustand is a lightweight state management library. Each store is a custom hook created with `create()` that holds state and action functions. Components subscribe to the store and re-render when state changes. I chose it over Redux because Redux requires a lot of boilerplate (actions, reducers, store config, selectors) while Zustand is minimal — the same functionality in a fraction of the code.

**Q13: How does the Monaco Editor work in your project?**
> Monaco Editor is the engine behind VS Code, available as an npm package. I embedded it using `@monaco-editor/react`. It accepts `language`, `value`, and `onChange` props. When the user changes the selected language dropdown, I update both the language prop (for syntax highlighting) and the value prop (to show the language-specific code snippet). On "Run Code", I send the editor's current value to the backend.

**Q14: What HTTP methods does your API use and why?**
> GET for retrieving data (problems, submissions, profile), POST for creating resources or triggering actions (login, register, create problem, execute code), PUT for updates (update problem — though not implemented), DELETE for removing resources (delete problem, delete playlist). This follows REST conventions.

**Q15: How is the database schema designed?**
> I have 7 tables: User, Problem, Submission, TestCaseResult, ProblemSolved (junction), Playlist, and ProblemsInPlaylist (junction). Users create Problems. Users submit code → Submissions, which have TestCaseResults. Users solve Problems — tracked in ProblemSolved (a many-to-many junction table). Users have Playlists containing Problems — tracked in ProblemsInPlaylist. All foreign keys use cascade delete.

---

### Level 3 — Deep Technical

**Q16: How does the asyncHandler utility work internally?**
> `asyncHandler` is a higher-order function — it takes a route handler function as input and returns a new function. The new function calls the original handler inside `Promise.resolve().catch(next)`. If the async handler throws or rejects, the `.catch(next)` forwards the error to Express's global error handler (`next(err)`). This prevents unhandled promise rejection crashes.

**Q17: How does JWT verification work internally?**
> A JWT is `base64url(header).base64url(payload).signature`. The signature is `HMAC-SHA256(header + "." + payload, secretKey)`. When `jwt.verify()` is called, it recalculates the HMAC with our secret key and compares it to the signature in the token. If they match, the token is authentic and unmodified. If the token is expired, `jwt.verify` throws `TokenExpiredError`.

**Q18: How does the Prisma singleton pattern work?**
> In development, nodemon restarts the server on file changes. Without the singleton, every restart creates a new PrismaClient with a new connection pool, eventually exhausting PostgreSQL's connection limit. By storing the client on `globalThis`, which persists across module re-evaluations, the same client is reused. In production, modules are only loaded once, so this issue doesn't arise.

**Q19: Explain how upsert prevents duplicate ProblemSolved records.**
> Prisma's `upsert` attempts to find a record matching the `where` clause. If found, it runs the `update` operation (empty here — no changes needed). If not found, it runs the `create` operation. The `@@unique([userId, problemId])` constraint in the schema means the compound key is enforced at DB level too — even if upsert somehow fails, the DB would reject a duplicate insert.

**Q20: How does bcrypt compare work?**
> When you `bcrypt.hash("password", 10)`, bcrypt generates a random salt and stores it as part of the hash string: `$2b$10$[22-char-salt][31-char-hash]`. When you `bcrypt.compare("password", storedHash)`, bcrypt extracts the salt from the stored hash, re-hashes the input with that same salt, and compares. So it doesn't need the original salt stored separately.

**Q21: How do cookies with SameSite=None work for dev tunnels?**
> `SameSite=Lax` cookies are only sent on same-site requests. Dev tunnels expose the backend at `fv1w1ts7-5173.inc1.devtunnels.ms` — a completely different domain from `localhost:5173`. This makes it "cross-site," so Lax cookies aren't sent. Setting `SameSite=None; Secure=true` tells browsers to send the cookie on all cross-site requests, but only over HTTPS (which tunnels provide).

**Q22: Why does the `getAllProblems` query include `solvedBy` with a where clause?**
> The query: `db.problem.findMany({ include: { solvedBy: { where: { userId: req.user.id } } } })` fetches all problems but for each problem, only includes `ProblemSolved` records belonging to the current user. This is a single efficient SQL query with a JOIN + WHERE — not N+1 queries. On the frontend, `problem.solvedBy.length > 0` tells if the user solved this problem, which shows the checkbox as checked.

---

### Level 4 — Scenario Based

**Q23: What happens if the database goes down while a user is executing code?**
> The code is first sent to Judge0 (external service), which succeeds. Judge0 returns results. Then `db.submission.create()` fails with a Prisma error. The `asyncHandler` catches it and calls `next(err)`. The global error handler returns HTTP 500 to the frontend. The frontend shows "Error executing code". The submission is lost — it won't appear in history. The problem won't be marked as solved even if the code was correct.

**Q24: What happens if Judge0 returns a wrong answer but the user's code is actually correct?**
> The backend compares `result.stdout.trim()` with `expected_output.trim()`. If they don't match (even whitespace or newline differences), `passed = false` and status becomes "Wrong Answer." This is a known limitation — whitespace sensitivity in comparison. The trim() call helps somewhat but trailing newlines vs spaces could still cause issues.

**Q25: What happens if two users submit code for the same problem at exactly the same time?**
> Each request is independent. The auth middleware gives each request its own `req.user`. Each controller creates its own `Submission` record with the user's ID. No shared mutable state in the server (stateless REST). The `ProblemSolved.upsert()` uses a unique constraint at DB level, so even if two inserts race, the constraint prevents a duplicate. No race condition issues here.

**Q26: What happens if the access token expires while the user is on the problem page?**
> The authMiddleware detects `TokenExpiredError` and returns HTTP 401 with "Access token has expired." The Axios request fails. The Zustand store's catch block runs `toast.error(...)`. Currently, there's no automatic token refresh — the user would need to log in again. (The refresh token mechanism is not implemented.)

**Q27: How would you scale this application to handle 100,000 concurrent users?**
> Several changes:
> 1. Add a load balancer distributing to multiple Node.js instances
> 2. Since JWT auth is stateless, horizontal scaling works without sticky sessions
> 3. Add Redis cache for the problem list (changes rarely)
> 4. Server-side pagination instead of returning all problems
> 5. Add missing database indexes on Submission.userId, Submission.problemId
> 6. Replace synchronous Judge0 polling with a message queue (Bull/BullMQ) + WebSockets for status updates
> 7. Use connection pooling at DB level (PgBouncer)
> 8. Consider read replicas for heavy read traffic

---

### Level 5 — Why Questions

**Q28: Why PostgreSQL instead of MongoDB?**
> The data is naturally relational — users, problems, submissions, and test cases all have strict relationships. MongoDB is better for flexible, schema-less data. Since I needed foreign keys, cascade deletes, JOIN queries (e.g., find all problems solved by user), and transactional consistency, PostgreSQL was the right choice. MongoDB would require manual relationship management.

**Q29: Why Prisma instead of Sequelize or raw SQL?**
> Prisma provides a more developer-friendly experience — auto-generated TypeScript types, a clean query API, and an excellent migration system. Sequelize has more historical baggage and is harder to get right with complex queries. Raw SQL is more flexible but loses type safety and migration management.

**Q30: Why Zustand instead of Redux?**
> For a project of this size, Redux's boilerplate (action types, action creators, reducers, selectors, middleware config) adds significant overhead without proportional benefit. Zustand achieves the same result — global state shared across components, async actions, loading states — in a fraction of the code.

**Q31: Why React Hook Form instead of managing form state with useState?**
> With `useState`, every keystroke re-renders the entire form component. React Hook Form uses uncontrolled inputs with `refs` under the hood — only the error state changes trigger re-renders. This is significantly more performant for large forms. Combined with Zod, I get type-safe schema-based validation that reuses the validation logic.

**Q32: Why store the refresh token in the database?**
> To enable true logout. JWTs are stateless — you can't "invalidate" them before they expire. By storing the refresh token in DB and clearing it on logout, even if someone steals the refresh token after logout, it won't work (it's no longer in the DB). The access token (15 min) can still be used until it expires, which is acceptable.

**Q33: Why use self-hosted Judge0 instead of the RapidAPI version?**
> Likely engineering rationale: Self-hosted Judge0 has no API rate limits and no per-request cost. For a development project, it avoids monthly API bills. The RapidAPI integration code is commented out, suggesting it may have been tried first and switched to self-hosted.

---

## 35. Scenario-Based Questions

**S1: A user claims their correct code shows "Wrong Answer" — how would you debug?**

1. Check the TestCaseResult records in DB for that submission — look at `stdout` and `expectedOutput`
2. Check for whitespace differences (trailing newline vs no newline)
3. Look at `stderr` and `compileOutput` — maybe there's a runtime error
4. Check if the Judge0 language ID mapping is correct for the selected language
5. Verify the testcase data in the Problem table is correct

**S2: The site is responding slowly — how would you identify the bottleneck?**

1. Check server CPU and memory usage
2. Add response time logging — identify slow routes
3. Use `EXPLAIN ANALYZE` in PostgreSQL on the slow queries
4. Check if `getAllProblems` is returning huge amounts of data
5. Check Judge0 response times — maybe the execution endpoint is slow
6. Check for N+1 query patterns

**S3: An admin accidentally creates a problem with an incorrect test case — what happens?**

The problem creation would fail before saving if the reference solution doesn't produce the expected output. Judge0 runs the reference solution against all test cases. If any test case fails (status.id !== 3), the API returns 400 and the problem is NOT saved. So incorrect test cases + correct reference solutions would cause creation to fail.

However, if both the test case AND reference solution are wrong together (consistently wrong), it would pass validation and save bad data.

**S4: How would you add a leaderboard feature?**

1. Add a `points` field to User model, or compute from ProblemSolved count
2. Create `GET /api/v1/leaderboard` endpoint: `db.user.findMany({ orderBy: { problems_solved_count: 'desc' }, take: 50 })`
3. For real-time leaderboard, add a sorted set in Redis with userId as member and score as rank
4. Frontend: new LeaderboardPage, new entry in Navbar

---

## 36. Why-Questions

| Question | Answer |
|---|---|
| Why ES Modules ("type": "module") in backend? | Modern JavaScript standard, allows `import/export` syntax natively without Babel |
| Why two separate token expiries (15min + 7 days)? | Short access token = less risk if stolen; long refresh token = user doesn't need to re-login daily |
| Why `credentials: true` in CORS? | Required for cookies to be sent/received in cross-origin requests |
| Why `base64_encoded: false` in Judge0? | Input/output is plain text; base64 encoding would add unnecessary complexity |
| Why `@default(uuid())` for PKs instead of auto-increment? | UUID primary keys are globally unique, harder to enumerate/guess |
| Why is `updatedAt` on every table? | Audit trail — know when any record was last modified |
| Why `onDelete: Cascade`? | Prevent orphaned records — if user deleted, all their data is cleaned up automatically |
| Why `UNIQUE(userId, name)` on Playlist? | Prevent duplicate playlist names per user — business logic constraint at DB level |
| Why `trim()` when comparing test outputs? | Judge0 might add trailing newlines to output — trim prevents false mismatches |
| Why `httpOnly: false` for accessToken? | To allow frontend JS to read it (though with `withCredentials` this isn't strictly needed) |

---

## 37. Beginner Explanation

Imagine you're building a website where people can solve coding puzzles.

```
👤 YOU (Browser)
     │
     │  You type your code into a box (Monaco Editor)
     │  and click "Run Code"
     │
     ▼
📱 FRONTEND (React App in Your Browser)
     │
     │  The app packages your code and sends it over the internet
     │  to our server. This message is called an HTTP Request.
     │
     ▼
💻 BACKEND (Node.js Server)
     │
     │  The server receives your code. But it can't run code itself
     │  (too risky — what if someone writes code that deletes files?).
     │  So it asks a special "Code Runner" service called Judge0.
     │
     ▼
⚙️ JUDGE0 (Code Execution Service)
     │
     │  Judge0 runs your code in a safe sandboxed environment.
     │  It feeds in the test inputs and captures what your code prints.
     │  It sends the results back.
     │
     ▼
💻 BACKEND (continued)
     │
     │  The server compares your code's output with the expected output.
     │  Did they match? It saves all this to the database.
     │  "User X submitted Python code for Problem Y. Result: Wrong Answer."
     │
     ▼
🗄️ DATABASE (PostgreSQL)
     │
     │  The database is like a giant spreadsheet that never forgets.
     │  It stores users, problems, submissions, and test results.
     │
     ▼
💻 BACKEND sends the results back
     │
     ▼
📱 FRONTEND shows you the results
     │
     ▼
👤 YOU see: Test Case 1 ✅ Passed, Test Case 2 ❌ Failed
```

**Where does the data go?**
- Your code: sent to backend → sent to Judge0 → results saved in database
- Your account info: stored in PostgreSQL database
- Your token (JWT): stored in a cookie in your browser — proves who you are
- Your password: NEVER stored as plain text — always hashed

**Why is there a server at all?**
- The server protects the database (you can't directly access it from browser)
- The server runs business logic (checking if you're admin, validating data)
- The server manages authentication (your login token)
- The server talks to Judge0 securely (API keys, etc.)

---

## 38. Glossary

| Term | Simple Definition | In This Project |
|---|---|---|
| API | Application Programming Interface — a set of URLs your frontend calls to get data from backend | All `/api/v1/...` endpoints |
| REST | Architectural style for APIs using HTTP methods and URLs to represent resources | All backend routes follow REST conventions |
| JWT | JSON Web Token — a signed token that proves your identity, has an expiry time | Used for authentication; access token (15min) + refresh token (7d) |
| Cookie | Small piece of data the browser stores and sends with every request to the server | JWT stored in cookies (refreshToken is HttpOnly) |
| HttpOnly | Cookie attribute that prevents JavaScript from reading the cookie — XSS protection | `refreshToken` cookie |
| CORS | Browser security rule that needs explicit server permission for cross-origin requests | Configured in Express with `cors()` middleware |
| Middleware | Function that runs between receiving a request and sending a response | `authMiddleware`, `validate`, `checkAdmin` |
| ORM | Object-Relational Mapper — maps DB tables to code objects | Prisma ORM maps PostgreSQL tables to JS objects |
| Prisma | Specific ORM for Node.js with schema-first design | `db.user.findUnique()`, `db.problem.create()` |
| Migration | Script that changes the database schema over time | 6 migration files in `/prisma/migrations` |
| bcrypt | Password hashing algorithm that is intentionally slow | Hashes passwords on registration |
| UUID | Universally Unique Identifier — a 128-bit random ID | Used as primary key for all tables |
| Singleton | Design pattern ensuring only one instance of a class exists | Prisma Client in `libs/db.js` |
| Zustand | Lightweight state management library for React | Manages global app state (auth, problems, submissions) |
| React Hook Form | Library for performant form handling in React | Login, Signup, CreateProblemForm |
| Zod | TypeScript-first schema validation library | Validates form data before API calls |
| Monaco Editor | VS Code's code editor engine, available for web | Code writing area in ProblemPage |
| Judge0 | Open-source code execution API | Runs user-submitted code safely |
| Mailtrap | Email testing service that catches emails in a sandbox | Email verification emails during development |
| Nodemailer | Node.js library for sending emails via SMTP | Sends verification emails |
| SPA | Single-Page Application — no full page reloads when navigating | The React frontend |
| Vite | Modern build tool / dev server for frontend apps | Serves frontend in dev, builds for production |
| DaisyUI | Component library built on top of Tailwind CSS | Buttons, cards, badges, modals |
| Cascade Delete | When a parent record is deleted, all related child records are also deleted | All FK relationships in the schema |
| Junction Table | A table that implements a many-to-many relationship | `ProblemSolved`, `ProblemsInPlaylist` |
| Upsert | Database operation: Update if exists, Insert if not | Used for `ProblemSolved` to prevent duplicates |
| async/await | Syntax for writing asynchronous code that reads like synchronous code | Used throughout backend controllers |
| Event Loop | Node.js mechanism for handling multiple requests without blocking | Why Node.js can handle many concurrent requests |
| RBAC | Role-Based Access Control — users have roles (ADMIN, USER) that control access | `checkAdmin` middleware |
| Token Polling | Repeatedly checking an API for results that aren't ready yet | Backend polls Judge0 every 1 second |
| HMAC | Hash-based Message Authentication Code — used to sign JWTs | JWT signature algorithm |
| Base64url | URL-safe base64 encoding used in JWT | Header and payload encoding in JWT |
| Parameterized Queries | SQL queries where data is passed separately from SQL code, preventing injection | Prisma always uses this |

---

## 39. Final Interview Cheat Sheet

```
════════════════════════════════════════════════════════
                    LEETLAB — QUICK REVISION
════════════════════════════════════════════════════════

PURPOSE
→ LeetCode-inspired coding challenge platform
→ Browse problems, write solutions, execute code, track progress

ARCHITECTURE
→ Client-Server (NOT microservices)
→ React SPA ←HTTP→ Express API ←Prisma→ PostgreSQL
→ Backend → Judge0 (code execution)
→ Backend → Mailtrap (email verification)

FRONTEND
→ React 19 + Vite 7 (build tool)
→ Zustand (state management, NOT Redux)
→ React Router DOM v7 (client-side routing)
→ Tailwind CSS + DaisyUI (styling)
→ Monaco Editor (code editor, same as VS Code)
→ React Hook Form + Zod (form validation)
→ Axios (HTTP client, withCredentials:true for cookies)

BACKEND
→ Node.js + Express 5
→ Port: 8080
→ ES Modules (import/export, NOT require)
→ asyncHandler wraps async controllers (forwards errors to global handler)
→ ApiError + ApiResponse for consistent response shape
→ Middleware chain: cors → cookieParser → router → authMiddleware → controller

DATABASE
→ PostgreSQL (relational, ACID, foreign keys)
→ Prisma ORM (schema.prisma, migrations, Prisma Client)
→ 7 tables: User, Problem, Submission, TestCaseResult,
            ProblemSolved, Playlist, ProblemsInPlaylist
→ UUID primary keys (not auto-increment)
→ cascade delete on all FK relationships
→ Key constraint: @@unique([userId, problemId]) on ProblemSolved

AUTH
→ JWT: access token (15min, cookie readable by JS) + refresh token (7d, httpOnly)
→ bcrypt (salt rounds=10) for password hashing
→ SHA-256 for email verification tokens (not stored as plaintext)
→ authMiddleware: reads accessToken cookie → jwt.verify → db.user.findUnique → req.user = user
→ checkAdmin: checks req.user.role === "ADMIN"
→ Refresh token NOT implemented (access token expiry = logged out)

CODE EXECUTION (KEY FEATURE)
→ User writes code in Monaco Editor
→ handleRunCode() → useExecutionStore.executeCode()
→ POST /api/v1/execute-code with { source_code, language_id, stdin[], expected_outputs[], problemId }
→ Backend: submitBatch(submissions) → Judge0 → tokens[]
→ pollBatchResults(tokens) → polls every 1 second until done
→ Compare stdout.trim() with expected_output.trim()
→ db.submission.create() + db.testCaseResult.createMany()
→ If allPassed: db.problemSolved.upsert() (idempotent)

APIS (All prefixed /api/v1/)
→ /auth: register, verify, login, logout, profile, check
→ /problems: create(admin), get-all, get-by-id, update(not implemented), delete(admin), get-solved
→ /execute-code: POST (runs code)
→ /submission: get-all, get-by-problem, count-by-problem
→ /playlist: CRUD + add/remove problems

JUDGE0 LANGUAGE IDs
→ Python: 71 | JavaScript: 63 | Java: 62 | TypeScript: 74
→ Status 3 = Accepted (used in createProblem validation)

KNOWN ISSUES (Be honest in interview!)
→ resendVerificationEmail is BROKEN (uses Mongoose syntax)
→ updateProblem is NOT IMPLEMENTED (empty function)
→ No refresh token rotation → login required after 15min
→ No rate limiting
→ No tests
→ No Docker
→ No production deployment config
→ executeCode lacks DB transaction (orphaned submissions possible)
→ Refresh token stored as plaintext in DB (should be hashed)

DESIGN PATTERNS
→ Singleton: Prisma Client in db.js
→ Chain of Responsibility: Express middleware chain
→ Factory Function: userRegisterationValidator()
→ Decorator/Adapter: asyncHandler()
→ Observer: Zustand stores → component re-renders

KEY DESIGN DECISIONS
→ PostgreSQL (not MongoDB) → relational data, ACID, FK relationships
→ JWT in cookies (not localStorage) → XSS protection
→ Zustand (not Redux) → less boilerplate
→ Prisma (not raw SQL) → type-safe, migrations
→ Polling Judge0 (not webhooks) → simpler, no public URL needed

CRITICAL INTERVIEW POINTS
→ "How is code executed?" → Judge0 batch API + polling
→ "How is auth implemented?" → JWT in cookies, 2 tokens
→ "How are passwords stored?" → bcrypt hash, salt rounds=10
→ "What prevents duplicate solved records?" → @@unique + upsert
→ "Why PostgreSQL?" → relational data, ACID, transactions
→ "What would you improve?" → refresh tokens, rate limiting, tests, pagination, Docker
════════════════════════════════════════════════════════
```

---

*Document generated from actual source code inspection of the repository at `c:\Users\divya\OneDrive\Desktop\Learning\resume_projects\leetcode_clone`*

*All claims are verified from the actual codebase. Features not implemented are explicitly marked as such. Engineering inferences are labeled as "Likely engineering rationale."*
