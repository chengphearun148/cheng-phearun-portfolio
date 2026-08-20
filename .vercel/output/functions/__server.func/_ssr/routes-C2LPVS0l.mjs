import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as cn, r as initials } from "./utils-Ca4XtJr3.mjs";
import { C as ExternalLink, E as Braces, O as ArrowUp, S as Facebook, T as CodeXml, b as Github, f as Menu, g as Linkedin, k as ArrowRight, l as Send, m as Mail, n as User, p as MapPin, s as Sparkles, t as X, w as Download, y as Globe } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Button, h as submitContact, i as Route$6 } from "./router-Co6z-BZ5.mjs";
import { i as useCurrentUserState, n as Label, r as ThemeToggle, t as Input } from "./theme-toggle-DKJnC2OU.mjs";
import { i as Textarea, n as SignedIn, r as SignedOut } from "./textarea-22DBOXNR.mjs";
import { n as projectImageSrc, t as profileImageSrc } from "./portfolio-types-BvpfSg7i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C2LPVS0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		href: "/#home",
		label: "Home"
	},
	{
		href: "/#about",
		label: "About"
	},
	{
		href: "/#skills",
		label: "Skills"
	},
	{
		href: "/#projects",
		label: "Projects"
	},
	{
		href: "/#education",
		label: "Education"
	},
	{
		href: "/#contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-200", scrolled || open ? "glass" : "bg-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					hash: "home",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-violet font-display text-sm font-bold text-white",
						children: "CP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden font-display text-sm font-semibold tracking-tight text-fg sm:inline",
						children: "Cheng Phearun"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Primary",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "rounded-full px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { className: "hidden sm:inline-flex" }),
						isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-24 animate-pulse rounded-full bg-bg-subtle" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Admin Login"
							})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "gradient",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								children: user?.displayName ? "Dashboard" : "Admin"
							})
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full border border-border lg:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-bg-elevated px-4 py-4 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				"aria-label": "Mobile",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					onClick: () => setOpen(false),
					className: "rounded-lg px-3 py-3 text-sm text-fg hover:bg-bg-subtle",
					children: item.label
				}, item.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-3 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Theme"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
				})]
			})
		}) : null]
	});
}
function SocialIcon({ platform, className }) {
	const p = platform.toLowerCase();
	if (p.includes("git")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className });
	if (p.includes("face")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className });
	if (p.includes("tele")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className });
	if (p.includes("linked")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className });
}
var LINKS = [
	{
		href: "/#home",
		label: "Home"
	},
	{
		href: "/#about",
		label: "About"
	},
	{
		href: "/#skills",
		label: "Skills"
	},
	{
		href: "/#projects",
		label: "Projects"
	},
	{
		href: "/#education",
		label: "Education"
	},
	{
		href: "/#contact",
		label: "Contact"
	}
];
function SiteFooter({ name, role, social }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-violet font-display text-sm font-bold text-white",
						children: "CP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-semibold tracking-tight",
						children: name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-muted",
					children: role
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-sm text-muted hover:text-fg",
						children: l.label
					}) }, l.href))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: "Connect With Me"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: social.filter((s) => s.url).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.url,
						target: "_blank",
						rel: "noreferrer",
						"aria-label": s.label,
						className: "grid size-11 place-items-center rounded-full border border-border text-muted hover:text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
							platform: s.platform,
							className: "size-4"
						})
					}, s.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-4 lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							name,
							". All rights reserved."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => window.scrollTo({
							top: 0,
							behavior: "smooth"
						}),
						className: "grid size-11 place-items-center rounded-full bg-linear-to-br from-accent to-violet text-white",
						"aria-label": "Back to top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})]
				})
			]
		})
	});
}
function TypingText({ phrases, className }) {
	const list = phrases.length ? phrases : ["Developer"];
	const [index, setIndex] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)("");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setText(list[0] ?? "");
			return;
		}
		const current = list[index % list.length] ?? "";
		const pause = deleting && text === "" ? 400 : !deleting && text === current ? 1400 : 0;
		const speed = deleting ? 36 : 64;
		const t = window.setTimeout(() => {
			if (pause) {
				if (!deleting && text === current) setDeleting(true);
				else if (deleting && text === "") {
					setDeleting(false);
					setIndex((i) => (i + 1) % list.length);
				}
				return;
			}
			setText((prev) => deleting ? current.slice(0, Math.max(0, prev.length - 1)) : current.slice(0, prev.length + 1));
		}, pause || speed);
		return () => window.clearTimeout(t);
	}, [
		deleting,
		index,
		list,
		text
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("font-medium text-accent", className),
		children: [text, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent align-baseline",
			style: { animation: "caret 1s steps(1) infinite" },
			"aria-hidden": true
		})]
	});
}
function Hero({ data }) {
	const { profile, social, projects, skills } = data;
	const photo = profileImageSrc(profile);
	const [first, ...rest] = profile.name.split(" ");
	const last = rest.join(" ") || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		className: "relative overflow-hidden px-4 pt-24 pb-16 sm:pt-32 sm:pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 hero-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-grid opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 lg:order-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "inline-flex items-center rounded-full border border-border bg-bg-elevated/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur-md",
							children: "Hello, I'm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-fg",
								children: first
							}), last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-glow",
								children: last
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted",
							children: profile.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingText, { phrases: profile.typingPhrases })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg text-muted",
							children: profile.intro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "gradient",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/#projects",
									children: ["View My Work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/#contact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), "Contact Me"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-7 flex flex-wrap gap-2",
							children: social.filter((s) => s.url).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.url,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": s.label,
								className: "grid size-11 place-items-center rounded-full border border-border text-muted hover:text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									platform: s.platform,
									className: "size-4"
								})
							}, s.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative order-1 mx-auto w-full max-w-[15rem] sm:max-w-sm lg:order-2 lg:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-6 left-2 hidden rounded-2xl border border-border bg-bg-elevated/80 p-3 text-accent shadow-sm backdrop-blur-md lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-24 right-0 hidden rounded-2xl border border-border bg-bg-elevated/80 p-3 text-violet shadow-sm backdrop-blur-md lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto aspect-square w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[-6%] rounded-full border border-accent/30 motion-reduce:animate-none animate-spin [animation-duration:28s] lg:inset-[-8%]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[-12%] hidden rounded-full border border-violet/20 motion-reduce:animate-none animate-spin [animation-duration:40s] [animation-direction:reverse] sm:block lg:inset-[-16%]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 overflow-hidden rounded-full bg-bg-subtle shadow-[0_0_60px_color-mix(in_oklab,var(--color-accent)_28%,transparent)] outline outline-1 -outline-offset-1 outline-white/10",
									children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: photo,
										alt: profile.name,
										className: "size-full object-cover object-[center_12%]"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-full place-items-center font-display text-5xl font-bold text-accent",
										children: initials(profile.name)
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 mx-auto mt-5 max-w-xs rounded-2xl border border-border bg-bg-elevated/90 px-4 py-3 backdrop-blur-md lg:absolute lg:right-2 lg:bottom-4 lg:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-sm font-medium text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-success" }), profile.availabilityLabel]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: profile.availabilityDetail
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 rounded-2xl border border-border bg-bg-elevated/60 p-4 backdrop-blur-md sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${Math.max(projects.length, 1)}+`,
						label: "Projects Completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(skills.length),
						label: "Technologies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: "Always",
						label: "Learning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: "100%",
						label: "Dedication"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sr-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cv",
					children: "CV"
				})
			})
		]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl px-3 py-3 text-center sm:text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold tracking-tight text-fg",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: label
		})]
	});
}
function Section({ id, eyebrow, title, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("scroll-mt-24 px-4 py-16 sm:py-20", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-accent uppercase",
					children: eyebrow
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
					children: title
				})] }), action]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children
			})]
		})
	});
}
function Reveal({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) setShown(true);
		}, { threshold: .14 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: { transitionDelay: `${delay}ms` },
		className: cn("transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[2px]", className),
		children
	});
}
function About({ profile }) {
	const photo = profileImageSrc(profile);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "about",
		eyebrow: "About Me",
		title: "A little more context",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.15fr_0.85fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-base leading-relaxed text-muted",
					children: profile.bio
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Location",
							value: profile.location
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Focus",
							value: profile.interests
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Education",
							value: profile.educationSummary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Role",
							value: profile.role
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 80,
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass glow-card rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-16 overflow-hidden rounded-2xl bg-bg-subtle outline outline-1 -outline-offset-1 outline-white/10",
							children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "",
								className: "size-full object-cover object-[center_12%]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-full place-items-center font-display font-bold text-accent",
								children: initials(profile.name)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold tracking-tight",
							children: profile.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: profile.role
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mt-0.5 size-4 text-accent" }), profile.tagline]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 size-4 text-violet" }), profile.interests]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 text-accent" }), profile.location]
							})
						]
					})]
				})
			})]
		})
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-bg-elevated/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm text-fg",
			children: value
		})]
	});
}
function SkillIcon({ name, icon, className }) {
	const key = (icon || name).toLowerCase();
	if (key === "c" || key === "c-lang") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-11 place-items-center rounded-xl bg-accent/15 font-display text-lg font-bold text-accent", className),
		children: "C"
	});
	if (key === "cpp" || key === "c++") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-11 place-items-center rounded-xl bg-violet/15 font-display text-sm font-bold text-violet", className),
		children: "C++"
	});
	if (key === "java") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-11 place-items-center rounded-xl bg-accent/10 font-display text-xs font-bold tracking-wide text-accent", className),
		children: "Java"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-11 place-items-center rounded-xl bg-bg-subtle font-display text-sm font-semibold text-fg", className),
		children: name.slice(0, 2).toUpperCase()
	});
}
function Skills({ skills }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "skills",
		eyebrow: "My Skills",
		title: "Programming Skills",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/#skills",
			className: "text-sm text-muted hover:text-fg",
			children: "View All Skills"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: skills.map((skill, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 70,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCard, { skill })
			}, skill.id))
		})
	});
}
function SkillCard({ skill }) {
	const ref = (0, import_react.useRef)(null);
	const [value, setValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setValue(skill.percentage);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) setValue(skill.percentage);
		}, { threshold: .4 });
		io.observe(el);
		return () => io.disconnect();
	}, [skill.percentage]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "glass glow-card rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillIcon, {
						name: skill.name,
						icon: skill.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: skill.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [skill.category, " Language"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg font-semibold tabular-nums text-fg",
					children: [skill.percentage, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-2 overflow-hidden rounded-full bg-bg-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-linear-to-r from-accent to-violet transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
					style: { width: `${value}%` }
				})
			}),
			skill.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: skill.description
			}) : null
		]
	});
}
function Badge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-xs font-medium text-muted", className),
		...props
	});
}
function Projects({ projects }) {
	const techs = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const p of projects) for (const t of p.technologies) set.add(t);
		return ["All", ...Array.from(set)];
	}, [projects]);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const visible = filter === "All" ? projects : projects.filter((p) => p.technologies.includes(filter));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "projects",
		eyebrow: "Featured Projects",
		title: "Things I've Built",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/#projects",
			className: "text-sm text-muted hover:text-fg",
			children: "View All Projects"
		}),
		children: [techs.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: techs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(t),
				className: t === filter ? "rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg" : "rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:text-fg",
				children: t
			}, t))
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
			children: visible.map((project, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 70,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project })
			}, project.id))
		})]
	});
}
function ProjectCard({ project }) {
	const src = projectImageSrc(project);
	const github = project.githubUrl.trim();
	const live = project.liveUrl.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass glow-card flex h-full flex-col overflow-hidden rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-16/10 overflow-hidden bg-bg-subtle",
			children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-full place-items-center text-subtle",
				children: "No image"
			}), project.technologies[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-3 right-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-medium text-fg backdrop-blur-md",
				children: project.technologies[0]
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold tracking-tight",
					children: project.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 flex-1 text-sm text-muted",
					children: project.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: project.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t }, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [github ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: github,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {}), " GitHub"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {}), " GitHub"]
					}), live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: live,
							target: "_blank",
							rel: "noreferrer",
							children: ["Live Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: true,
						children: ["Live Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
					})]
				})
			]
		})]
	});
}
function Education({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "education",
		eyebrow: "Education",
		title: "Learning journey",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative space-y-6 border-l border-border pl-6",
			children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 70,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 -left-[1.91rem] size-3.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_12px_var(--color-accent)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-accent uppercase",
							children: item.period
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl font-semibold tracking-tight",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: item.institution
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm text-muted",
							children: item.description
						})
					]
				})
			}, item.id))
		})
	});
}
function ContactForm({ profile, social }) {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setPending(true);
		try {
			await submitContact({ data: {
				name,
				email,
				message
			} });
			setName("");
			setEmail("");
			setMessage("");
			toast.success("Message sent. I will get back to you.");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Could not send message";
			toast.error(msg);
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "contact",
		eyebrow: "Contact",
		title: "Let's talk",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-muted",
					children: "Have a question, a project idea, or just want to say hello? Send a message — it is stored on this site and I read every one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: profile.location
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: social.filter((s) => s.url).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: s.url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
							platform: s.platform,
							className: "size-4"
						}), s.label]
					}, s.id))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit,
				className: "glass rounded-2xl p-5 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "contact-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contact-name",
								name: "name",
								autoComplete: "name",
								required: true,
								minLength: 2,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Your name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "contact-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contact-email",
								name: "email",
								type: "email",
								autoComplete: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@example.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "contact-message",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "contact-message",
								name: "message",
								required: true,
								minLength: 10,
								value: message,
								onChange: (e) => setMessage(e.target.value),
								placeholder: "What would you like to talk about?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "gradient",
							disabled: pending,
							children: pending ? "Sending…" : "Send Message"
						})
					]
				})
			})]
		})
	});
}
function CvBanner({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-bg-elevated/70 px-6 py-6 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold tracking-tight",
					children: "Download My CV"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Get ",
						name,
						"'s resume and learn more about the path so far."
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "gradient",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cv",
					children: ["Download CV", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})]
				})
			})]
		})
	});
}
function FloatingSocials({ social }) {
	const items = social.filter((s) => s.url);
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex",
		children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: s.url,
			target: "_blank",
			rel: "noreferrer",
			"aria-label": s.label,
			className: "pointer-events-auto grid size-11 place-items-center rounded-full border border-border bg-bg-elevated/80 text-muted backdrop-blur-md hover:text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
				platform: s.platform,
				className: "size-4"
			})
		}, s.id))
	});
}
function Particles() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const dots = Array.from({ length: 42 }, () => ({
			x: Math.random(),
			y: Math.random(),
			r: Math.random() * 1.3 + .4,
			vx: (Math.random() - .5) * 22e-5,
			vy: (Math.random() - .5) * 22e-5
		}));
		let raf = 0;
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
		};
		resize();
		window.addEventListener("resize", resize);
		const tick = () => {
			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect(0, 0, w, h);
			const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#5b8cff";
			ctx.fillStyle = accent;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			for (const d of dots) {
				d.x += d.vx;
				d.y += d.vy;
				if (d.x < 0 || d.x > 1) d.vx *= -1;
				if (d.y < 0 || d.y > 1) d.vy *= -1;
				ctx.globalAlpha = .28;
				ctx.beginPath();
				ctx.arc(d.x * w, d.y * h, d.r * dpr, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none fixed inset-0 -z-10 h-full w-full",
		"aria-hidden": true
	});
}
function HomePage() {
	const data = Route$6.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-in min-h-[100dvh] bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingSocials, { social: data.social }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { data }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { profile: data.profile }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, { skills: data.skills }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { projects: data.projects }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Education, { items: data.education }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvBanner, { name: data.profile.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
					profile: data.profile,
					social: data.social
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {
				name: data.profile.name,
				role: data.profile.tagline,
				social: data.social
			})
		]
	});
}
//#endregion
export { HomePage as component };
