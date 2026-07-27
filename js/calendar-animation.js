/* ==========================================================================
   CodeForge Pro — Calendar UI animation only (GSAP)
   No DOM business logic, no date computation, no navigation handling,
   no state. Purely visual entrance animation.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".app-sidebar", { opacity: 0, x: -16, duration: 0.5 })
    .from(".app-topbar", { opacity: 0, y: -12, duration: 0.5 }, "-=0.3")
    .from(".content-head", { opacity: 0, y: 14, duration: 0.5 }, "-=0.2")
    .from(".cal-toolbar > *", { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.25")
    .from(".cal-legend-item", { opacity: 0, y: 8, duration: 0.35, stagger: 0.04 }, "-=0.2")
    .from(".cal-panel", { opacity: 0, y: 20, duration: 0.55 }, "-=0.15")
    .from(".cal-side-col > *", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.35");

  /* Calendar cells settle in row by row */
  gsap.from(".cal-cell", {
    opacity: 0,
    y: 8,
    duration: 0.35,
    stagger: {
      each: 0.015,
      from: "start",
    },
    delay: 0.5,
    ease: "power2.out",
  });

  /* Event pills pop in slightly after their cell */
  gsap.from(".cal-event-pill", {
    opacity: 0,
    scale: 0.9,
    duration: 0.3,
    stagger: 0.02,
    delay: 0.85,
    ease: "back.out(1.5)",
  });

  /* Agenda rows step in */
  gsap.from(".agenda-row", {
    opacity: 0,
    x: 10,
    duration: 0.4,
    stagger: 0.08,
    delay: 0.9,
    ease: "power2.out",
  });

  /* Sidebar nav links: subtle stagger-in, consistent with dashboard */
  gsap.from(".sidebar-link", {
    opacity: 0,
    x: -8,
    duration: 0.4,
    stagger: 0.03,
    delay: 0.2,
    ease: "power2.out",
  });
}
