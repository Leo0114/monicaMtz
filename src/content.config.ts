import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { PRODUCT_TYPES } from "@/constants/site";

/**
 * Productos de la tienda. El nombre del archivo es el id: la URL
 * (`/tienda/<id>`) y la clave de las view transitions.
 */
const productos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/productos" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(PRODUCT_TYPES),
      excerpt: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** En MXN. */
      price: z.number().positive(),
      available: z.boolean().default(true),
      order: z.number().int().default(0),
      specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    }),
});

export const collections = { productos };
