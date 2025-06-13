# Launchpad-AI-Review-System (AIRS) — Technical Developer Guide

## Overview
Launchpad-AI-Review-System (AIRS) is a Next.js/TypeScript web application for managing coding assignments and providing AI-powered feedback on Python code submissions. It features robust admin management, assignment CRUD, secure authentication, and a student dashboard for code review.

---

## Project Structure

- **app/**: Main Next.js app directory
  - **api/**: API routes (REST endpoints for assignments, admin users, AI feedback, authentication)
  - **components/**: Reusable React components (admin dashboard, forms, etc.)
  - **pages/**: Route-based pages for admin and student dashboards
- **lib/**: Shared libraries (authentication, protection, AI integration)
- **prisma/**: Prisma schema, migrations, and seed scripts
- **public/**: Static assets

---

## Key Features

- **Admin Management**: Create, edit, delete admin users; change passwords; protected routes
- **Assignment CRUD**: Create, edit, delete assignments; all fields validated; filename required
- **Authentication**: NextAuth.js with Prisma and bcrypt; session-based protection for admin routes
- **Student Dashboard**: Assignment selection, Python code upload/paste, AI feedback (Markdown rendered)
- **Validation**: Only `.py` files or Python-like code accepted for review
- **UI/UX**: Modern, accessible, Launchpad-branded design using Radix UI and custom styles

---

## Developer Notes

### 1. Assignment Model
- See `prisma/schema.prisma` for the full model.
- `filename` is required for all assignments (migration required for legacy data).

### 2. API Endpoints
- `/api/assignments` — GET, POST, PUT, DELETE for assignments
- `/api/admin-users` — GET, POST, DELETE for admin users
- `/api/admin-users/password` — POST for password changes (self or by admin)
- `/api/ai` — POST for AI code review (Python only)
- `/api/auth/nextauth` — NextAuth.js authentication

### 3. Authentication & Protection
- All admin pages use `requireAdminSession` for server-side protection.
- NextAuth.js is configured in `lib/auth.ts`.
- Passwords are hashed with bcrypt.

### 4. Python-Only Enforcement
- File uploads: Only `.py` files accepted (client-side and server-side checks)
- Pasted code: Heuristic check for Python syntax before submission
- Error messages shown for invalid input

### 5. Admin User Management
- Admins can create, edit, and delete other admins
- Password changes for any admin (not just self)
- All actions require authentication
- Confirmation modals for destructive actions

### 6. Assignment Editing
- PUT handler in `/api/assignments/route.ts` updates all fields, including `filename`
- After successful edit, user is redirected to the manage page

### 7. Error Handling
- All API endpoints return clear error messages and status codes
- Frontend displays user-friendly errors for all forms

### 8. Database
- PostgreSQL (see `.env` for connection)
- Prisma migrations required for schema changes

---

## Setup & Development

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in values
3. **Run migrations:**
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```
4. **Seed the database:**
   ```sh
   npm run seed
   ```
5. **Start the dev server:**
   ```sh
   npm run dev
   ```

---

## Contribution & Best Practices
- Use direct imports for all components/pages (no dynamic imports for admin)
- Keep UI consistent with Launchpad style guide
- Document all new models, endpoints, and major changes
- Use confirmation modals for destructive actions
- Validate all user input on both client and server

---

## Further Reading
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)

---

For questions or onboarding, see the README or contact the project maintainer.
