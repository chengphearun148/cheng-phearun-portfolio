import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, d as HeadContent, g as createFileRoute, h as lazyRouteComponent, m as Outlet, p as createRouter, u as Scripts, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, O as array, P as object, R as union, j as literal, k as boolean } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-BsSjoFSi.mjs";
import { n as auth } from "./server-DdSIY_GS.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as authMiddleware } from "./utils-Ca4XtJr3.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { A as ArrowLeft, i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BSqPkB9c.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			gradient: "bg-linear-to-r from-accent to-violet text-white shadow-[0_8px_28px_color-mix(in_oklab,var(--color-accent)_35%,transparent)] hover:opacity-95",
			glow: "bg-accent text-accent-fg shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_40%,transparent)] hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-bg-subtle",
			ghost: "text-fg hover:bg-bg-subtle",
			secondary: "bg-bg-subtle text-fg hover:bg-border",
			link: "text-accent underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3.5 text-sm",
			lg: "h-12 px-7 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio.functions-Xa4kQvQk.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getPortfolio = createServerFn({ method: "GET" }).handler(createSsrRpc("9d7478699c5fd9aa8d934c1a2b12da00bed068c0db8905070f40d135b1a6dda9"));
var contactSchema = object({
	name: string().trim().min(2).max(80),
	email: string().trim().min(5).max(120).refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
	message: string().trim().min(10).max(2e3)
});
var submitContact = createServerFn({ method: "POST" }).validator(contactSchema).handler(createSsrRpc("cc327d387c887c674f6d813273545342693266251783233d8ba64e3ece388a89"));
var getAdminAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("203163a0abc625ddc60fb517da6f262861e92c9b5ed82b7edcb3d60dc0508310"));
var profileSchema = object({
	name: string().trim().min(1).max(80),
	role: string().trim().min(1).max(120),
	tagline: string().trim().min(1).max(160),
	intro: string().trim().min(1).max(400),
	bio: string().trim().min(1).max(4e3),
	location: string().trim().min(1).max(120),
	educationSummary: string().trim().min(1).max(240),
	interests: string().trim().min(1).max(240),
	typingPhrases: array(string().trim().min(1).max(80)).min(1).max(12),
	availabilityLabel: string().trim().min(1).max(80),
	availabilityDetail: string().trim().min(1).max(160),
	cvUrl: string().trim().max(400).nullable().optional()
});
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(profileSchema).handler(createSsrRpc("024021f1b1f0cc8f453591fc6ade319362909b447822b34b80da1c2044371bfd"));
var mediaSchema = object({
	mimeType: string(),
	data: string().min(1)
});
var uploadProfileImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(mediaSchema).handler(createSsrRpc("b6c6e43977fdf5d5437a2e243b6f70fc917c1c7219e602c91c4117beb2809ccd"));
var skillUpsertSchema = object({
	id: number().int().optional(),
	name: string().trim().min(1).max(40),
	percentage: number().int().min(0).max(100),
	category: string().trim().min(1).max(40).default("Programming"),
	description: string().trim().max(240).default(""),
	icon: string().trim().max(20).nullable().optional(),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(skillUpsertSchema).handler(createSsrRpc("23f420bed836d0605770ff831b1c93f9340c04744425129a155a612b995dce1f"));
var deleteSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(createSsrRpc("de8dbbf154f447c6aeddb309ddf3661745b670f004a4a3b20e2ab2628b11201b"));
var projectUpsertSchema = object({
	id: number().int().optional(),
	name: string().trim().min(1).max(80),
	description: string().trim().min(1).max(800),
	technologies: array(string().trim().min(1).max(40)).min(1).max(12),
	githubUrl: string().trim().max(400).default(""),
	liveUrl: string().trim().max(400).default(""),
	featured: boolean().default(true),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(projectUpsertSchema).handler(createSsrRpc("422856277aeca81017f543b2e519f0555300b9f1bb3e18506c7df4a91bba51f4"));
var deleteProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(createSsrRpc("baf2018eea8fb8af4e6d7be637c1bdabb595886742dc6700824a28e27fbc2767"));
var uploadProjectImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(mediaSchema.extend({ projectId: number().int() })).handler(createSsrRpc("467bea6184279aff60b5d78dc23d0212b2fcf745d72abed87225a436b5ed683f"));
var educationUpsertSchema = object({
	id: number().int().optional(),
	title: string().trim().min(1).max(120),
	institution: string().trim().min(1).max(120),
	period: string().trim().min(1).max(80),
	description: string().trim().min(1).max(800),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertEducation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(educationUpsertSchema).handler(createSsrRpc("5a6b4fc6baf9a64f2f0b75a73f877adf41f61895bec5aff2a042cfbabb8ad157"));
var deleteEducation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(createSsrRpc("bf74b33bf29f712e8559d7065027128a0ed86e90122ed6f89ce7425970acd2d7"));
var socialSchema = object({
	id: number().int().optional(),
	platform: string().trim().min(1).max(40),
	label: string().trim().min(1).max(40),
	url: string().trim().max(400),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertSocial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(socialSchema).handler(createSsrRpc("90506a425a0dee62deb9075de3dd52593dfb2506e982348b057891405b0adecc"));
var deleteSocial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(createSsrRpc("ee09a9f7f0dc12fca3775be41dbbbdee3942890123bb28e1fdc8326cd1129719"));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("26a661c14ca0097926f82d64e7df8a0042c27370adacce9fcde0841c8b793033"));
var markMessageRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number().int(),
	read: boolean()
})).handler(createSsrRpc("9a8c0d44d25d5248ecf8e199d02233237039b2147bdbbb5c6aea0f6da162a1f3"));
var deleteMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(createSsrRpc("0644d7c6289a38f6fe939d5e08f6da37836804e395f8068b5277b92b72a50d9b"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Co6z-BZ5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 text-sm font-medium text-accent underline-offset-4 hover:underline",
				children: "Return home"
			})
		]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 hero-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-grid opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm tracking-[0.25em] text-accent",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl",
				children: "This path does not compile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-muted",
				children: "The page you are looking for is not in this workspace. Head back to the portfolio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "glow",
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Back home"]
				})
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var ThemeContext = (0, import_react.createContext)(null);
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
	root.classList.toggle("light", theme === "light");
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		try {
			const next = localStorage.getItem("theme") === "light" ? "light" : "dark";
			setThemeState(next);
			applyTheme(next);
		} catch {
			applyTheme("dark");
		}
	}, []);
	const setTheme = (0, import_react.useCallback)((next) => {
		setThemeState(next);
		applyTheme(next);
		try {
			localStorage.setItem("theme", next);
		} catch {}
	}, []);
	const toggleTheme = (0, import_react.useCallback)(() => {
		setTheme(theme === "dark" ? "light" : "dark");
	}, [setTheme, theme]);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		setTheme,
		toggleTheme
	}), [
		theme,
		setTheme,
		toggleTheme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
var styles_default = "/assets/styles-DCJC3My5.css";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$7 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Cheng Phearun — Student Developer" },
			{
				name: "description",
				content: "Portfolio of Cheng Phearun, a student and aspiring software developer in Phnom Penh. C, C++, Java, and a path toward software engineering."
			},
			{
				name: "theme-color",
				content: "#07090f"
			},
			{
				name: "author",
				content: "Cheng Phearun"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
			}
		]
	}),
	component: RootDocument,
	notFoundComponent: NotFoundPage
});
function ToasterBridge() {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		position: "top-center",
		richColors: false
	});
}
function RootDocument() {
	const [queryClient] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e4,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}}catch(e){}})();` } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client: queryClient,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToasterBridge, {})] }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-C2LPVS0l.mjs");
var Route$6 = createFileRoute("/")({
	loader: () => getPortfolio(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	pendingComponent: HomePending
});
function HomePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-[100dvh] bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pt-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-64 animate-pulse rounded-lg bg-bg-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-8 w-96 max-w-full animate-pulse rounded-lg bg-bg-subtle" })]
		})
	});
}
var $$splitComponentImporter$3 = () => import("../_-DgXbWOcz.mjs");
var Route$5 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin-CrQuE6_r.mjs");
var Route$4 = createFileRoute("/admin")({
	loader: () => getPortfolio(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./cv-BFZyXt3b.mjs");
var Route$3 = createFileRoute("/cv")({
	loader: () => getPortfolio(),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./login-D3MokjfQ.mjs");
var Route$2 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var Route = createFileRoute("/api/media/$id")({ server: { handlers: { GET: async ({ params }) => {
	const row = (await (await getSql())`
          select mime_type, data from media where id = ${params.id}
        `)[0];
	if (!row) return new Response("Not found", { status: 404 });
	const bytes = Buffer.from(row.data, "base64");
	return new Response(bytes, { headers: {
		"Content-Type": row.mime_type,
		"Cache-Control": "public, max-age=31536000, immutable"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	SplatRoute: Route$5.update({
		id: "/$",
		path: "/$",
		getParentRoute: () => Route$7
	}),
	AdminRoute: Route$4.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$7
	}),
	CvRoute: Route$3.update({
		id: "/cv",
		path: "/cv",
		getParentRoute: () => Route$7
	}),
	LoginRoute: Route$2.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$7
	}),
	ApiAuthSplatRoute: Route$1.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$7
	}),
	ApiMediaIdRoute: Route.update({
		id: "/api/media/$id",
		path: "/api/media/$id",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage
	});
}
//#endregion
export { Button as C, upsertSocial as S, uploadProfileImage as _, useTheme as a, upsertProject as b, deleteMessage as c, deleteSocial as d, getAdminAccess as f, updateProfile as g, submitContact as h, Route$6 as i, deleteProject as l, markMessageRead as m, Route$3 as n, NotFoundPage as o, listMessages as p, Route$4 as r, deleteEducation as s, router_exports as t, deleteSkill as u, uploadProjectImage as v, upsertSkill as x, upsertEducation as y };
