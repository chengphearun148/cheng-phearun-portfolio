import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { parseStringArray } from "@/lib/utils";
import type {
  AdminAccess,
  ContactMessage,
  EducationItem,
  PortfolioData,
  Project,
  SiteProfile,
  Skill,
  SocialLink,
} from "@/lib/portfolio-types";

const MAX_IMAGE_CHARS = 2_800_000; // ~2MB of base64
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

type ProfileRow = {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  bio: string;
  location: string;
  education_summary: string;
  interests: string;
  typing_phrases: string;
  availability_label: string;
  availability_detail: string;
  cv_url: string | null;
  profile_image_id: string | null;
  profile_image_url: string | null;
};

type SkillRow = {
  id: number;
  name: string;
  percentage: number;
  category: string;
  description: string;
  icon: string | null;
  sort_order: number;
};

type ProjectRow = {
  id: number;
  name: string;
  description: string;
  technologies: string;
  github_url: string;
  live_url: string;
  image_id: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
};

type EducationRow = {
  id: number;
  title: string;
  institution: string;
  period: string;
  description: string;
  sort_order: number;
};

type SocialRow = {
  id: number;
  platform: string;
  label: string;
  url: string;
  sort_order: number;
};

type MessageRow = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string | Date;
};

function mapProfile(row: ProfileRow): SiteProfile {
  return {
    name: row.name,
    role: row.role,
    tagline: row.tagline,
    intro: row.intro,
    bio: row.bio,
    location: row.location,
    educationSummary: row.education_summary,
    interests: row.interests,
    typingPhrases: parseStringArray(row.typing_phrases),
    availabilityLabel: row.availability_label,
    availabilityDetail: row.availability_detail,
    cvUrl: row.cv_url,
    profileImageId: row.profile_image_id,
    profileImageUrl: row.profile_image_url,
  };
}

function mapSkill(row: SkillRow): Skill {
  return {
    id: row.id,
    name: row.name,
    percentage: row.percentage,
    category: row.category,
    description: row.description,
    icon: row.icon,
    sortOrder: row.sort_order,
  };
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    technologies: parseStringArray(row.technologies),
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    imageId: row.image_id,
    imageUrl: row.image_url,
    featured: row.featured,
    sortOrder: row.sort_order,
  };
}

function mapEducation(row: EducationRow): EducationItem {
  return {
    id: row.id,
    title: row.title,
    institution: row.institution,
    period: row.period,
    description: row.description,
    sortOrder: row.sort_order,
  };
}

function mapSocial(row: SocialRow): SocialLink {
  return {
    id: row.id,
    platform: row.platform,
    label: row.label,
    url: row.url,
    sortOrder: row.sort_order,
  };
}

function mapMessage(row: MessageRow): ContactMessage {
  const created =
    typeof row.created_at === "string"
      ? row.created_at
      : row.created_at instanceof Date
        ? row.created_at.toISOString()
        : String(row.created_at);
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    read: row.read,
    createdAt: created,
  };
}

async function requireOwner(userId: string): Promise<void> {
  const sql = await getSql();
  const rows = await sql<{ owner_user_id: string | null }>`
    select owner_user_id from site_profile where id = 'default'
  `;
  const owner = rows[0]?.owner_user_id ?? null;
  if (!owner) {
    await sql`
      update site_profile
      set owner_user_id = ${userId}
      where id = 'default' and owner_user_id is null
    `;
    return;
  }
  if (owner !== userId) {
    throw new Error("Forbidden");
  }
}

