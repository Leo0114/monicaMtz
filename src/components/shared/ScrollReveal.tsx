import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealTransition } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Añade un ligero desenfoque que se "materializa" al aparecer. */
  blur?: boolean;
}

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.9,
  blur = false,
}: ScrollRevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, ...OFFSET[direction], ...(blur && { filter: "blur(8px)" }) }}
        whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={revealTransition(delay, duration)}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
