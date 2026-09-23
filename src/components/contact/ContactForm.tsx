import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { FormField } from "@/components/contact/FormField";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/contactSchema";
import { EASE_APPLE } from "@/lib/motion";

const DEFAULTS: ContactFormValues = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

async function sendContact(values: ContactFormValues) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo enviar el mensaje.");
  }
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULTS,
    mode: "onTouched", // valida en línea al salir del campo, no sólo al enviar
  });
  const [sent, setSent] = useState(false);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await sendContact(values);
      toast.success("Mensaje enviado", { description: "Gracias por escribir. Te responderé muy pronto." });
      reset(DEFAULTS);
      setSent(true);
    } catch (err) {
      toast.error("Algo salió mal", {
        description: err instanceof Error ? err.message : "Inténtalo de nuevo en unos minutos.",
      });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Toaster position="bottom-center" theme="system" richColors closeButton />
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => sent && setSent(false)}
        noValidate
        className="grid gap-x-8 gap-y-8 md:grid-cols-2"
        aria-label="Formulario de contacto"
      >
        <FormField label="Nombre" autoComplete="given-name" error={errors.nombre?.message} {...register("nombre")} />
        <FormField label="Apellido" autoComplete="family-name" error={errors.apellido?.message} {...register("apellido")} />
        <FormField
          label="Correo electrónico"
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.correo?.message}
          {...register("correo")}
        />
        <FormField
          label="Teléfono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
        <FormField
          multiline
          label="Mensaje"
          className="md:col-span-2"
          error={errors.mensaje?.message}
          {...register("mensaje")}
        />

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p className="text-xs leading-relaxed text-muted">
            Tus datos sólo se usarán para responder a tu mensaje.
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-44" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isSubmitting ? "sending" : sent ? "sent" : "idle"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE_APPLE }}
                className="flex items-center gap-2.5"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-3.5 animate-spin rounded-full border border-current border-t-transparent" />
                    Enviando
                  </>
                ) : sent ? (
                  "Enviado ✓"
                ) : (
                  "Enviar mensaje"
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </form>
    </MotionConfig>
  );
}
