# Cheng Phearun — Portfolio

Personal portfolio: hero, about, skills, projects, education, contact, and an admin dashboard.

**Code:** https://github.com/chengphearun148/cheng-phearun-portfolio

---

## 1. What you need on your computer

Install these first (free):

1. [Node.js LTS](https://nodejs.org/) (version 20 or 22)
2. [Git](https://git-scm.com/downloads)
3. [VS Code](https://code.visualstudio.com/)

Restart VS Code after installing Node.js.

---

## 2. Open the project in VS Code

1. Open **VS Code**
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type **Git: Clone** and choose it
4. Paste:

```
https://github.com/chengphearun148/cheng-phearun-portfolio.git
```

5. Pick a folder on your computer
6. When VS Code asks **Open the repository?** click **Open**

Or in the VS Code terminal:

```bash
git clone https://github.com/chengphearun148/cheng-phearun-portfolio.git
cd cheng-phearun-portfolio
code .
```

You can also unzip `cheng-phearun-portfolio.zip` and use **File → Open Folder**.

---

## 3. Run it on your computer

In the VS Code terminal (`Ctrl+`` ` or **Terminal → New Terminal**):

```bash
npm install
npm run dev
```

Then open:

**http://localhost:8080**

Stop the server with `Ctrl+C`.

---

## 4. Publish it (so friends can open the link)

Use **Vercel** (free).

### A. Create a free database (Neon)

The live site needs Postgres. Locally it can run without this.

1. Go to https://neon.tech and sign up
2. Create a project
3. Copy the **connection string** (`postgresql://...`)

### B. Deploy on Vercel

1. Go to https://vercel.com and sign in with **GitHub**
2. **Add New → Project**
3. Import `chengphearun148/cheng-phearun-portfolio`
4. Framework: leave default (Vite)
5. **Environment Variables** — add:

| Name | Value |
|---|---|
| `DATABASE_URL` | your Neon connection string |
| `BETTER_AUTH_SECRET` | a long random string (any 32+ characters) |

6. Click **Deploy**

When it finishes, Vercel gives you a URL like:

`https://cheng-phearun-portfolio.vercel.app`

**That** is the link you send to friends.

### C. After the first deploy

1. Open your Vercel URL
2. Click **Admin Login** and create your account
3. You become the site owner
4. Edit photo, skills, projects, and social links from the dashboard

---

## Useful commands

```bash
npm run dev          # local preview
npm run build        # production build
npm run typecheck    # TypeScript check
```

Edit your content later in the **Admin** page, or in `migrations/0003_seed.sql` before first deploy.
