import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import type { SocialId } from "@/constants/site";

const ICONS: Record<SocialId, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebookF,
};

interface SocialIconProps {
  id: SocialId;
  className?: string;
}

export default function SocialIcon({ id, className = "" }: SocialIconProps) {
  const Icon = ICONS[id];
  return <Icon className={className} aria-hidden="true" />;
}
