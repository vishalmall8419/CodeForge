/* ==========================================================================
   CodeForge Pro — Analytics page animation (GSAP)
   UI animation + minimal range-chip visual state only.
   Mirrors the entrance-sequence style used in animations.js / dashboard-animation.js.
   ========================================================================== */

const prefersReducedMotionAnalytics = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionAnalytics) {
  /* Shell + content entrance sequence */
  const analyticsTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  analyticsTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".dash-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, "-=0.15")
    .from(".dash-heading", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
    .from(".dash-temper", { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
    .from(".dash-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
    .from(".analytics-toolbar > *", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.25")
    .from(".kpi-card", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.2")
    .from(".bar-chart-bar", {
      height: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    }, "-=0.2")
    .from(".donut-chart", { opacity: 0, scale: 0.85, duration: 0.6, ease: "back.out(1.6)" }, "-=0.5")
    .from(".legend-list li", { opacity: 0, x: 10, duration: 0.4, stagger: 0.08 }, "-=0.3")
    .from(".velocity-row", { opacity: 0, y: 12, duration: 0.45, stagger: 0.07 }, "-=0.3")
    .from(".contributor-row", { opacity: 0, y: 12, duration: 0.45, stagger: 0.07 }, "-=0.4");

  /* Velocity progress bar fill-in (visual only, values already set in markup) */
  gsap.utils.toArray(".velocity-row .progress-fill").forEach((bar) => {
    const target = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 1, delay: 0.7, ease: "power2.out" });
  });

  /* KPI number count-up (visual only, reads value already in markup) */
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
        const display = Number.isInteger(end) ? Math.round(counter.val) : counter.val.toFixed(1);
        el.textContent = display + suffix;
      },
    });
  });
} else {
  /* Reduced motion: still set counters to their end state instantly */
  gsap.utils.toArray("[data-count-to]").forEach((el) => {
    const end = el.getAttribute("data-count-to");
    const suffix = el.getAttribute("data-suffix") || "";
    el.textContent = end + suffix;
  });
}

/* Range chip active state — visual toggle only, does not refetch chart data */
const rangeChips = document.querySelectorAll(".filter-chip");
rangeChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    rangeChips.forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-selected", "false");
    });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
  });
});
