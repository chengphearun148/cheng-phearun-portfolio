import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bell,
  Code2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  Share2,
  Trash2,
  UserRound,
} from "lucide-react";
import { signOut } from "@/lib/auth/client";
import type { AppUser } from "@/lib/auth/use-current-user";
import {
  deleteEducation,
  deleteMessage,
  deleteProject,
  deleteSkill,
  deleteSocial,
  getAdminAccess,
  listMessages,
  markMessageRead,
  updateProfile,
  uploadProfileImage,
  uploadProjectImage,
  upsertEducation,
  upsertProject,
  upsertSkill,
  upsertSocial,
} from "@/lib/portfolio.functions";
import type { ContactMessage, EducationItem, PortfolioData, Project, Skill, SocialLink } from "@/lib/portfolio-types";
import { profileImageSrc, projectImageSrc } from "@/lib/portfolio-types";
import { fileToBase64 } from "@/lib/file-to-base64";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";

type Tab =
  | "overview"
  | "profile"
  | "skills"
  | "projects"
  | "education"
  | "messages"
  | "social";

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "social", label: "Social Links", icon: Share2 },
];

export function AdminDashboard({ data, user }: { data: PortfolioData; user: AppUser }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  async function refresh() {
    await router.invalidate();
    try {
      setMessages(await listMessages());
    } catch {
      /* not owner yet or signed out */
    }
  }

  useEffect(() => {
    let cancelled = false;
    getAdminAccess()
      .then((access) => {
        if (!cancelled) setAllowed(access.isOwner);
      })
      .catch(() => {
        if (!cancelled) setAllowed(false);
      });
    listMessages()
      .then((rows) => {
        if (!cancelled) setMessages(rows);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  if (allowed === null) {
    return (
      <main className="grid min-h-[100dvh] place-items-center bg-bg text-muted">
        Checking access…
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="grid min-h-[100dvh] place-items-center bg-bg px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-semibold">Access reserved</h1>
          <p className="mt-2 max-w-sm text-sm text-muted">
            This dashboard belongs to the site owner. Sign in with the owner account.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/">Back to site</Link>
          </Button>
        </div>
      </main>
    );
  }

  const unread = messages.filter((m) => !m.read).length;
  const photo = profileImageSrc(data.profile);

  return (
    <div className="flex min-h-[100dvh] bg-bg text-fg">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-bg-elevated lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-violet font-display text-sm font-bold text-white">
            CP
          </span>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-subtle">Portfolio CMS</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm",
                tab === item.id
                  ? "bg-linear-to-r from-accent to-violet text-white"
                  : "text-muted hover:bg-bg-subtle hover:text-fg",
              )}
            >
              <item.icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              {item.id === "messages" && unread > 0 ? (
                <span className="grid min-w-5 place-items-center rounded-full bg-white/20 px-1.5 text-[10px]">
                  {unread}
                </span>
              ) : null}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => void signOut("/")}
          className="m-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-bg-subtle hover:text-fg"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs tracking-wide text-subtle uppercase">Admin</p>
            <h1 className="font-display text-lg font-semibold tracking-tight">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              to="/"
              className="hidden rounded-full border border-border px-3 py-2 text-sm text-muted hover:text-fg sm:inline"
            >
              View site
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
              {user.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="" className="size-7 rounded-full object-cover" />
              ) : (
                <span className="grid size-7 place-items-center rounded-full bg-bg-subtle text-xs">
                  {(user.displayName ?? "A")[0]}
                </span>
              )}
              <span className="hidden pr-1 text-xs sm:inline">{user.displayName ?? "Admin"}</span>
            </div>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-border px-3 py-2 lg:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-xs",
                tab === item.id ? "bg-accent text-accent-fg" : "border border-border text-muted",
              )}
            >
              {item.label}
              {item.id === "messages" && unread > 0 ? ` (${unread})` : ""}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {tab === "overview" ? (
            <Overview
              data={data}
              messages={messages}
              photo={photo}
              onJump={setTab}
            />
          ) : null}
          {tab === "profile" ? <ProfileEditor data={data} onSaved={refresh} /> : null}
          {tab === "skills" ? <SkillsEditor skills={data.skills} onSaved={refresh} /> : null}
          {tab === "projects" ? (
            <ProjectsEditor projects={data.projects} onSaved={refresh} />
          ) : null}
          {tab === "education" ? (
            <EducationEditor items={data.education} onSaved={refresh} />
          ) : null}
          {tab === "messages" ? (
            <MessagesPanel messages={messages} onSaved={refresh} />
          ) : null}
          {tab === "social" ? <SocialEditor links={data.social} onSaved={refresh} /> : null}
        </div>
      </div>
    </div>
  );
}

