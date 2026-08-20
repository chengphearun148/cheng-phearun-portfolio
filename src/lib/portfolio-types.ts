export type SocialLink = {
  id: number;
  platform: string;
  label: string;
  url: string;
  sortOrder: number;
};

export type Skill = {
  id: number;
  name: string;
  percentage: number;
  category: string;
  description: string;
  icon: string | null;
  sortOrder: number;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageId: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

export type EducationItem = {
  id: number;
  title: string;
  institution: string;
  period: string;
  description: string;
  sortOrder: number;
};

export type SiteProfile = {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  bio: string;
  location: string;
  educationSummary: string;
  interests: string;
  typingPhrases: string[];
  availabilityLabel: string;
  availabilityDetail: string;
  cvUrl: string | null;
  profileImageId: string | null;
  profileImageUrl: string | null;
};

export type PortfolioData = {
  profile: SiteProfile;
  skills: Skill[];
  projects: Project[];
  education: EducationItem[];
  social: SocialLink[];
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type AdminAccess = {
  isOwner: boolean;
  canClaim: boolean;
  userId: string;
};

export function projectImageSrc(project: Pick<Project, "imageId" | "imageUrl">): string | null {
  if (project.imageId) return `/api/media/${project.imageId}`;
  return project.imageUrl;
}

export function profileImageSrc(
  profile: Pick<SiteProfile, "profileImageId" | "profileImageUrl">,
): string | null {
  if (profile.profileImageId) return `/api/media/${profile.profileImageId}`;
  return profile.profileImageUrl || "/profile.jpg";
}