export const getPortfolio = createServerFn({ method: "GET" }).handler(
  async (): Promise<PortfolioData> => {
    const sql = await getSql();
    const [profiles, skillRows, projectRows, educationRows, socialRows] =
      await Promise.all([
        sql<ProfileRow>`
          select name, role, tagline, intro, bio, location, education_summary, interests,
                 typing_phrases, availability_label, availability_detail,
                 cv_url, profile_image_id, profile_image_url
          from site_profile where id = 'default'
        `,
        sql<SkillRow>`
          select id, name, percentage, category, description, icon, sort_order
          from skills order by sort_order asc, id asc
        `,
        sql<ProjectRow>`
          select id, name, description, technologies, github_url, live_url,
                 image_id, image_url, featured, sort_order
          from projects order by sort_order asc, id asc
        `,
        sql<EducationRow>`
          select id, title, institution, period, description, sort_order
          from education order by sort_order asc, id asc
        `,
        sql<SocialRow>`
          select id, platform, label, url, sort_order
          from social_links order by sort_order asc, id asc
        `,
      ]);

    const profileRow = profiles[0];
    if (!profileRow) {
      throw new Error("Portfolio profile is not initialized");
    }

    return {
      profile: mapProfile(profileRow),
      skills: skillRows.map(mapSkill),
      projects: projectRows.map(mapProject),
      education: educationRows.map(mapEducation),
      social: socialRows.map(mapSocial),
    };
  },
);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z
    .string()
    .trim()
    .min(5)
    .max(120)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
  message: z.string().trim().min(10).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into contact_messages (name, email, message)
      values (${data.name}, ${data.email}, ${data.message})
    `;
    return { ok: true as const };
  });

export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<AdminAccess> => {
    const sql = await getSql();
    const rows = await sql<{ owner_user_id: string | null }>`
      select owner_user_id from site_profile where id = 'default'
    `;
    const owner = rows[0]?.owner_user_id ?? null;
    return {
      isOwner: !owner || owner === context.userId,
      canClaim: !owner,
      userId: context.userId,
    };
  });

const profileSchema = z.object({
  name: z.string().trim().min(1).max(80),
  role: z.string().trim().min(1).max(120),
  tagline: z.string().trim().min(1).max(160),
  intro: z.string().trim().min(1).max(400),
  bio: z.string().trim().min(1).max(4000),
  location: z.string().trim().min(1).max(120),
  educationSummary: z.string().trim().min(1).max(240),
  interests: z.string().trim().min(1).max(240),
  typingPhrases: z.array(z.string().trim().min(1).max(80)).min(1).max(12),
  availabilityLabel: z.string().trim().min(1).max(80),
  availabilityDetail: z.string().trim().min(1).max(160),
  cvUrl: z.string().trim().max(400).nullable().optional(),
});

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(profileSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    const phrases = JSON.stringify(data.typingPhrases);
    const cvUrl = data.cvUrl?.trim() ? data.cvUrl.trim() : null;
    await sql`
      update site_profile set
        name = ${data.name},
        role = ${data.role},
        tagline = ${data.tagline},
        intro = ${data.intro},
        bio = ${data.bio},
        location = ${data.location},
        education_summary = ${data.educationSummary},
        interests = ${data.interests},
        typing_phrases = ${phrases},
        availability_label = ${data.availabilityLabel},
        availability_detail = ${data.availabilityDetail},
        cv_url = ${cvUrl},
        updated_at = now()
      where id = 'default'
    `;
    return { ok: true as const };
  });

const mediaSchema = z.object({
  mimeType: z.string(),
  data: z.string().min(1),
});

export const uploadProfileImage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(mediaSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    if (!ALLOWED_MIME.has(data.mimeType)) throw new Error("Unsupported image type");
    if (data.data.length > MAX_IMAGE_CHARS) throw new Error("Image is too large (max 2MB)");
    const id = crypto.randomUUID();
    const sql = await getSql();
    await sql`
      insert into media (id, mime_type, data)
      values (${id}, ${data.mimeType}, ${data.data})
    `;
    await sql`
      update site_profile set profile_image_id = ${id}, updated_at = now()
      where id = 'default'
    `;
    return { id };
  });

const skillUpsertSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().trim().min(1).max(40),
  percentage: z.number().int().min(0).max(100),
  category: z.string().trim().min(1).max(40).default("Programming"),
  description: z.string().trim().max(240).default(""),
  icon: z.string().trim().max(20).nullable().optional(),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

export const upsertSkill = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(skillUpsertSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    const icon = data.icon?.trim() ? data.icon.trim() : null;
    if (data.id) {
      await sql`
        update skills set
          name = ${data.name},
          percentage = ${data.percentage},
          category = ${data.category},
          description = ${data.description},
          icon = ${icon},
          sort_order = ${data.sortOrder}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const rows = await sql<{ id: number }>`
      insert into skills (name, percentage, category, description, icon, sort_order)
      values (${data.name}, ${data.percentage}, ${data.category}, ${data.description}, ${icon}, ${data.sortOrder})
      returning id
    `;
    return { id: rows[0]!.id };
  });