function Overview({
  data,
  messages,
  photo,
  onJump,
}: {
  data: PortfolioData;
  messages: ContactMessage[];
  photo: string | null;
  onJump: (tab: Tab) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={String(data.projects.length)} />
        <StatCard label="Total Skills" value={String(data.skills.length)} />
        <StatCard label="Total Messages" value={String(messages.length)} />
        <StatCard label="Education" value={String(data.education.length)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">Recent Messages</p>
            <Bell className="size-4 text-muted" />
          </div>
          <ul className="mt-4 space-y-3">
            {messages.slice(0, 4).map((m) => (
              <li key={m.id} className="text-sm">
                <p className="font-medium">{m.name}</p>
                <p className="truncate text-muted">{m.message}</p>
              </li>
            ))}
            {messages.length === 0 ? (
              <p className="text-sm text-muted">No messages yet.</p>
            ) : null}
          </ul>
          <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => onJump("messages")}>
            View All Messages
          </Button>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="font-medium">Profile Preview</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="size-14 overflow-hidden rounded-full bg-bg-subtle">
              {photo ? (
                <img src={photo} alt="" className="size-full object-cover object-[center_12%]" />
              ) : null}
            </div>
            <div>
              <p className="font-display font-semibold">{data.profile.name}</p>
              <p className="text-sm text-muted">{data.profile.tagline}</p>
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-muted">{data.profile.intro}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => onJump("profile")}>
            Edit Profile
          </Button>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="font-medium">Quick Actions</p>
          <div className="mt-4 grid gap-2">
            <Button variant="outline" onClick={() => onJump("profile")}>
              Edit Profile
            </Button>
            <Button variant="outline" onClick={() => onJump("skills")}>
              Add Skill
            </Button>
            <Button variant="outline" onClick={() => onJump("projects")}>
              Add Project
            </Button>
            <Button variant="outline" onClick={() => onJump("education")}>
              Add Education
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function ProfileEditor({ data, onSaved }: { data: PortfolioData; onSaved: () => Promise<void> }) {
  const p = data.profile;
  const [form, setForm] = useState({
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
    cvUrl: p.cvUrl ?? "",
  });
  const [busy, setBusy] = useState(false);
  const photo = profileImageSrc(p);

  async function save() {
    setBusy(true);
    try {
      await updateProfile({
        data: {
          ...form,
          typingPhrases: form.typingPhrases
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          cvUrl: form.cvUrl || null,
        },
      });
      toast.success("Profile saved");
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function onPhoto(file: File | undefined) {
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

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="glass rounded-2xl p-5">
        <p className="font-medium">Profile photo</p>
        <p className="mt-1 text-sm text-muted">JPG, PNG, or WebP. Max 2MB.</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="size-20 overflow-hidden rounded-2xl bg-bg-subtle">
            {photo ? (
              <img src={photo} alt="" className="size-full object-cover object-[center_12%]" />
            ) : null}
          </div>
          <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => void onPhoto(e.target.files?.[0])} />
        </div>
      </div>
      <div className="glass grid gap-3 rounded-2xl p-5">
        <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
        <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Field label="Short intro" value={form.intro} onChange={(v) => setForm({ ...form, intro: v })} area />
        <Field label="Biography" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} area />
        <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
        <Field
          label="Education summary"
          value={form.educationSummary}
          onChange={(v) => setForm({ ...form, educationSummary: v })}
        />
        <Field label="Interests" value={form.interests} onChange={(v) => setForm({ ...form, interests: v })} />
        <Field
          label="Typing phrases (one per line)"
          value={form.typingPhrases}
          onChange={(v) => setForm({ ...form, typingPhrases: v })}
          area
        />
        <Field
          label="Availability label"
          value={form.availabilityLabel}
          onChange={(v) => setForm({ ...form, availabilityLabel: v })}
        />
        <Field
          label="Availability detail"
          value={form.availabilityDetail}
          onChange={(v) => setForm({ ...form, availabilityDetail: v })}
        />
        <Button variant="gradient" onClick={() => void save()} disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </div>
  );
}

function SkillsEditor({ skills, onSaved }: { skills: Skill[]; onSaved: () => Promise<void> }) {
  const empty = { name: "", percentage: 50, category: "Programming", description: "", icon: "", sortOrder: skills.length };
  const [draft, setDraft] = useState(empty);

  async function save(input: typeof empty & { id?: number }) {
    try {
      await upsertSkill({
        data: {
          id: input.id,
          name: input.name,
          percentage: Number(input.percentage),
          category: input.category || "Programming",
          description: input.description,
          icon: input.icon || null,
          sortOrder: Number(input.sortOrder) || 0,
        },
      });
      toast.success("Skill saved");
      setDraft({ ...empty, sortOrder: skills.length + 1 });
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save skill");
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="glass grid gap-3 rounded-2xl p-5">
        <p className="font-medium">Add skill</p>
        <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        <Field
          label="Percentage"
          value={String(draft.percentage)}
          onChange={(v) => setDraft({ ...draft, percentage: Number(v) || 0 })}
        />
        <Field label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} area />
        <Button onClick={() => void save(draft)}>
          <Plus className="size-4" /> Add skill
        </Button>
      </div>
      {skills.map((s) => (
        <SkillRow
          key={s.id}
          skill={s}
          onSave={(row) =>
            save({
              id: row.id,
              name: row.name,
              percentage: row.percentage,
              category: row.category,
              description: row.description,
              icon: row.icon ?? "",
              sortOrder: row.sortOrder,
            })
          }
          onDelete={async () => {
            await deleteSkill({ data: { id: s.id } });
            toast.success("Skill removed");
            await onSaved();
          }}
        />
      ))}
    </div>
  );
}

function SkillRow({
  skill,
  onSave,
  onDelete,
}: {
  skill: Skill;
  onSave: (s: Skill) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [s, setS] = useState(skill);
  return (
    <div className="glass grid gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">{skill.name}</p>
        <button type="button" onClick={() => void onDelete()} className="text-danger" aria-label="Delete skill">
          <Trash2 className="size-4" />
        </button>
      </div>
      <Field label="Name" value={s.name} onChange={(v) => setS({ ...s, name: v })} />
      <Field
        label="Percentage"
        value={String(s.percentage)}
        onChange={(v) => setS({ ...s, percentage: Number(v) || 0 })}
      />
      <Field label="Description" value={s.description} onChange={(v) => setS({ ...s, description: v })} area />
      <Button variant="outline" onClick={() => void onSave(s)}>
        Save
      </Button>
    </div>
  );
}

function ProjectsEditor({
  projects,
  onSaved,
}: {
  projects: Project[];
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState({
    name: "",
    description: "",
    technologies: "C",
    githubUrl: "",
    liveUrl: "",
    sortOrder: projects.length,
  });

  async function save(input: typeof draft & { id?: number }) {
    try {
      await upsertProject({
        data: {
          id: input.id,
          name: input.name,
          description: input.description,
          technologies: input.technologies.split(",").map((t) => t.trim()).filter(Boolean),
          githubUrl: input.githubUrl,
          liveUrl: input.liveUrl,
          featured: true,
          sortOrder: Number(input.sortOrder) || 0,
        },
      });
      toast.success("Project saved");
      setDraft({ name: "", description: "", technologies: "C", githubUrl: "", liveUrl: "", sortOrder: projects.length + 1 });
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save project");
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="glass grid gap-3 rounded-2xl p-5">
        <p className="font-medium">Add project</p>
        <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        <Field label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} area />
        <Field
          label="Technologies (comma separated)"
          value={draft.technologies}
          onChange={(v) => setDraft({ ...draft, technologies: v })}
        />
        <Field label="GitHub URL" value={draft.githubUrl} onChange={(v) => setDraft({ ...draft, githubUrl: v })} />
        <Field label="Live demo URL" value={draft.liveUrl} onChange={(v) => setDraft({ ...draft, liveUrl: v })} />
        <Button onClick={() => void save(draft)}>
          <Plus className="size-4" /> Add project
        </Button>
      </div>
      {projects.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
          onSave={(p) =>
            save({
              id: p.id,
              name: p.name,
              description: p.description,
              technologies: p.technologies.join(", "),
              githubUrl: p.githubUrl,
              liveUrl: p.liveUrl,
              sortOrder: p.sortOrder,
            })
          }
          onDelete={async () => {
            await deleteProject({ data: { id: project.id } });
            toast.success("Project removed");
            await onSaved();
          }}
          onImage={async (file) => {
            const payload = await fileToBase64(file);
            await uploadProjectImage({ data: { ...payload, projectId: project.id } });
            toast.success("Image uploaded");
            await onSaved();
          }}
        />
      ))}
    </div>
  );
}

function ProjectRow({
  project,
  onSave,
  onDelete,
  onImage,
}: {
  project: Project;
  onSave: (p: Project) => Promise<void>;
  onDelete: () => Promise<void>;
  onImage: (file: File) => Promise<void>;
}) {
  const [p, setP] = useState(project);
  const src = projectImageSrc(project);
  return (
    <div className="glass grid gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">{project.name}</p>
        <button type="button" onClick={() => void onDelete()} className="text-danger" aria-label="Delete project">
          <Trash2 className="size-4" />
        </button>
      </div>
      {src ? (
        <img src={src} alt="" className="h-32 w-full rounded-xl object-cover" />
      ) : null}
      <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) void onImage(f);
      }} />
      <Field label="Name" value={p.name} onChange={(v) => setP({ ...p, name: v })} />
      <Field label="Description" value={p.description} onChange={(v) => setP({ ...p, description: v })} area />
      <Field
        label="Technologies"
        value={p.technologies.join(", ")}
        onChange={(v) => setP({ ...p, technologies: v.split(",").map((t) => t.trim()).filter(Boolean) })}
      />
      <Field label="GitHub URL" value={p.githubUrl} onChange={(v) => setP({ ...p, githubUrl: v })} />
      <Field label="Live demo URL" value={p.liveUrl} onChange={(v) => setP({ ...p, liveUrl: v })} />
      <Button variant="outline" onClick={() => void onSave(p)}>
        Save
      </Button>
    </div>
  );
}

