import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE", m.text()); });

async function shot(path, file) {
  const res = await page.goto("http://127.0.0.1:8080" + path, { waitUntil: "networkidle", timeout: 30000 });
  console.log(path, res?.status(), await page.title());
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, fullPage: false });
}

await shot("/", "/workspace/screenshots/home.png");
await page.evaluate(() => document.getElementById("skills")?.scrollIntoView());
await page.waitForTimeout(500);
await page.screenshot({ path: "/workspace/screenshots/skills.png" });
await page.evaluate(() => document.getElementById("projects")?.scrollIntoView());
await page.waitForTimeout(500);
await page.screenshot({ path: "/workspace/screenshots/projects.png" });
await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/about.png" });
await page.evaluate(() => document.getElementById("education")?.scrollIntoView());
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/education.png" });
await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/contact.png" });

await page.fill("#contact-name", "Sokchea Lim");
await page.fill("#contact-email", "sokchea@example.com");
await page.fill("#contact-message", "Hello! I really like your portfolio.");
await page.click("form button[type=submit]");
await page.waitForTimeout(1800);
const toast = await page.locator("[data-sonner-toast]").first().textContent().catch(() => "");
console.log("TOAST", toast);

await shot("/login", "/workspace/screenshots/login.png");
await shot("/cv", "/workspace/screenshots/cv.png");
await shot("/not-a-real-page", "/workspace/screenshots/404.png");
await shot("/admin", "/workspace/screenshots/admin-redirect.png");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: "/workspace/screenshots/home-mobile2.png" });
await mobile.click("button[aria-label='Open menu']");
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: "/workspace/screenshots/mobile-nav.png" });

await browser.close();
console.log("done");