export const deleteSkill = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`delete from skills where id = ${data.id}`;
    return { ok: true as const };
  });

const projectUpsertSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(800),
  technologies: z.array(z.string().trim().min(1).max(40)).min(1).max(12),
  githubUrl: z.string().trim().max(400).default(""),
  liveUrl: z.string().trim().max(400).default(""),
  featured: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

export const upsertProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(projectUpsertSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    const techs = JSON.stringify(data.technologies);
    if (data.id) {
      await sql`
        update projects set
          name = ${data.name},
          description = ${data.description},
          technologies = ${techs},
          github_url = ${data.githubUrl},
          live_url = ${data.liveUrl},
          featured = ${data.featured},
          sort_order = ${data.sortOrder}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const rows = await sql<{ id: number }>`
      insert into projects (
        name, description, technologies, github_url, live_url, featured, sort_order
      ) values (
        ${data.name}, ${data.description}, ${techs}, ${data.githubUrl},
        ${data.liveUrl}, ${data.featured}, ${data.sortOrder}
      )
      returning id
    `;
    return { id: rows[0]!.id };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`delete from projects where id = ${data.id}`;
    return { ok: true as const };
  });

export const uploadProjectImage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(mediaSchema.extend({ projectId: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    if (!ALLOWED_MIME.has(data.mimeType)) throw new Error("Unsupported image type");
    if (data.data.length > MAX_IMAGE_CHARS) throw new Error("Image is too large (max 2MB)");
    const id = crypto.randomUUID();
    const sql = await getSql();
    await sql`
      insert into media (id, mime_type, data)
      values (${id}, ${data.mimeType}, ${data.data})
    `;
    await sql`
      update projects set image_id = ${id} where id = ${data.projectId}
    `;
    return { id };
  });

const educationUpsertSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().trim().min(1).max(120),
  institution: z.string().trim().min(1).max(120),
  period: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(800),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

export const upsertEducation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(educationUpsertSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    if (data.id) {
      await sql`
        update education set
          title = ${data.title},
          institution = ${data.institution},
          period = ${data.period},
          description = ${data.description},
          sort_order = ${data.sortOrder}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const rows = await sql<{ id: number }>`
      insert into education (title, institution, period, description, sort_order)
      values (${data.title}, ${data.institution}, ${data.period}, ${data.description}, ${data.sortOrder})
      returning id
    `;
    return { id: rows[0]!.id };
  });

export const deleteEducation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`delete from education where id = ${data.id}`;
    return { ok: true as const };
  });

const socialSchema = z.object({
  id: z.number().int().optional(),
  platform: z.string().trim().min(1).max(40),
  label: z.string().trim().min(1).max(40),
  url: z.string().trim().max(400),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

export const upsertSocial = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(socialSchema)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    if (data.id) {
      await sql`
        update social_links set
          platform = ${data.platform},
          label = ${data.label},
          url = ${data.url},
          sort_order = ${data.sortOrder}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const rows = await sql<{ id: number }>`
      insert into social_links (platform, label, url, sort_order)
      values (${data.platform}, ${data.label}, ${data.url}, ${data.sortOrder})
      returning id
    `;
    return { id: rows[0]!.id };
  });

export const deleteSocial = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`delete from social_links where id = ${data.id}`;
    return { ok: true as const };
  });

export const listMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ContactMessage[]> => {
    await requireOwner(context.userId);
    const sql = await getSql();
    const rows = await sql<MessageRow>`
      select id, name, email, message, read, created_at
      from contact_messages
      order by created_at desc
    `;
    return rows.map(mapMessage);
  });

export const markMessageRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), read: z.boolean() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`update contact_messages set read = ${data.read} where id = ${data.id}`;
    return { ok: true as const };
  });

export const deleteMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int() }))
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const sql = await getSql();
    await sql`delete from contact_messages where id = ${data.id}`;
    return { ok: true as const };
  });