function EducationEditor({
  items,
  onSaved,
}: {
  items: EducationItem[];
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState({
    title: "",
    institution: "",
    period: "",
    description: "",
    sortOrder: items.length,
  });

  async function save(input: typeof draft & { id?: number }) {
    try {
      await upsertEducation({ data: input });
      toast.success("Education saved");
      setDraft({ title: "", institution: "", period: "", description: "", sortOrder: items.length + 1 });
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="glass grid gap-3 rounded-2xl p-5">
        <p className="font-medium">Add education</p>
        <Field label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <Field label="Institution" value={draft.institution} onChange={(v) => setDraft({ ...draft, institution: v })} />
        <Field label="Period" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} />
        <Field label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} area />
        <Button onClick={() => void save(draft)}>Add education</Button>
      </div>
      {items.map((item) => (
        <EduRow
          key={item.id}
          item={item}
          onSave={(e) =>
            save({
              id: e.id,
              title: e.title,
              institution: e.institution,
              period: e.period,
              description: e.description,
              sortOrder: e.sortOrder,
            })
          }
          onDelete={async () => {
            await deleteEducation({ data: { id: item.id } });
            toast.success("Removed");
            await onSaved();
          }}
        />
      ))}
    </div>
  );
}

function EduRow({
  item,
  onSave,
  onDelete,
}: {
  item: EducationItem;
  onSave: (e: EducationItem) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [e, setE] = useState(item);
  return (
    <div className="glass grid gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">{item.title}</p>
        <button type="button" onClick={() => void onDelete()} className="text-danger" aria-label="Delete">
          <Trash2 className="size-4" />
        </button>
      </div>
      <Field label="Title" value={e.title} onChange={(v) => setE({ ...e, title: v })} />
      <Field label="Institution" value={e.institution} onChange={(v) => setE({ ...e, institution: v })} />
      <Field label="Period" value={e.period} onChange={(v) => setE({ ...e, period: v })} />
      <Field label="Description" value={e.description} onChange={(v) => setE({ ...e, description: v })} area />
      <Button variant="outline" onClick={() => void onSave(e)}>
        Save
      </Button>
    </div>
  );
}

function MessagesPanel({
  messages,
  onSaved,
}: {
  messages: ContactMessage[];
  onSaved: () => Promise<void>;
}) {
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {messages.length === 0 ? (
        <p className="text-sm text-muted">No messages yet. The contact form on the site writes here.</p>
      ) : null}
      {messages.map((m) => (
        <article key={m.id} className={cn("glass rounded-2xl p-5", !m.read && "shadow-glow")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{m.name}</p>
              <p className="text-sm text-muted">{m.email}</p>
            </div>
            <p className="text-xs text-subtle">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
          <p className="mt-3 text-sm text-fg">{m.message}</p>
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await markMessageRead({ data: { id: m.id, read: !m.read } });
                await onSaved();
              }}
            >
              {m.read ? "Mark unread" : "Mark read"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await deleteMessage({ data: { id: m.id } });
                toast.success("Deleted");
                await onSaved();
              }}
            >
              Delete
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function SocialEditor({ links, onSaved }: { links: SocialLink[]; onSaved: () => Promise<void> }) {
  const [draft, setDraft] = useState({ platform: "github", label: "GitHub", url: "", sortOrder: links.length });

  async function save(input: typeof draft & { id?: number }) {
    try {
      await upsertSocial({ data: input });
      toast.success("Link saved");
      setDraft({ platform: "github", label: "GitHub", url: "", sortOrder: links.length + 1 });
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="glass grid gap-3 rounded-2xl p-5">
        <p className="font-medium">Add social link</p>
        <Field label="Platform" value={draft.platform} onChange={(v) => setDraft({ ...draft, platform: v })} />
        <Field label="Label" value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} />
        <Field label="URL" value={draft.url} onChange={(v) => setDraft({ ...draft, url: v })} />
        <Button onClick={() => void save(draft)}>Add link</Button>
      </div>
      {links.map((link) => (
        <SocialRow
          key={link.id}
          link={link}
          onSave={(l) =>
            save({
              id: l.id,
              platform: l.platform,
              label: l.label,
              url: l.url,
              sortOrder: l.sortOrder,
            })
          }
          onDelete={async () => {
            await deleteSocial({ data: { id: link.id } });
            toast.success("Removed");
            await onSaved();
          }}
        />
      ))}
    </div>
  );
}

function SocialRow({
  link,
  onSave,
  onDelete,
}: {
  link: SocialLink;
  onSave: (l: SocialLink) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [l, setL] = useState(link);
  return (
    <div className="glass grid gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">{link.label}</p>
        <button type="button" onClick={() => void onDelete()} className="text-danger" aria-label="Delete">
          <Trash2 className="size-4" />
        </button>
      </div>
      <Field label="Platform" value={l.platform} onChange={(v) => setL({ ...l, platform: v })} />
      <Field label="Label" value={l.label} onChange={(v) => setL({ ...l, label: v })} />
      <Field label="URL" value={l.url} onChange={(v) => setL({ ...l, url: v })} />
      <Button variant="outline" onClick={() => void onSave(l)}>
        Save
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  area,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {area ? (
        <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
