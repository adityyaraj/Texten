# Texten

Texten is a modern social platform built with Next.js, Prisma, and Tailwind CSS, allowing users to sign up, log in, upload image posts, and manage their profiles. It supports both Google OAuth and email/password authentication, and features a responsive, visually appealing UI.

## Features

- **User Authentication**: Sign up and log in with Google or email/password.
- **Profile Management**: Edit your profile, upload a profile picture, and view your posts.
- **Image Posting**: Upload image posts with optional captions.
- **Feed**: Browse a feed of recent posts from all users.
- **User Suggestions**: Discover new people to follow.
- **Responsive Design**: Works great on desktop and mobile.
- **Modern UI**: Built with Tailwind CSS and Radix UI components.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js (Google OAuth + credentials)
- **File Uploads**: UploadThing
- **UI Components**: Radix UI, Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd vs
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root with the following (see `.env.example` if available):

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/texten
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-random-secret
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

6. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- **Sign Up / Log In:**  
  Visit `/front` to create an account or log in. You can use Google or email/password.
- **Feed:**  
  After logging in, you’ll see the main feed with recent image posts.
- **Create a Post:**  
  Use the post upload modal to share an image and optional caption.
- **Profile:**  
  Click your avatar or go to `/profile` to view and manage your posts and profile.
- **Settings:**  
  Visit `/settings` to update your profile info and upload a new profile picture.
- **User Suggestions:**  
  See recommended users in the sidebar.

## Project Structure

- `src/app/` – Next.js app directory (pages, API routes)
- `src/components/` – Reusable React components
- `src/lib/` – Auth and database utilities
- `prisma/` – Prisma schema and migrations
- `public/` – Static assets

## Scripts

- `pnpm dev` – Start development server
- `pnpm build` – Build for production
- `pnpm start` – Start production server
- `pnpm lint` – Lint code

## Database Schema

- **User**: id, name, username, email, password, profileImage, etc.
- **Post**: id, content, imageUrl, authorId, timestamps

See `prisma/schema.prisma` for full details.

## Environment Variables

- `DATABASE_URL` – PostgreSQL connection string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – Google OAuth credentials
- `NEXTAUTH_SECRET` – Secret for NextAuth.js

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.  
See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License

MIT