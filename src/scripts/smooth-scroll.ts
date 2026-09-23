import Lenis from "lenis";

declare global {
  interface Window {
    mmLenis?: Lenis;
  }
}

/** Inicializa Lenis una sola vez (persiste entre navegaciones del ClientRouter). */
export function initSmoothScroll() {
  if (window.mmLenis) return window.mmLenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: true,
  });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  window.mmLenis = lenis;
  return lenis;
}

export function scrollToTop() {
  if (window.mmLenis) window.mmLenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Desplaza suavemente hasta un ancla (#id), con Lenis si está activo. */
export function scrollToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (window.mmLenis) window.mmLenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", hash);
}
