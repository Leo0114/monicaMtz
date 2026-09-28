import { getCollection, type CollectionEntry } from "astro:content";
import { CONTACT, PRODUCT_LINES, SITE, type ProductLine } from "@/constants/site";

export type Product = CollectionEntry<"productos">;

/** Nombres compartidos entre la tarjeta y el detalle para que las view transitions los unan. */
export const transitionNames = (id: string) => ({
  cover: `producto-${id}-cover`,
  title: `producto-${id}-title`,
});

export const getProducts = async (): Promise<Product[]> =>
  (await getCollection("productos")).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, "es"),
  );

/** Líneas con sus productos, en el orden de `PRODUCT_LINES`. Omite las líneas vacías. */
export const groupByLine = (products: Product[]) =>
  PRODUCT_LINES.map((line) => ({
    line,
    products: products.filter((p) => p.data.type === line.id),
  })).filter((group) => group.products.length > 0);

export const getLine = (type: Product["data"]["type"]): ProductLine =>
  PRODUCT_LINES.find((line) => line.id === type)!;

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number) => priceFormatter.format(price);

/** La compra se cierra por WhatsApp: el mensaje ya lleva el producto y su enlace. */
export const whatsappHref = (product: Product, pageUrl: string | URL) => {
  const text = `Hola, me interesa «${product.data.title}» de la tienda de ${SITE.shortName}. ${pageUrl}`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
};
