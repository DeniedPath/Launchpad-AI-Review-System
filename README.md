# Launchpad AI Review System (L-AIRS)

A web-based platform for Launchpad students to receive AI-powered feedback on their Python code. Built with Next.js, TypeScript, and Prisma, it features:

- Student dashboard for submitting code and viewing AI feedback
- Assignment selection and requirements display
- Markdown-formatted, rubric-based AI feedback (via PlayLab API)
- Admin panel for creating, editing, and managing assignments
- Role-based authentication (NextAuth.js, admin & student)
- Modern UI/UX styled to Launchpad's brand

---

## 🛠 Features

- Submit Python code via text or file upload
- Select assignments from a dropdown
- Receive AI-generated, rubric-based feedback (no code solutions)
- Admin CRUD for assignments (protected pages)
- Authentication for admin and students
- Custom markdown rendering for readable feedback
- Modern, accessible UI

---

## 📦 Tech Stack

- **Frontend:** Next.js 14+, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (via Prisma)
- **AI Integration:** PlayLab API
- **Auth:** NextAuth.js (credentials provider)

---

## 🚀 Getting Started

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/launchpad-code-review-tool.git
   cd launchpad-code-review-tool
   ```
2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=your_postgres_url
   NEXT_PUBLIC_PLAYLAB_API_KEY=your_playlab_api_key
   NEXT_PUBLIC_PLAYLAB_PROJECT_ID=your_playlab_project_id
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```
4. **Run Prisma Migrations & Seed**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. **Run Locally**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Then visit: `http://localhost:3000`

---

## 📁 Project Structure

```
app/            # App routes & pages
components/     # Reusable UI components
lib/            # Utilities and API logic
prisma/         # Prisma schema & migrations
public/         # Static assets
```

---

## 🔐 Authentication

- Admins: Can create, edit, and manage assignments (protected pages)
- Students: Can submit code and view feedback
- Uses NextAuth.js with credentials provider and Prisma adapter

---

## 🧪 AI Integration

- Code and assignment context are sent to PlayLab API
- AI returns structured, markdown-formatted feedback (no code solutions)
- Feedback is rendered with custom markdown styles for readability

---

## 🧾 Deployment

- Production deployment handled by Launchpad
- Set all required environment variables
- Build with `npm run build`
- Provide admin credentials for initial login

---

## 🧑‍💻 Contributing

This project is developed for Launchpad Cohort 3. Internal contributions only.

---

## 📄 License

BSD 3-Clause License
