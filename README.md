# Launchpad AI Review System (LARS)

A web-based platform built with Next.js to help Launchpad students receive AI-powered feedback on their Python code. Students can submit code snippets or `.py` files and receive structured, rubric-based evaluations without being given full solutions.

---

## 🛠 Features

- Submit Python code via text or file upload
- Select the corresponding assignment from a dropdown list
- Receive AI-generated feedback (via PlayLab API)
- Rubric-based evaluation (loops, conditionals, etc.)
- Admin panel for assignment management
- Authentication system (student & admin roles)

---

## 📦 Tech Stack

- **Frontend:** Next.js 14+, TypeScript, Tailwind CSS
- **Backend:** API Routes (Next.js)
- **AI Integration:** PlayLab
- **Database:** TBD (e.g., Supabase, Firebase, or PostgreSQL)
- **Auth:** NextAuth.js (or similar)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/launchpad-code-review-tool.git
cd launchpad-code-review-tool
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_PLAYLAB_API_URL=your_playlab_api_url
NEXT_PUBLIC_API_KEY=your_playlab_api_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
# or
yarn dev
```

Then visit: `http://localhost:3000`

---

## 📁 Project Structure

```
/pages            → App routes
/components       → Reusable UI components
/lib              → Utilities and API logic
/styles           → Tailwind CSS and global styles
/public           → Static assets
```

---

## 🔐 Authentication

This project uses role-based auth. Admins can manage assignments, while students can submit code for review.

---

## 🧪 AI Integration

Code is submitted to the PlayLab API with assignment context. The AI returns structured feedback without code suggestions.

---

## 🧾 Deployment

Launchpad will handle production deployment. This project is set up for static and server-rendered builds. Be sure to provide:

- Environment variables
- Build instructions (`npm run build`)
- Admin credentials (if any)

---

## 🧑‍💻 Contributing

This project is being developed as a solo build for Launchpad Cohort 3. Internal contributions only.

---

## 📄 License

BSD 3-Clause License
