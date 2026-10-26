# Pursuit

**Your next opportunity, tracked.**

Pursuit is a web app that helps students keep every application, bursary and deadline in one place, from school to first job. Built by **Thato Makhusha** (team **Mai Solutions**) for the **FNB App of the Year Hackathon 2026**, in response to the *access to higher education* challenge.

**Live app:** https://pursuit-brown-ten.vercel.app/

## The problem

University applications, bursaries, learnerships and jobs live in different portals, emails and notes. Every opportunity has a deadline, and one missed closing date can shut a door that was hard to find. Students need to organise the path, not only find it.

## What Pursuit does

- **Save any opportunity**: jobs, graduate programmes, bursaries, university applications and more, with organisation, deadline, application link and notes.
- **Track every status**: a six-stage pipeline (Saved, Preparing, Applied, Assessment, Interview, Offer), plus Rejected. Use the list view or the drag-and-drop board.
- **See deadlines early**: the dashboard ranks upcoming deadlines, flags overdue ones and shows days left with a risk level.
- **Keep a history**: every status change is recorded in a status history.
- **Student profile**: choose your current stage (Grade 11 to PhD) and add optional LinkedIn, GitHub and portfolio links.
- **Own your data**: change your password, download all your data as JSON, or permanently delete your account.

## Planned (not yet built)

- Pathway guide
- CV gap analysis
- 2027 university openings calendar

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth and database | Supabase (Auth, Postgres, Row Level Security) |
| Hosting | Vercel |

## Architecture

```
Student (browser)  --HTTPS-->  Next.js app on Vercel  --queries-->  Supabase (Auth + Postgres with RLS)
```

### Data model

| Table | Purpose | Key columns |
| --- | --- | --- |
| `profiles` | One row per student | `user_id`, `display_name`, `stage`, `profile_completed`, `linkedin_url`, `github_url`, `portfolio_url` |
| `applications` | Tracked opportunities | `id`, `user_id`, `type`, `status`, `title`, `organisation`, `deadline`, `source_url`, `notes` |
| `status_history` | Log of status changes | `application_id`, `user_id`, `from_status`, `to_status`, `changed_at` |
| `status_options` | Reference data for statuses per type | `type`, `status`, `sort_order` |

### Security

- Row Level Security is enabled on all four tables.
- Policies on `applications` and `profiles` only allow users to read, update and delete rows where `user_id = auth.uid()`.
- `status_history` is readable only by its owner.
- `status_options` is read-only reference data.

## Project structure

```
src/
  app/
    (app)/          Protected pages with a shared sidebar layout
      applications/ List/board, new application, detail
      dashboard/
      profile/
      settings/
    (auth)/         Login and signup
    page.tsx        Landing page
  components/
    landing/        Navbar, Hero, HowItWorks, Footer
    applications/   Application forms and board
    dashboard/
    layout/         Sidebar and shell
    profile/
    settings/       Account settings
    ui/             ApplicationCard, ApplicationJourney, ApplicationTimeline
```

## Try it

Sign in at https://pursuit-brown-ten.vercel.app/ with one of these demo accounts. Each has sample applications.

| Stage | Email | Password |
| --- | --- | --- |
| Grade 12 | demo.grade12@example.com | Gr12-Tq8Lm4Vw2x |
| Second year | demo.year2@example.com | Yr2-Hn6Zc9Bp3k |
| Final year | demo.final@example.com | Fin-Wd5Jx7Rs2m |

Demo video: https://drive.google.com/file/d/123aeW8ogGjf9AdUdJGsFcQ6HoO3MQJ9K/view?usp=sharing

## Run locally

Requirements: Node.js 20+ and a Supabase project.

```bash
git clone https://github.com/thatomakhusha/pursuit.git
cd pursuit
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase project values (see `.env.example` for the exact variable names), then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## Team

**Mai Solutions** ("solutions that are yours"): Thato Makhusha (solo team).
