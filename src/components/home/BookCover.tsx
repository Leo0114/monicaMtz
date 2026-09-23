import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";

interface BookCoverProps {
  title: string;
  author: string;
  coverSrc: string;
}

// Spring críticamente amortiguado: sigue al puntero sin rebotes.
const TILT_SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

/** Portada oficial en 3D que se inclina siguiendo el puntero. */
export default function BookCover({ title, author, coverSrc }: BookCoverProps) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-14, 14]),
    TILT_SPRING,
  );
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [10, -10]),
    TILT_SPRING,
  );
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative mx-auto w-full max-w-[17rem] md:max-w-xs"
      >
        <div className="animate-float [perspective:1400px]">
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative aspect-[2/3]"
          >
            {/* Portada */}
            <div className="absolute inset-0 overflow-hidden rounded-r-lg rounded-l-sm bg-[#1a1a1a] shadow-[30px_40px_60px_-30px_rgb(0_0_0/0.55)]">
              <img
                src={coverSrc}
                alt={`Portada del libro «${title}» de ${author}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
              {/* Pliegue del lomo */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/35 via-white/10 to-transparent"
              />
              <motion.div
                aria-hidden="true"
                style={{ left: glareX }}
                className="pointer-events-none absolute -inset-y-10 w-24 -translate-x-1/2 rotate-12 bg-white/10 blur-2xl"
              />
            </div>
          </motion.div>
        </div>
        {/* Sombra de contacto */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-primary/25 blur-xl"
        />
      </div>
    </MotionConfig>
  );
}
