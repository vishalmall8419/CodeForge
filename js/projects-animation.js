/* ==========================================================================
   CodeForge Pro — Projects page animation (GSAP)
   UI animation + minimal filter-chip visual state only.
   Mirrors the entrance-sequence style used in animations.js / dashboard-animation.js.
   ========================================================================== */

const prefersReducedMotionProjects = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionProjects) {
  /* Shell + content entrance sequence */
  const projectsTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  projectsTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".dash-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, "-=0.15")
    .from(".dash-heading", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
    .from(".dash-temper", { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
    .from(".dash-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
    .from(".filter-chip", { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.25")
    .from(".toolbar-right", { opacity: 0, y: 10, duration: 0.4 }, "-=0.3")
    .from(".project-card", { opacity: 0, y: 22, duration: 0.55, stagger: 0.07 }, "-=0.2")
    .from(".load-more-row", { opacity: 0, y: 12, duration: 0.5 }, "-=0.1");

  /* Progress bar fill-in (visual only, values already set in markup) */
  gsap.utils.toArray(".progress-fill").forEach((bar) => {
    const target = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 1, delay: 0.5, ease: "power2.out" });
  });
}

/* Filter chip active state — visual toggle only, does not filter the grid */
const filterChips = document.querySelectorAll(".filter-chip");
filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-selected", "false");
    });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
  });
});
