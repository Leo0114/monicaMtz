import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink, SocialLink } from "@/constants/site";
import SocialIcon from "@/components/shared/SocialIcon";
import { EASE_APPLE, SPRING_SOFT } from "@/lib/motion";

interface MobileMenuProps {
  links: NavLink[];
  socials: SocialLink[];
  currentPath: string;
}

export default function MobileMenu({
  links,
  socials,
  currentPath,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Congela el scroll suave mientras el menú está abierto y cierra con Escape.
  useEffect(() => {
    if (open) window.mmLenis?.stop();
    else window.mmLenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="relative z-60 grid size-10 place-items-center rounded-full border border-line bg-surface/70 transition-transform duration-300 active:scale-90"
      >
        <span className="relative block h-3 w-4.5">
          <motion.span
            className="absolute inset-x-0 top-0 h-px bg-ink"
            animate={
              open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }
            }
            transition={SPRING_SOFT}
          />
          <motion.span
            className="absolute inset-x-0 bottom-0 h-px bg-ink"
            animate={
              open
                ? { bottom: "50%", rotate: -45 }
                : { bottom: "0%", rotate: 0 }
            }
            transition={SPRING_SOFT}
          />
        </span>
      </button>

      {/* Portal: el header usa backdrop-filter, que atraparía un overlay `fixed`. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menú"
                className="fixed inset-0 z-40 flex flex-col justify-between bg-bgColor/95 px-6 pt-28 pb-10 backdrop-blur-2xl"
                initial={{
                  opacity: 0,
                  clipPath: "circle(0% at calc(100% - 44px) 44px)",
                }}
                animate={{
                  opacity: 1,
                  clipPath: "circle(150% at calc(100% - 44px) 44px)",
                }}
                exit={{
                  opacity: 0,
                  clipPath: "circle(0% at calc(100% - 44px) 44px)",
                }}
                transition={{ duration: 0.7, ease: EASE_APPLE }}
              >
                <ul className="flex flex-col gap-1">
                  {links.map(({ label, href, facet }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.07,
                        duration: 0.7,
                        ease: EASE_APPLE,
                      }}
                    >
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={currentPath === href ? "page" : undefined}
                        data-facet={facet}
                        className="flex items-center gap-4 py-1.5 font-serif text-4xl leading-tight text-ink/60 transition-colors active:text-primary aria-[current=page]:text-ink"
                      >
                        <span className="w-5 font-sans text-xs tracking-widest text-primary">
                          0{i + 1}
                        </span>
                        {label}
                        {facet && (
                          <span
                            aria-hidden="true"
                            className="size-2 shrink-0 rounded-full bg-primary"
                          />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="flex flex-col gap-5 border-t border-line pt-6"
                >
                  <p className="text-[0.65rem] tracking-[0.25em] text-muted uppercase">
                    Sígueme
                  </p>
                  <ul className="flex gap-3">
                    {socials.map((s) => (
                      <li key={s.id}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-12 place-items-center rounded-full border border-line text-primary transition-all active:scale-90 active:bg-primary active:text-on-primary"
                        >
                          <SocialIcon id={s.id} className="size-4.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </MotionConfig>
  );
}
