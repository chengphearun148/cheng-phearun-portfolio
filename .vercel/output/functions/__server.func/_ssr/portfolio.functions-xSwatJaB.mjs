import { r as createServerFn } from "./ssr.mjs";
import { L as string, N as number, O as array, P as object, k as boolean } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-BsSjoFSi.mjs";
import { i as parseStringArray, t as authMiddleware } from "./utils-Ca4XtJr3.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio.functions-xSwatJaB.js
var MAX_IMAGE_CHARS = 28e5;
var ALLOWED_MIME = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif"
]);
function mapProfile(row) {
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
		profileImageUrl: row.profile_image_url
	};
}
function mapSkill(row) {
	return {
		id: row.id,
		name: row.name,
		percentage: row.percentage,
		category: row.category,
		description: row.description,
		icon: row.icon,
		sortOrder: row.sort_order
	};
}
function mapProject(row) {
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
		sortOrder: row.sort_order
	};
}
function mapEducation(row) {
	return {
		id: row.id,
		title: row.title,
		institution: row.institution,
		period: row.period,
		description: row.description,
		sortOrder: row.sort_order
	};
}
function mapSocial(row) {
	return {
		id: row.id,
		platform: row.platform,
		label: row.label,
		url: row.url,
		sortOrder: row.sort_order
	};
}
function mapMessage(row) {
	const created = typeof row.created_at === "string" ? row.created_at : row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at);
	return {
		id: row.id,
		name: row.name,
		email: row.email,
		message: row.message,
		read: row.read,
		createdAt: created
	};
}
async function requireOwner(userId) {
	const sql = await getSql();
	const owner = (await sql`
    select owner_user_id from site_profile where id = 'default'
  `)[0]?.owner_user_id ?? null;
	if (!owner) {
		await sql`
      update site_profile
      set owner_user_id = ${userId}
      where id = 'default' and owner_user_id is null
    `;
		return;
	}
	if (owner !== userId) throw new Error("Forbidden");
}
var getPortfolio_createServerFn_handler = createServerRpc({
	id: "9d7478699c5fd9aa8d934c1a2b12da00bed068c0db8905070f40d135b1a6dda9",
	name: "getPortfolio",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => getPortfolio.__executeServer(opts));
var getPortfolio = createServerFn({ method: "GET" }).handler(getPortfolio_createServerFn_handler, async () => {
	const sql = await getSql();
	const [profiles, skillRows, projectRows, educationRows, socialRows] = await Promise.all([
		sql`
          select name, role, tagline, intro, bio, location, education_summary, interests,
                 typing_phrases, availability_label, availability_detail,
                 cv_url, profile_image_id, profile_image_url
          from site_profile where id = 'default'
        `,
		sql`
          select id, name, percentage, category, description, icon, sort_order
          from skills order by sort_order asc, id asc
        `,
		sql`
          select id, name, description, technologies, github_url, live_url,
                 image_id, image_url, featured, sort_order
          from projects order by sort_order asc, id asc
        `,
		sql`
          select id, title, institution, period, description, sort_order
          from education order by sort_order asc, id asc
        `,
		sql`
          select id, platform, label, url, sort_order
          from social_links order by sort_order asc, id asc
        `
	]);
	const profileRow = profiles[0];
	if (!profileRow) throw new Error("Portfolio profile is not initialized");
	return {
		profile: mapProfile(profileRow),
		skills: skillRows.map(mapSkill),
		projects: projectRows.map(mapProject),
		education: educationRows.map(mapEducation),
		social: socialRows.map(mapSocial)
	};
});
var contactSchema = object({
	name: string().trim().min(2).max(80),
	email: string().trim().min(5).max(120).refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
	message: string().trim().min(10).max(2e3)
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "cc327d387c887c674f6d813273545342693266251783233d8ba64e3ece388a89",
	name: "submitContact",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator(contactSchema).handler(submitContact_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into contact_messages (name, email, message)
      values (${data.name}, ${data.email}, ${data.message})
    `;
	return { ok: true };
});
var getAdminAccess_createServerFn_handler = createServerRpc({
	id: "203163a0abc625ddc60fb517da6f262861e92c9b5ed82b7edcb3d60dc0508310",
	name: "getAdminAccess",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => getAdminAccess.__executeServer(opts));
var getAdminAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminAccess_createServerFn_handler, async ({ context }) => {
	const owner = (await (await getSql())`
      select owner_user_id from site_profile where id = 'default'
    `)[0]?.owner_user_id ?? null;
	return {
		isOwner: !owner || owner === context.userId,
		canClaim: !owner,
		userId: context.userId
	};
});
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
var updateProfile_createServerFn_handler = createServerRpc({
	id: "024021f1b1f0cc8f453591fc6ade319362909b447822b34b80da1c2044371bfd",
	name: "updateProfile",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(profileSchema).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
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
	return { ok: true };
});
var mediaSchema = object({
	mimeType: string(),
	data: string().min(1)
});
var uploadProfileImage_createServerFn_handler = createServerRpc({
	id: "b6c6e43977fdf5d5437a2e243b6f70fc917c1c7219e602c91c4117beb2809ccd",
	name: "uploadProfileImage",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => uploadProfileImage.__executeServer(opts));
var uploadProfileImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(mediaSchema).handler(uploadProfileImage_createServerFn_handler, async ({ context, data }) => {
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
var skillUpsertSchema = object({
	id: number().int().optional(),
	name: string().trim().min(1).max(40),
	percentage: number().int().min(0).max(100),
	category: string().trim().min(1).max(40).default("Programming"),
	description: string().trim().max(240).default(""),
	icon: string().trim().max(20).nullable().optional(),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertSkill_createServerFn_handler = createServerRpc({
	id: "23f420bed836d0605770ff831b1c93f9340c04744425129a155a612b995dce1f",
	name: "upsertSkill",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => upsertSkill.__executeServer(opts));
var upsertSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(skillUpsertSchema).handler(upsertSkill_createServerFn_handler, async ({ context, data }) => {
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
	return { id: (await sql`
      insert into skills (name, percentage, category, description, icon, sort_order)
      values (${data.name}, ${data.percentage}, ${data.category}, ${data.description}, ${icon}, ${data.sortOrder})
      returning id
    `)[0].id };
});
var deleteSkill_createServerFn_handler = createServerRpc({
	id: "de8dbbf154f447c6aeddb309ddf3661745b670f004a4a3b20e2ab2628b11201b",
	name: "deleteSkill",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => deleteSkill.__executeServer(opts));
var deleteSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(deleteSkill_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`delete from skills where id = ${data.id}`;
	return { ok: true };
});
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
var upsertProject_createServerFn_handler = createServerRpc({
	id: "422856277aeca81017f543b2e519f0555300b9f1bb3e18506c7df4a91bba51f4",
	name: "upsertProject",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => upsertProject.__executeServer(opts));
var upsertProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(projectUpsertSchema).handler(upsertProject_createServerFn_handler, async ({ context, data }) => {
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
	return { id: (await sql`
      insert into projects (
        name, description, technologies, github_url, live_url, featured, sort_order
      ) values (
        ${data.name}, ${data.description}, ${techs}, ${data.githubUrl},
        ${data.liveUrl}, ${data.featured}, ${data.sortOrder}
      )
      returning id
    `)[0].id };
});
var deleteProject_createServerFn_handler = createServerRpc({
	id: "baf2018eea8fb8af4e6d7be637c1bdabb595886742dc6700824a28e27fbc2767",
	name: "deleteProject",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => deleteProject.__executeServer(opts));
var deleteProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(deleteProject_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`delete from projects where id = ${data.id}`;
	return { ok: true };
});
var uploadProjectImage_createServerFn_handler = createServerRpc({
	id: "467bea6184279aff60b5d78dc23d0212b2fcf745d72abed87225a436b5ed683f",
	name: "uploadProjectImage",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => uploadProjectImage.__executeServer(opts));
var uploadProjectImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(mediaSchema.extend({ projectId: number().int() })).handler(uploadProjectImage_createServerFn_handler, async ({ context, data }) => {
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
var educationUpsertSchema = object({
	id: number().int().optional(),
	title: string().trim().min(1).max(120),
	institution: string().trim().min(1).max(120),
	period: string().trim().min(1).max(80),
	description: string().trim().min(1).max(800),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertEducation_createServerFn_handler = createServerRpc({
	id: "5a6b4fc6baf9a64f2f0b75a73f877adf41f61895bec5aff2a042cfbabb8ad157",
	name: "upsertEducation",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => upsertEducation.__executeServer(opts));
var upsertEducation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(educationUpsertSchema).handler(upsertEducation_createServerFn_handler, async ({ context, data }) => {
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
	return { id: (await sql`
      insert into education (title, institution, period, description, sort_order)
      values (${data.title}, ${data.institution}, ${data.period}, ${data.description}, ${data.sortOrder})
      returning id
    `)[0].id };
});
var deleteEducation_createServerFn_handler = createServerRpc({
	id: "bf74b33bf29f712e8559d7065027128a0ed86e90122ed6f89ce7425970acd2d7",
	name: "deleteEducation",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => deleteEducation.__executeServer(opts));
var deleteEducation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(deleteEducation_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`delete from education where id = ${data.id}`;
	return { ok: true };
});
var socialSchema = object({
	id: number().int().optional(),
	platform: string().trim().min(1).max(40),
	label: string().trim().min(1).max(40),
	url: string().trim().max(400),
	sortOrder: number().int().min(0).max(999).default(0)
});
var upsertSocial_createServerFn_handler = createServerRpc({
	id: "90506a425a0dee62deb9075de3dd52593dfb2506e982348b057891405b0adecc",
	name: "upsertSocial",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => upsertSocial.__executeServer(opts));
var upsertSocial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(socialSchema).handler(upsertSocial_createServerFn_handler, async ({ context, data }) => {
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
	return { id: (await sql`
      insert into social_links (platform, label, url, sort_order)
      values (${data.platform}, ${data.label}, ${data.url}, ${data.sortOrder})
      returning id
    `)[0].id };
});
var deleteSocial_createServerFn_handler = createServerRpc({
	id: "ee09a9f7f0dc12fca3775be41dbbbdee3942890123bb28e1fdc8326cd1129719",
	name: "deleteSocial",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => deleteSocial.__executeServer(opts));
var deleteSocial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(deleteSocial_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`delete from social_links where id = ${data.id}`;
	return { ok: true };
});
var listMessages_createServerFn_handler = createServerRpc({
	id: "26a661c14ca0097926f82d64e7df8a0042c27370adacce9fcde0841c8b793033",
	name: "listMessages",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMessages_createServerFn_handler, async ({ context }) => {
	await requireOwner(context.userId);
	return (await (await getSql())`
      select id, name, email, message, read, created_at
      from contact_messages
      order by created_at desc
    `).map(mapMessage);
});
var markMessageRead_createServerFn_handler = createServerRpc({
	id: "9a8c0d44d25d5248ecf8e199d02233237039b2147bdbbb5c6aea0f6da162a1f3",
	name: "markMessageRead",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => markMessageRead.__executeServer(opts));
var markMessageRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number().int(),
	read: boolean()
})).handler(markMessageRead_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`update contact_messages set read = ${data.read} where id = ${data.id}`;
	return { ok: true };
});
var deleteMessage_createServerFn_handler = createServerRpc({
	id: "0644d7c6289a38f6fe939d5e08f6da37836804e395f8068b5277b92b72a50d9b",
	name: "deleteMessage",
	filename: "src/lib/portfolio.functions.ts"
}, (opts) => deleteMessage.__executeServer(opts));
var deleteMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number().int() })).handler(deleteMessage_createServerFn_handler, async ({ context, data }) => {
	await requireOwner(context.userId);
	await (await getSql())`delete from contact_messages where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { deleteEducation_createServerFn_handler, deleteMessage_createServerFn_handler, deleteProject_createServerFn_handler, deleteSkill_createServerFn_handler, deleteSocial_createServerFn_handler, getAdminAccess_createServerFn_handler, getPortfolio_createServerFn_handler, listMessages_createServerFn_handler, markMessageRead_createServerFn_handler, submitContact_createServerFn_handler, updateProfile_createServerFn_handler, uploadProfileImage_createServerFn_handler, uploadProjectImage_createServerFn_handler, upsertEducation_createServerFn_handler, upsertProject_createServerFn_handler, upsertSkill_createServerFn_handler, upsertSocial_createServerFn_handler };
