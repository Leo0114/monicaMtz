import type { Transition } from "framer-motion";

/** Curva "apple": arranque decidido, llegada muy suave. */
export const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

/** Spring críticamente amortiguado (sin rebote) — default para UI. */
export const SPRING_SOFT: Transition = { type: "spring", bounce: 0, duration: 0.6 };

/** Spring con un toque de rebote, sólo para interacciones con momentum. */
export const SPRING_PLAYFUL: Transition = { type: "spring", bounce: 0.2, duration: 0.5 };

export const revealTransition = (delay = 0, duration = 0.9): Transition => ({
  duration,
  delay,
  ease: EASE_APPLE,
});
