/* ==========================================================================
   CodeForge Pro — Create Project UI animation only (GSAP)
   No DOM business logic, no form handling, no validation, no state.
   Purely visual entrance animation, matching dashboard-animation.js style.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".app-sidebar", { opacity: 0, x: -16, duration: 0.5 })
    .from(".app-topbar", { opacity: 0, y: -12, duration: 0.5 }, "-=0.3")
    .from(".breadcrumb-forge", { opacity: 0, y: 10, duration: 0.4 }, "-=0.25")
    .from(".content-head", { opacity: 0, y: 14, duration: 0.5 }, "-=0.2")
    .from(".cp-stepper .cp-step", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.25")
    .from(".cp-panel", { opacity: 0, y: 20, duration: 0.55, stagger: 0.12 }, "-=0.2")
    .from(".cp-preview-col", { opacity: 0, y: 20, duration: 0.55 }, "-=0.6");

  /* Sidebar nav links: subtle stagger-in, consistent with dashboard */
  gsap.from(".sidebar-link", {
    opacity: 0,
    x: -8,
    duration: 0.4,
    stagger: 0.03,
    delay: 0.2,
    ease: "power2.out",
  });

  /* Swatch and pill options settle in once their panel is visible */
  gsap.utils.toArray(".cp-swatch-row, .cp-pill-group").forEach((group) => {
    gsap.from(group.children, {
      opacity: 0,
      scale: 0.85,
      duration: 0.35,
      stagger: 0.05,
      delay: 0.7,
      ease: "back.out(1.6)",
    });
  });

  /* Preview card banner: soft gradient shimmer, purely decorative and looped */
  gsap.to(".cp-preview-banner", {
    backgroundPosition: "100% 50%",
    backgroundSize: "200% 200%",
    duration: 6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}
