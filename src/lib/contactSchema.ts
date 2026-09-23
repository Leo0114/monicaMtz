import { z } from "zod";

/** Esquema compartido entre el formulario (cliente) y el endpoint (servidor). */
export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(60),
  apellido: z.string().trim().min(2, "Escribe tu apellido").max(60),
  correo: z.email("Escribe un correo válido").trim().max(120),
  telefono: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{10,20}$/, "Escribe un teléfono válido (10 dígitos)"),
  mensaje: z.string().trim().min(10, "Cuéntame un poco más (mínimo 10 caracteres)").max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
