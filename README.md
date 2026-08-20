# Cheng Phearun — Portfolio

Personal portfolio website: Home, About, Skills, Projects, Education, Contact, CV, and an Admin dashboard.

**Code (GitHub):** [https://github.com/chengphearun148/cheng-phearun-portfolio](https://github.com/chengphearun148/cheng-phearun-portfolio)

---

## 1. Install these on your computer (free)

1. [Node.js LTS](https://nodejs.org/) — version 20 or 22
2. [Git](https://git-scm.com/downloads)
3. [VS Code](https://code.visualstudio.com/)

Restart VS Code after installing Node.js.

---

## 2. Open the code in VS Code

1. Open **VS Code**
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type **Git: Clone** and choose it
4. Paste this URL:

```
https://github.com/chengphearun148/cheng-phearun-portfolio.git
```

5. Choose a folder, then click **Open** when VS Code asks

Or use the VS Code terminal:

```bash
git clone https://github.com/chengphearun148/cheng-phearun-portfolio.git
cd cheng-phearun-portfolio
code .
```

---

## 3. Run it on your computer

In VS Code, open a terminal (`Ctrl+`` ` or **Terminal → New Terminal**) and run:

```bash
npm install
npm run dev
```

Then open **http://localhost:8080** in your browser.

Stop the server with `Ctrl+C`.

---

## 4. Publish it (share with friends)

The Grok preview is only for you. To get a public link, deploy on **Vercel** (free).

### A. Create a free database (Neon)

1. Go to [https://neon.tech](https://neon.tech) and sign up
2. Create a project
3. Copy the connection string (`postgresql://...`)

### B. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with **GitHub**
2. Click **Add New → Project**
3. Import **chengphearun148/cheng-phearun-portfolio**
4. Add these **Environment Variables**:

| Name | Value |
|---|---|
| `DATABASE_URL` | your Neon connection string |
| `BETTER_AUTH_SECRET` | a long random password (32+ characters) |

5. Click **Deploy**

When it finishes, Vercel gives you a URL like:

`https://cheng-phearun-portfolio.vercel.app`

**That** is the link you send to friends.

### C. After it is live

1. Open the Vercel URL
2. Click **Admin Login** and create an account
3. You become the owner
4. Edit your photo, skills, projects, and social links from the dashboard

---

## Useful commands

```bash
npm run dev          # run locally
npm run build        # production build
npm run typecheck    # check TypeScript
```
