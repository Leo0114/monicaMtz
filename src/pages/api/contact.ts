import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { CONTACT } from "@/constants/site";

export const prerender = false;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: "Servicio de correo no configurado." }, 500);

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ error: "Datos inválidos." }, 400);

  const { nombre, apellido, correo, telefono, mensaje } = parsed.data;
  const fullName = `${nombre} ${apellido}`;

  const { error } = await new Resend(apiKey).emails.send({
    from: import.meta.env.RESEND_FROM ?? "Web Mónica Martínez <onboarding@resend.dev>",
    to: CONTACT.email,
    replyTo: correo,
    subject: `Nuevo mensaje de ${fullName}`,
    html: `
      <h2>Nuevo mensaje desde el sitio web</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(correo)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space:pre-line">${escapeHtml(mensaje)}</p>
    `,
  });

  if (error) return json({ error: "No se pudo enviar el mensaje." }, 502);
  return json({ ok: true });
};
