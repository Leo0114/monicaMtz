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
}

// Spring críticamente amortiguado: sigue al puntero sin rebotes.
const TILT_SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

/** Portada tipográfica en 3D que se inclina siguiendo el puntero. */
export default function BookCover({ title, author }: BookCoverProps) {
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-[2/3]"
          >
            {/* Lomo */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-6 origin-left -translate-x-full [transform:rotateY(-90deg)] bg-primary-soft"
            />
            {/* Portada */}
            <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-r-lg rounded-l-sm bg-[#2a2719] p-7 text-[#f3e9dd] shadow-[30px_40px_60px_-30px_rgb(0_0_0/0.55)]">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-3 w-px bg-white/10"
              />
              <p className="text-[0.55rem] tracking-[0.4em] uppercase opacity-70">
                Cuentos
              </p>
              <div>
                <svg
                  viewBox="0 0 120 60"
                  className="mb-5 w-16 text-[#c8bd90]"
                  aria-hidden="true"
                >
                  <path
                    d="M4 44c10 6 22-6 32-22S54 2 58 14s-8 36-2 38 10-24 22-34 20-6 22 6 6 26 16 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="font-serif text-4xl leading-[0.95] font-light">
                  {title.split(" ").slice(0, 2).join(" ")}
                  <em className="block text-[#c8bd90]">
                    {title.split(" ").slice(2).join(" ")}
                  </em>
                </h3>
              </div>
              <p className="font-serif text-lg tracking-wide">{author}</p>
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
