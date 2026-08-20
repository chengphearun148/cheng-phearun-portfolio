import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as cn } from "./utils-Ca4XtJr3.mjs";
import { D as Bell, T as CodeXml, _ as LayoutDashboard, a as Trash2, c as Share2, h as LogOut, m as Mail, r as UserRound, u as Plus, v as GraduationCap, x as FolderKanban } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Button, S as upsertSocial, _ as uploadProfileImage, b as upsertProject, c as deleteMessage, d as deleteSocial, f as getAdminAccess, g as updateProfile, l as deleteProject, m as markMessageRead, p as listMessages, r as Route$4, s as deleteEducation, u as deleteSkill, v as uploadProjectImage, x as upsertSkill, y as upsertEducation } from "./router-Co6z-BZ5.mjs";
import { i as signOut } from "./client-sGid3STf.mjs";
import { i as useCurrentUserState, n as Label, r as ThemeToggle, t as Input } from "./theme-toggle-DKJnC2OU.mjs";
import { i as Textarea, t as RedirectToSignIn } from "./textarea-22DBOXNR.mjs";
import { n as projectImageSrc, t as profileImageSrc } from "./portfolio-types-BvpfSg7i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CrQuE6_r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALLOWED = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif"
]);
var MAX_BYTES = 2097152;
async function fileToBase64(file) {
	if (!ALLOWED.has(file.type)) throw new Error("Use a JPG, PNG, or WebP image");
	if (file.size > MAX_BYTES) throw new Error("Max file size is 2MB");
	const data = (await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the file"));
		reader.readAsDataURL(file);
	})).split(",")[1] ?? "";
	if (!data) throw new Error("Could not read the file");
	return {
		mimeType: file.type,
		data
	};
}
var NAV = [
	{
		id: "overview",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		id: "profile",
		label: "Profile",
		icon: UserRound
	},
	{
		id: "skills",
		label: "Skills",
		icon: CodeXml
	},
	{
		id: "projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		id: "education",
		label: "Education",
		icon: GraduationCap
	},
	{
		id: "messages",
		label: "Messages",
		icon: Mail
	},
	{
		id: "social",
		label: "Social Links",
		icon: Share2
	}
];
function AdminDashboard({ data, user }) {
	const router = useRouter();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [allowed, setAllowed] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	async function refresh() {
		await router.invalidate();
		try {
			setMessages(await listMessages());
		} catch {}
	}
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getAdminAccess().then((access) => {
			if (!cancelled) setAllowed(access.isOwner);
		}).catch(() => {
			if (!cancelled) setAllowed(false);
		});
		listMessages().then((rows) => {
			if (!cancelled) setMessages(rows);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, []);
	if (allowed === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[100dvh] place-items-center bg-bg text-muted",
		children: "Checking access…"
	});
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[100dvh] place-items-center bg-bg px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Access reserved"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted",
				children: "This dashboard belongs to the site owner. Sign in with the owner account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Back to site"
				})
			})
		] })
	});
	const unread = messages.filter((m) => !m.read).length;
	const photo = profileImageSrc(data.profile);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[100dvh] bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-60 shrink-0 flex-col border-r border-border bg-bg-elevated lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-violet font-display text-sm font-bold text-white",
						children: "CP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Portfolio CMS"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 px-3",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(item.id),
						className: cn("flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm", tab === item.id ? "bg-linear-to-r from-accent to-violet text-white" : "text-muted hover:bg-bg-subtle hover:text-fg"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: item.label
							}),
							item.id === "messages" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid min-w-5 place-items-center rounded-full bg-white/20 px-1.5 text-[10px]",
								children: unread
							}) : null
						]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void signOut("/"),
					className: "m-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-bg-subtle hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Logout"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-subtle uppercase",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: NAV.find((n) => n.id === tab)?.label
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { className: "hidden sm:inline-flex" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hidden rounded-full border border-border px-3 py-2 text-sm text-muted hover:text-fg sm:inline",
								children: "View site"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-full border border-border px-2 py-1",
								children: [user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: user.profileImageUrl,
									alt: "",
									className: "size-7 rounded-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-7 place-items-center rounded-full bg-bg-subtle text-xs",
									children: (user.displayName ?? "A")[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden pr-1 text-xs sm:inline",
									children: user.displayName ?? "Admin"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto border-b border-border px-3 py-2 lg:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(item.id),
						className: cn("shrink-0 rounded-full px-3 py-2 text-xs", tab === item.id ? "bg-accent text-accent-fg" : "border border-border text-muted"),
						children: [item.label, item.id === "messages" && unread > 0 ? ` (${unread})` : ""]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 sm:p-6",
					children: [
						tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
							data,
							messages,
							photo,
							onJump: setTab
						}) : null,
						tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
							data,
							onSaved: refresh
						}) : null,
						tab === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsEditor, {
							skills: data.skills,
							onSaved: refresh
						}) : null,
						tab === "projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsEditor, {
							projects: data.projects,
							onSaved: refresh
						}) : null,
						tab === "education" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationEditor, {
							items: data.education,
							onSaved: refresh
						}) : null,
						tab === "messages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesPanel, {
							messages,
							onSaved: refresh
						}) : null,
						tab === "social" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialEditor, {
							links: data.social,
							onSaved: refresh
						}) : null
					]
				})
			]
		})]
	});
}
function Overview({ data, messages, photo, onJump }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Projects",
					value: String(data.projects.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Skills",
					value: String(data.skills.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Messages",
					value: String(messages.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Education",
					value: String(data.education.length)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-5 lg:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Recent Messages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-muted" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3",
							children: [messages.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-muted",
									children: m.message
								})]
							}, m.id)), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No messages yet."
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "mt-4 w-full",
							onClick: () => onJump("messages"),
							children: "View All Messages"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Profile Preview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-14 overflow-hidden rounded-full bg-bg-subtle",
								children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "",
									className: "size-full object-cover object-[center_12%]"
								}) : null
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display font-semibold",
								children: data.profile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: data.profile.tagline
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 line-clamp-3 text-sm text-muted",
							children: data.profile.intro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "mt-4",
							onClick: () => onJump("profile"),
							children: "Edit Profile"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Quick Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => onJump("profile"),
								children: "Edit Profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => onJump("skills"),
								children: "Add Skill"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => onJump("projects"),
								children: "Add Project"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => onJump("education"),
								children: "Add Education"
							})
						]
					})]
				})
			]
		})]
	});
}
function StatCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function ProfileEditor({ data, onSaved }) {
	const p = data.profile;
	const [form, setForm] = (0, import_react.useState)({
		name: p.name,
		role: p.role,
		tagline: p.tagline,
		intro: p.intro,
		bio: p.bio,
		location: p.location,
		educationSummary: p.educationSummary,
		interests: p.interests,
		typingPhrases: p.typingPhrases.join("\n"),
		availabilityLabel: p.availabilityLabel,
		availabilityDetail: p.availabilityDetail,
		cvUrl: p.cvUrl ?? ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const photo = profileImageSrc(p);
	async function save() {
		setBusy(true);
		try {
			await updateProfile({ data: {
				...form,
				typingPhrases: form.typingPhrases.split("\n").map((s) => s.trim()).filter(Boolean),
				cvUrl: form.cvUrl || null
			} });
			toast.success("Profile saved");
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Save failed");
		} finally {
			setBusy(false);
		}
	}
	async function onPhoto(file) {
		if (!file) return;
		try {
			const payload = await fileToBase64(file);
			await uploadProfileImage({ data: payload });
			toast.success("Photo updated");
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Profile photo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "JPG, PNG, or WebP. Max 2MB."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-20 overflow-hidden rounded-2xl bg-bg-subtle",
						children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: "",
							className: "size-full object-cover object-[center_12%]"
						}) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						onChange: (e) => void onPhoto(e.target.files?.[0])
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid gap-3 rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					value: form.name,
					onChange: (v) => setForm({
						...form,
						name: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Role",
					value: form.role,
					onChange: (v) => setForm({
						...form,
						role: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tagline",
					value: form.tagline,
					onChange: (v) => setForm({
						...form,
						tagline: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Short intro",
					value: form.intro,
					onChange: (v) => setForm({
						...form,
						intro: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Biography",
					value: form.bio,
					onChange: (v) => setForm({
						...form,
						bio: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Location",
					value: form.location,
					onChange: (v) => setForm({
						...form,
						location: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Education summary",
					value: form.educationSummary,
					onChange: (v) => setForm({
						...form,
						educationSummary: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Interests",
					value: form.interests,
					onChange: (v) => setForm({
						...form,
						interests: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Typing phrases (one per line)",
					value: form.typingPhrases,
					onChange: (v) => setForm({
						...form,
						typingPhrases: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Availability label",
					value: form.availabilityLabel,
					onChange: (v) => setForm({
						...form,
						availabilityLabel: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Availability detail",
					value: form.availabilityDetail,
					onChange: (v) => setForm({
						...form,
						availabilityDetail: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "gradient",
					onClick: () => void save(),
					disabled: busy,
					children: busy ? "Saving…" : "Save profile"
				})
			]
		})]
	});
}
function SkillsEditor({ skills, onSaved }) {
	const empty = {
		name: "",
		percentage: 50,
		category: "Programming",
		description: "",
		icon: "",
		sortOrder: skills.length
	};
	const [draft, setDraft] = (0, import_react.useState)(empty);
	async function save(input) {
		try {
			await upsertSkill({ data: {
				id: input.id,
				name: input.name,
				percentage: Number(input.percentage),
				category: input.category || "Programming",
				description: input.description,
				icon: input.icon || null,
				sortOrder: Number(input.sortOrder) || 0
			} });
			toast.success("Skill saved");
			setDraft({
				...empty,
				sortOrder: skills.length + 1
			});
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save skill");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid gap-3 rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Add skill"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					value: draft.name,
					onChange: (v) => setDraft({
						...draft,
						name: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Percentage",
					value: String(draft.percentage),
					onChange: (v) => setDraft({
						...draft,
						percentage: Number(v) || 0
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					value: draft.description,
					onChange: (v) => setDraft({
						...draft,
						description: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void save(draft),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add skill"]
				})
			]
		}), skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillRow, {
			skill: s,
			onSave: (row) => save({
				id: row.id,
				name: row.name,
				percentage: row.percentage,
				category: row.category,
				description: row.description,
				icon: row.icon ?? "",
				sortOrder: row.sortOrder
			}),
			onDelete: async () => {
				await deleteSkill({ data: { id: s.id } });
				toast.success("Skill removed");
				await onSaved();
			}
		}, s.id))]
	});
}
function SkillRow({ skill, onSave, onDelete }) {
	const [s, setS] = (0, import_react.useState)(skill);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass grid gap-3 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: skill.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void onDelete(),
					className: "text-danger",
					"aria-label": "Delete skill",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				value: s.name,
				onChange: (v) => setS({
					...s,
					name: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Percentage",
				value: String(s.percentage),
				onChange: (v) => setS({
					...s,
					percentage: Number(v) || 0
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: s.description,
				onChange: (v) => setS({
					...s,
					description: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => void onSave(s),
				children: "Save"
			})
		]
	});
}
function ProjectsEditor({ projects, onSaved }) {
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		description: "",
		technologies: "C",
		githubUrl: "",
		liveUrl: "",
		sortOrder: projects.length
	});
	async function save(input) {
		try {
			await upsertProject({ data: {
				id: input.id,
				name: input.name,
				description: input.description,
				technologies: input.technologies.split(",").map((t) => t.trim()).filter(Boolean),
				githubUrl: input.githubUrl,
				liveUrl: input.liveUrl,
				featured: true,
				sortOrder: Number(input.sortOrder) || 0
			} });
			toast.success("Project saved");
			setDraft({
				name: "",
				description: "",
				technologies: "C",
				githubUrl: "",
				liveUrl: "",
				sortOrder: projects.length + 1
			});
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save project");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid gap-3 rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Add project"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					value: draft.name,
					onChange: (v) => setDraft({
						...draft,
						name: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					value: draft.description,
					onChange: (v) => setDraft({
						...draft,
						description: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Technologies (comma separated)",
					value: draft.technologies,
					onChange: (v) => setDraft({
						...draft,
						technologies: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "GitHub URL",
					value: draft.githubUrl,
					onChange: (v) => setDraft({
						...draft,
						githubUrl: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Live demo URL",
					value: draft.liveUrl,
					onChange: (v) => setDraft({
						...draft,
						liveUrl: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void save(draft),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add project"]
				})
			]
		}), projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectRow, {
			project,
			onSave: (p) => save({
				id: p.id,
				name: p.name,
				description: p.description,
				technologies: p.technologies.join(", "),
				githubUrl: p.githubUrl,
				liveUrl: p.liveUrl,
				sortOrder: p.sortOrder
			}),
			onDelete: async () => {
				await deleteProject({ data: { id: project.id } });
				toast.success("Project removed");
				await onSaved();
			},
			onImage: async (file) => {
				const payload = await fileToBase64(file);
				await uploadProjectImage({ data: {
					...payload,
					projectId: project.id
				} });
				toast.success("Image uploaded");
				await onSaved();
			}
		}, project.id))]
	});
}
function ProjectRow({ project, onSave, onDelete, onImage }) {
	const [p, setP] = (0, import_react.useState)(project);
	const src = projectImageSrc(project);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass grid gap-3 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: project.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void onDelete(),
					className: "text-danger",
					"aria-label": "Delete project",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}),
			src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "h-32 w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "file",
				accept: "image/jpeg,image/png,image/webp",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (f) onImage(f);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				value: p.name,
				onChange: (v) => setP({
					...p,
					name: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: p.description,
				onChange: (v) => setP({
					...p,
					description: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Technologies",
				value: p.technologies.join(", "),
				onChange: (v) => setP({
					...p,
					technologies: v.split(",").map((t) => t.trim()).filter(Boolean)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "GitHub URL",
				value: p.githubUrl,
				onChange: (v) => setP({
					...p,
					githubUrl: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Live demo URL",
				value: p.liveUrl,
				onChange: (v) => setP({
					...p,
					liveUrl: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => void onSave(p),
				children: "Save"
			})
		]
	});
}
function EducationEditor({ items, onSaved }) {
	const [draft, setDraft] = (0, import_react.useState)({
		title: "",
		institution: "",
		period: "",
		description: "",
		sortOrder: items.length
	});
	async function save(input) {
		try {
			await upsertEducation({ data: input });
			toast.success("Education saved");
			setDraft({
				title: "",
				institution: "",
				period: "",
				description: "",
				sortOrder: items.length + 1
			});
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid gap-3 rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Add education"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					value: draft.title,
					onChange: (v) => setDraft({
						...draft,
						title: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Institution",
					value: draft.institution,
					onChange: (v) => setDraft({
						...draft,
						institution: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Period",
					value: draft.period,
					onChange: (v) => setDraft({
						...draft,
						period: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					value: draft.description,
					onChange: (v) => setDraft({
						...draft,
						description: v
					}),
					area: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void save(draft),
					children: "Add education"
				})
			]
		}), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EduRow, {
			item,
			onSave: (e) => save({
				id: e.id,
				title: e.title,
				institution: e.institution,
				period: e.period,
				description: e.description,
				sortOrder: e.sortOrder
			}),
			onDelete: async () => {
				await deleteEducation({ data: { id: item.id } });
				toast.success("Removed");
				await onSaved();
			}
		}, item.id))]
	});
}
function EduRow({ item, onSave, onDelete }) {
	const [e, setE] = (0, import_react.useState)(item);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass grid gap-3 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void onDelete(),
					className: "text-danger",
					"aria-label": "Delete",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: e.title,
				onChange: (v) => setE({
					...e,
					title: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Institution",
				value: e.institution,
				onChange: (v) => setE({
					...e,
					institution: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Period",
				value: e.period,
				onChange: (v) => setE({
					...e,
					period: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: e.description,
				onChange: (v) => setE({
					...e,
					description: v
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => void onSave(e),
				children: "Save"
			})
		]
	});
}
function MessagesPanel({ messages, onSaved }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-3",
		children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No messages yet. The contact form on the site writes here."
		}) : null, messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: cn("glass rounded-2xl p-5", !m.read && "shadow-glow"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: m.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: m.email
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: new Date(m.createdAt).toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-fg",
					children: m.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: async () => {
							await markMessageRead({ data: {
								id: m.id,
								read: !m.read
							} });
							await onSaved();
						},
						children: m.read ? "Mark unread" : "Mark read"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: async () => {
							await deleteMessage({ data: { id: m.id } });
							toast.success("Deleted");
							await onSaved();
						},
						children: "Delete"
					})]
				})
			]
		}, m.id))]
	});
}
function SocialEditor({ links, onSaved }) {
	const [draft, setDraft] = (0, import_react.useState)({
		platform: "github",
		label: "GitHub",
		url: "",
		sortOrder: links.length
	});
	async function save(input) {
		try {
			await upsertSocial({ data: input });
			toast.success("Link saved");
			setDraft({
				platform: "github",
				label: "GitHub",
				url: "",
				sortOrder: links.length + 1
			});
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid gap-3 rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Add social link"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Platform",
					value: draft.platform,
					onChange: (v) => setDraft({
						...draft,
						platform: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Label",
					value: draft.label,
					onChange: (v) => setDraft({
						...draft,
						label: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "URL",
					value: draft.url,
					onChange: (v) => setDraft({
						...draft,
						url: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void save(draft),
					children: "Add link"
				})
			]
		}), links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
			link,
			onSave: (l) => save({
				id: l.id,
				platform: l.platform,
				label: l.label,
				url: l.url,
				sortOrder: l.sortOrder
			}),
			onDelete: async () => {
				await deleteSocial({ data: { id: link.id } });
				toast.success("Removed");
				await onSaved();
			}
		}, link.id))]
	});
}
function SocialRow({ link, onSave, onDelete }) {
	const [l, setL] = (0, import_react.useState)(link);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass grid gap-3 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: link.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void onDelete(),
					className: "text-danger",
					"aria-label": "Delete",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Platform",
				value: l.platform,
				onChange: (v) => setL({
					...l,
					platform: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Label",
				value: l.label,
				onChange: (v) => setL({
					...l,
					label: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL",
				value: l.url,
				onChange: (v) => setL({
					...l,
					url: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => void onSave(l),
				children: "Save"
			})
		]
	});
}
function Field({ label, value, onChange, area }) {
	const id = label.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			id,
			value,
			onChange: (e) => onChange(e.target.value)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id,
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function AdminPage() {
	const { user, isPending } = useCurrentUserState();
	const data = Route$4.useLoaderData();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[100dvh] place-items-center bg-bg text-muted",
		children: "Loading session…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {
		data,
		user
	});
}
function AdminHomeLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "text-sm text-muted hover:text-fg",
		children: "View site"
	});
}
//#endregion
export { AdminHomeLink, AdminPage as component };
