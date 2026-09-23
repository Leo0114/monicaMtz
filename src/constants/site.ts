export type SocialId = "instagram" | "tiktok" | "youtube" | "facebook";

export interface SocialLink {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const SITE = {
  name: "Mónica Martínez",
  shortName: "Mony Mtz",
  url: "https://www.monymtz.com",
  description:
    "Escritora, creadora de contenido y voz regiomontana. Autora de «El arte de mentirnos». Si yo puedo, tú también.",
  locale: "es_MX",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Contacto", href: "/contacto" },
];

/** Ordenadas por prioridad: Instagram, TikTok, YouTube, Facebook. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@monymtz._",
    href: "https://www.instagram.com/monymtz._/",
    description: "Clips diarios y detrás de cámaras",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@monymtz._",
    href: "https://www.tiktok.com/@monymtz._",
    description: "Clips diarios y contenido corto",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@mony_mtz",
    href: "https://www.youtube.com/@mony_mtz",
    description: "Episodios completos todos los viernes",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Mónica A. Martínez",
    href: "https://www.facebook.com/people/M%C3%B3nica-A-Mart%C3%ADnez/pfbid035EoEr7sgg9sCeqmFd89gYvpm2KFwLsidgvRo1yb5UKS4FSUP5zx5SfusrQtrD6ynl/",
    description: "Clips diarios y comunidad",
  },
];

export const CONTACT = {
  email: "contacto.negocios@optimmkt.com",
  phoneHref: "tel:+528124467284",
} as const;

export const BOOK_URL =
  "https://www.amazon.com.mx/dp/6076963077?ref=cm_sw_r_cso_cp_apin_dp_WTXXK7ATJT7SN7X672BJ&social_share=cm_sw_r_cso_cp_apin_dp_WTXXK7ATJT7SN7X672BJ";

export const AGENCY = {
  name: "Optim",
  href: "https://optimmkt.com/",
} as const;
