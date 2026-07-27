/* ==========================================================================
   CodeForge Pro — UI animation only (GSAP)
   No DOM business logic, no event-driven state, no data handling.
   Purely visual entrance/scroll animation per project constraints.
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);

/* Respect reduced-motion preference */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  /* Hero load sequence */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
    .from(".hero-heading", { opacity: 0, y: 22, duration: 0.75 }, "-=0.35")
    .from(".hero-temper", { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.3")
    .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
    .from(".hero-actions", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
    .from(".hero-stats .stat-block", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.3")
    .from(".forge-console", { opacity: 0, y: 30, scale: 0.97, duration: 0.8, ease: "power3.out" }, "-=0.9");

  /* Ambient console rows entrance */
  gsap.from(".commit-row", {
    opacity: 0,
    x: 12,
    duration: 0.5,
    stagger: 0.12,
    delay: 1.1,
    ease: "power2.out",
  });

  /* Temper-line sweep on scroll into view */
  gsap.utils.toArray(".temper-line.on-scroll").forEach((line) => {
    gsap.from(line, {
      scaleX: 0,
      duration: 0.8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
      },
    });
  });

  /* Section heading + copy reveal */
  gsap.utils.toArray(".section-head").forEach((head) => {
    gsap.from(head.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: head,
        start: "top 85%",
      },
    });
  });

  /* Feature / testimonial / pricing card grid reveal */
  gsap.utils.toArray(".reveal-grid").forEach((grid) => {
    gsap.from(grid.children, {
      opacity: 0,
      y: 24,
      duration: 0.55,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 88%",
      },
    });
  });

  /* Process steps reveal */
  gsap.utils.toArray(".process-step").forEach((step, i) => {
    gsap.from(step, {
      opacity: 0,
      y: 18,
      duration: 0.55,
      delay: i * 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step,
        start: "top 88%",
      },
    });
  });

  /* Dashboard preview parallax-in */
  gsap.from(".dash-preview", {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".dash-preview",
      start: "top 85%",
    },
  });

  /* CTA banner glow reveal */
  gsap.from(".cta-banner > *", {
    opacity: 0,
    y: 16,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cta-banner",
      start: "top 88%",
    },
  });
}
