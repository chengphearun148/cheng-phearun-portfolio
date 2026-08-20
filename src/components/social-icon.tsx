import { Facebook, Github, Globe, Linkedin, Send } from "lucide-react";

export function SocialIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  const p = platform.toLowerCase();
  if (p.includes("git")) return <Github className={className} />;
  if (p.includes("face")) return <Facebook className={className} />;
  if (p.includes("tele")) return <Send className={className} />;
  if (p.includes("linked")) return <Linkedin className={className} />;
  return <Globe className={className} />;
}
