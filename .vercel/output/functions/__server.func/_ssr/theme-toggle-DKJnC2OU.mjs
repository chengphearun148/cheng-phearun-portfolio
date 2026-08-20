import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as cn } from "./utils-Ca4XtJr3.mjs";
import { d as Moon, o as Sun } from "../_libs/lucide-react.mjs";
import { a as useTheme } from "./router-Co6z-BZ5.mjs";
import { t as authClient } from "./client-sGid3STf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-DKJnC2OU.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-bg-subtle px-3 text-sm text-fg placeholder:text-subtle outline-none transition-[box-shadow,border-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-fg", className),
		...props
	});
}
function ThemeToggle({ className }) {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggleTheme,
		"aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
		className: cn("relative inline-flex h-10 w-[4.5rem] items-center rounded-full border border-border bg-bg-subtle px-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute size-8 rounded-full bg-bg-elevated shadow-sm transition-transform duration-200 ease-out", theme === "light" ? "translate-x-0" : "translate-x-[2.35rem]") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative z-10 grid size-8 place-items-center text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative z-10 grid size-8 place-items-center text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" })
			})
		]
	});
}
//#endregion
export { useCurrentUserState as i, Label as n, ThemeToggle as r, Input as t };
