# Launchpad AI Review System (L-AIRS)

## Project Overview
Industry: Technology/Education
Developer: Launchpad Cohort 1 (Lead: [Kristian])
Completion Date: 06/27/2025
GitHub Repository: [https://github.com/DeniedPath/Launchpad-AI-Review-System.git]
Trello: [https://trello.com/invite/b/682cbc33d8864d5cfd543fad/ATTIf793605f1c1ae34e0dff0769d9f40f2d9F8AA788/launchpad-ai-review-system]
Live Demo: [launchpad-ai-review-system.vercel.app]

---

## Business Problem
### Problem Statement
Launchpad students need timely, structured feedback on their Python code to accelerate learning and improve coding skills. Manual review by instructors is time-consuming and inconsistent, leading to delays and uneven feedback quality. There is a need for an automated, scalable solution that provides actionable, rubric-based feedback without revealing full solutions.

### Target Users
- **Students:** Coding bootcamp participants with beginner to intermediate Python skills, seeking instant, actionable feedback.
- **Admins/Instructors:** Staff who create and manage assignments, monitor student progress, and ensure feedback quality.

### Current Solutions and Limitations
- Manual code review by instructors (slow, inconsistent)
- Limited or generic feedback from static linters or auto-graders
- No unified dashboard for assignment management and feedback delivery

---

## Solution Overview
### Project Description
L-AIRS is a web-based platform that automates code review for Python assignments using AI. Students submit code via a dashboard, select assignments, and receive instant, rubric-based feedback powered by PlayLab AI. Admins can create, edit, and manage assignments through a protected admin panel. The system ensures feedback is structured, actionable, and never reveals full solutions, supporting scalable, high-quality learning.

### Key Features
- Student dashboard for code submission and feedback
- Assignment selection with requirements display
- Markdown-formatted, rubric-based AI feedback
- Admin CRUD for assignments (protected)
- Role-based authentication (admin/student)

### Value Proposition
L-AIRS delivers instant, high-quality feedback at scale, reducing instructor workload and improving student outcomes. Its rubric-based approach ensures consistency, and the modern UI/UX makes it accessible and engaging.

### AI Implementation
- Uses PlayLab API to analyze student code and generate structured feedback
- AI provides rubric-based evaluation (loops, conditionals, etc.)
- No code solutions are revealed, only actionable feedback

### Technology Stack
- **Frontend:** Next.js, React, Radix UI
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon.tech)
- **Authentication:** NextAuth.js (credentials, Prisma adapter)
- **AI Services:** PlayLab API
- **Deployment:** Vercel/Netlify (recommended)
- **Other Tools:** Prisma, ReactMarkdown, ESLint, Prettier

---

## Technical Implementation
### Wireframes & System Architecture
```
[Student] <-> [Next.js Frontend] <-> [API Routes] <-> [Prisma ORM] <-> [PostgreSQL]
                                            |
                                            v
                                    [PlayLab AI API]
[Admin]   <-> [Admin Panel (protected)]
```
- Students interact with the dashboard to submit code and view feedback.
- Admins access protected routes to manage assignments.
- All data flows through API routes, with Prisma handling DB access and PlayLab providing AI feedback.

### Database Schema
See `DATABASE_SCHEMA_DIAGRAM.md` for a full diagram.

- **AdminUser** (id, email, passwordHash, createdAt)
- **Assignment** (id, title, requirements, description, rubric, createdAt, updatedAt, creatorId)
- **Submission** (id, assignmentId, code, feedback, rating, createdAt)

### AI Model Details
- **Model(s) Used:** PlayLab API (cloud-based, proprietary)
- **Purpose:** Analyze student code, provide rubric-based feedback
- **Integration Method:** API calls from backend
- **Model Performance Metrics:** N/A (external API)

#### Key Components and Code Snippets
- **StudentDashboard:** Handles assignment selection, code/file upload, and feedback display
- **AdminEditAssignment:** Protected form for editing assignments
- **AI Integration:**
```ts
const res = await fetch("/api/ai", { method: "POST", body: JSON.stringify({ code, assignment }) });
const data = await res.json();
setFeedback(data.feedback);
```
- **Authentication:**
```ts
import { getServerSession } from "next-auth";
// ...
const session = await getServerSession(authOptions);
if (!session || !session.user.isAdmin) redirect("/pages/login");
```
- **API Routes:**
| Endpoint                | Method | Purpose                    | Auth Required |
|-------------------------|--------|----------------------------|---------------|
| /api/assignments        | GET    | List assignments           | No            |
| /api/assignments        | POST   | Create assignment          | Yes (admin)   |
| /api/assignments?id=... | PUT    | Update assignment          | Yes (admin)   |
| /api/assignments?id=... | DELETE | Delete assignment          | Yes (admin)   |
| /api/ai                 | POST   | Get AI feedback            | No            |

---

## User Interface and Experience
### User Journey
1. User arrives at dashboard
2. Selects assignment, submits code or file
3. Receives instant AI feedback
4. Admins log in to manage assignments

### Key Screens and Components
- **Dashboard:** Assignment selection, code input, feedback display
- **Admin Panel:** Assignment management (create, edit, delete)
- **Login:** Admin authentication

### Responsive Design Approach
- Uses Tailwind CSS and Radix UI for mobile-friendly, accessible layouts

### Accessibility Considerations
- Semantic HTML, keyboard navigation, color contrast, ARIA labels

---

## Testing and Quality Assurance
- Manual and exploratory testing
- Linting and formatting enforced (ESLint, Prettier)
- Known Issues: No automated tests yet; future work planned

---

## Deployment
### Deployment Architecture
- Hosted on Vercel/Netlify (recommended)
- Environment variables required:
  - DATABASE_URL
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL
  - NEXT_PUBLIC_PLAYLAB_API_KEY
  - NEXT_PUBLIC_PLAYLAB_PROJECT_ID

### Build and Deployment Process
1. Set environment variables
2. Run `npm run build`
3. Deploy to Vercel/Netlify

---

## Future Enhancements
- Add automated and integration tests
- Student authentication and progress tracking
- Enhanced admin analytics
- More granular AI feedback and rubric customization
- Scalability improvements for larger cohorts

---

## Lessons Learned
- Integrating AI feedback requires careful prompt engineering
- Prisma and NextAuth.js simplify full-stack development
- UI/UX polish is critical for adoption
- Automated testing and CI/CD should be prioritized early

---

## Project Management
- Development tracked in Trello
- Used GitHub for version control
- Resources: Prisma docs, Next.js docs, PlayLab API docs

---

## Conclusion
L-AIRS delivers scalable, high-quality code review for Launchpad students, reducing instructor workload and improving learning outcomes. The project demonstrates the power of modern full-stack frameworks and AI integration in education.

---

## Appendix
### Setup Instructions
```sh
# Clone the repository
git clone [repository URL]
cd launchpad-code-review-tool

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Additional Resources
- [PlayLab API Documentation]
- [Next.js Documentation]
- [Prisma Documentation]
