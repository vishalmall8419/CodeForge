/* ==========================================================================
   CodeForge Pro — Learning Hub UI animation only (GSAP)
   No DOM business logic, no filtering, no video/course state handling.
   Purely visual entrance and progress-reveal animation.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".app-sidebar", { opacity: 0, x: -16, duration: 0.5 })
    .from(".app-topbar", { opacity: 0, y: -12, duration: 0.5 }, "-=0.3")
    .from(".content-head", { opacity: 0, y: 14, duration: 0.5 }, "-=0.2")
    .from(".lh-tab", { opacity: 0, y: 8, duration: 0.35, stagger: 0.04 }, "-=0.25")
    .from(".lh-featured", { opacity: 0, y: 24, scale: 0.99, duration: 0.7 }, "-=0.15")
    .from(".continue-card", { opacity: 0, y: 18, duration: 0.5, stagger: 0.08 }, "-=0.35")
    .from(".course-card", { opacity: 0, y: 20, duration: 0.5, stagger: 0.07 }, "-=0.3")
    .from(".lh-side-panel", { opacity: 0, y: 20, duration: 0.55 }, "-=0.5");

  /* Progress bars (continue-learning + course cards) fill from zero */
  gsap.utils.toArray(".continue-progress-fill").forEach((bar) => {
    const target = bar.style.width || "0%";
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 0.9, ease: "power2.out", delay: 0.8 });
  });

  /* Circular progress ring stroke draws in */
  gsap.utils.toArray(".lh-ring-fill").forEach((ring) => {
    const length = ring.getTotalLength ? ring.getTotalLength() : 251;
    gsap.fromTo(
      ring,
      { strokeDashoffset: length },
      { strokeDashoffset: ring.getAttribute("data-offset") || 0, duration: 1.1, ease: "power2.out", delay: 1 }
    );
  });

  /* Badge icons pop in */
  gsap.from(".lh-badge", {
    opacity: 0,
    scale: 0.8,
    duration: 0.35,
    stagger: 0.06,
    delay: 1.2,
    ease: "back.out(1.6)",
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
