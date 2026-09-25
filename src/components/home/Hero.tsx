import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { EASE_APPLE } from "@/lib/motion";
import { scrollToSection } from "@/scripts/smooth-scroll";

interface HeroProps {
  name: string;
  motto: string;
  portraitSrc: string;
  faceSrc: string;
  bookHref: string;
}

const WORD_DELAY = 0.12;

/** Cada palabra sube desde una máscara, como tipografía que se "imprime". */
function MaskedWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * WORD_DELAY, ease: EASE_APPLE }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ name, motto, portraitSrc, faceSrc, bookHref }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [first, ...rest] = name.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative isolate flex min-h-dvh items-center overflow-hidden px-4 pt-28 pb-16 md:px-8 md:pt-32"
      >
        {/* Halo ambiental */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 -right-32 -z-10 size-[28rem] rounded-full bg-primary/10 blur-3xl md:size-[40rem]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 -z-10 size-[24rem] rounded-full bg-primary-soft/10 blur-3xl"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-8">
          <motion.div style={{ y: textY, opacity: fade }} className="order-2 flex flex-col gap-7 md:order-1 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_APPLE }}
              className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.3em] text-primary uppercase md:text-xs"
            >
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Pintora · Escritora · Productora · Creadora
            </motion.p>

            <h1 className="font-serif text-[clamp(3.25rem,13vw,7.5rem)] leading-[0.92] font-light tracking-[-0.03em] text-ink">
              <MaskedWords text={first} delay={0.2} className="block" />
              <MaskedWords text={rest.join(" ")} delay={0.35} className="block pl-[0.6em] italic text-primary" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: EASE_APPLE }}
              className="max-w-md text-base leading-relaxed text-muted md:text-lg"
            >
              {motto} Historias honestas, conversaciones que se sienten y una comunidad que crece desde la verdad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: EASE_APPLE }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={bookHref} target="_blank" rel="noopener noreferrer" size="lg" icon={<Arrow />}>
                Conoce el libro
              </Button>
              <Button
                href="#redes"
                variant="outline"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#redes");
                }}
              >
                Sígueme
              </Button>
            </motion.div>
          </motion.div>

          {/* Retrato en arco */}
          <div className="relative order-1 mx-auto w-full max-w-[13.5rem] sm:max-w-[18rem] md:order-2 md:col-span-5 md:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: EASE_APPLE }}
              className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border border-line bg-surface shadow-[0_40px_80px_-40px] shadow-primary/40"
            >
              <motion.img
                src={portraitSrc}
                alt={`Logotipo de ${name}`}
                style={{ y: imageY, scale: imageScale }}
                className="size-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div aria-hidden="true" className="absolute inset-0 rounded-[inherit] ring-1 ring-white/20 ring-inset" />
            </motion.div>

            {/* Sello giratorio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.25, duration: 1, delay: 1.1 }}
              className="absolute -bottom-6 -left-8 grid size-24 place-items-center md:-bottom-8 md:-left-10 md:size-36"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_28s_linear_infinite] text-primary" aria-hidden="true">
                <defs>
                  <path id="hero-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current font-sans text-[8.2px] tracking-[0.32em] uppercase">
                  <textPath href="#hero-circle">Primero ser · después tener ·</textPath>
                </text>
              </svg>
              <span className="grid size-12 place-items-center overflow-hidden rounded-full border border-line bg-bgColor md:size-18">
                <img src={faceSrc} alt="" className="size-full object-cover mix-blend-multiply dark:mix-blend-normal dark:invert" />
              </span>
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          style={{ opacity: fade }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] tracking-[0.35em] text-muted uppercase">Descubre</span>
          <span className="relative h-12 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: EASE_APPLE }}
            />
          </span>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
