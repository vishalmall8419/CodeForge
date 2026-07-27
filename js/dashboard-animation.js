/* ==========================================================================
   CodeForge Pro — Dashboard app shell animation (GSAP)
   UI animation only. No DOM business logic, no event-driven state,
   no data handling. Mirrors the entrance-sequence style used in
   animations.js / login-animation.js.
   ========================================================================== */

const prefersReducedMotionDash = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionDash) {
  /* Shell entrance sequence */
  const shellTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  shellTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".dash-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, "-=0.15")
    .from(".dash-heading", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
    .from(".dash-temper", { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
    .from(".dash-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
    .from(".kpi-card", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.25")
    .from(".panel-forge", { opacity: 0, y: 22, duration: 0.6, stagger: 0.12 }, "-=0.2")
    .from(".activity-console", { opacity: 0, y: 22, scale: 0.98, duration: 0.65 }, "-=0.55")
    .from(".commit-row", {
      opacity: 0,
      x: 12,
      duration: 0.45,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.3")
    .from(".upcoming-list li", { opacity: 0, x: 10, duration: 0.4, stagger: 0.08 }, "-=0.4")
    .from(".project-row:not(.project-row-head)", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.5");

  /* Progress bar fill-in (visual only, values already set in markup) */
  gsap.utils.toArray(".progress-fill").forEach((bar) => {
    const target = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 1, delay: 0.6, ease: "power2.out" });
  });

  /* KPI number count-up (visual only, no data fetching — reads value already in markup) */
  gsap.utils.toArray("[data-count-to]").forEach((el) => {
    const end = parseFloat(el.getAttribute("data-count-to"));
    const suffix = el.getAttribute("data-suffix") || "";
    const counter = { val: 0 };

    gsap.to(counter, {
      val: end,
      duration: 1.3,
      delay: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(counter.val) + suffix;
      },
    });
  });
} else {
  /* Reduced motion: still fill progress bars / counters to their end state instantly */
  gsap.utils.toArray("[data-count-to]").forEach((el) => {
    const end = el.getAttribute("data-count-to");
    const suffix = el.getAttribute("data-suffix") || "";
    el.textContent = end + suffix;
  });
}
