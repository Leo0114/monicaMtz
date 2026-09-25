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
  /** Si el enlace lleva a una faceta, se tiñe con su color. */
  facet?: FacetId;
}

export const SITE = {
  name: "Mónica Martínez",
  shortName: "Mony Mtz",
  url: "https://www.monymtz.com",
  description:
    "Pintora, escritora, productora y creadora de contenido regiomontana. Autora de «El arte de mentirnos». Si yo puedo, tú también.",
  locale: "es_MX",
} as const;

export type FacetId = "pintora" | "escritora" | "productora" | "creadora";

export interface Facet extends NavLink {
  id: FacetId;
  /** Frase corta que acompaña el nombre en tarjetas y menús. */
  tagline: string;
  /** Color de la barra del navegador (meta theme-color) en modo claro. */
  themeColor: string;
}

/**
 * Las cuatro facetas de la marca. Cada una tiene su propia paleta,
 * definida en `global.css` bajo `[data-facet="<id>"]`.
 */
export const FACETS: Facet[] = [
  {
    id: "pintora",
    label: "Pintora",
    href: "/pintora",
    tagline: "Color, textura y memoria sobre lienzo",
    themeColor: "#fbeee6",
  },
  {
    id: "escritora",
    label: "Escritora",
    href: "/escritora",
    tagline: "Historias honestas que nombran lo que se calla",
    themeColor: "#f8ecef",
  },
  {
    id: "productora",
    label: "Productora",
    href: "/productora",
    tagline: "Del papel a la pantalla, con talento local",
    themeColor: "#ecf0fa",
  },
  {
    id: "creadora",
    label: "Creadora de contenido",
    href: "/creadora-de-contenido",
    tagline: "Programas, conversaciones y comunidad",
    themeColor: "#fbeef6",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Contacto", href: "/contacto" },
];

/** Navegación completa (menú móvil y footer): Inicio, facetas y Contacto. */
export const ALL_LINKS: NavLink[] = [
  NAV_LINKS[0],
  ...FACETS.map(({ id, label, href }) => ({ label, href, facet: id })),
  NAV_LINKS[1],
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

/** Cortometraje «Las mujeres son como la muerte» en YouTube. */
export const FILM_VIDEO_ID = "Qy0zPFOIjic";

export const AGENCY = {
  name: "Optim",
  href: "https://optimmkt.com/",
} as const;
