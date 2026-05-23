import type { ComponentType, SVGProps } from "react";
import { Globe, Mail, Shield } from "lucide-react";
import {
  SiTryhackme,
  SiHackthebox,
  SiGithub,
  SiX,
  SiMedium,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

export type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export type SocialLink = {
  label: string;
  handle: string;
  url: string;
  icon: IconType;
};

// EDIT these with your real handles / URLs.
export const socialLinks: SocialLink[] = [
  { label: "TryHackMe", handle: "@yourhandle", url: "https://tryhackme.com/p/yourhandle", icon: SiTryhackme as IconType },
  { label: "Hack The Box", handle: "@yourhandle", url: "https://app.hackthebox.com/profile/", icon: SiHackthebox as IconType },
  { label: "KC7 Cyber", handle: "@yourhandle", url: "https://kc7cyber.com/", icon: Shield as unknown as IconType },
  { label: "GitHub", handle: "@yourhandle", url: "https://github.com/yourhandle", icon: SiGithub as IconType },
  { label: "LinkedIn", handle: "/in/yourhandle", url: "https://linkedin.com/in/yourhandle", icon: FaLinkedinIn as IconType },
  { label: "Twitter / X", handle: "@yourhandle", url: "https://x.com/yourhandle", icon: SiX as IconType },
  { label: "Personal Blog", handle: "yoursite.com", url: "https://yoursite.com", icon: Globe as unknown as IconType },
  { label: "Medium", handle: "@yourhandle", url: "https://medium.com/@yourhandle", icon: SiMedium as IconType },
  { label: "Email", handle: "you@domain.com", url: "mailto:you@domain.com", icon: Mail as unknown as IconType },
];
