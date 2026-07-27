/* ==========================================================================
   CodeForge Pro — Project details page animation (GSAP)
   UI animation + minimal tab-bar scroll sync only.
   Mirrors the entrance-sequence style used in animations.js / dashboard-animation.js.
   ========================================================================== */

const prefersReducedMotionDetails = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionDetails) {
  /* Shell + header entrance sequence */
  const detailsTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  detailsTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".breadcrumb-forge", { opacity: 0, y: 10, duration: 0.4 }, "-=0.15")
    .from(".project-header", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
    .from(".tab-link", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.25")
    .from(".stat-mini", { opacity: 0, y: 18, duration: 0.5, stagger: 0.08 }, "-=0.2")
    .from(".task-row", { opacity: 0, x: 12, duration: 0.4, stagger: 0.07 }, "-=0.25")
    .from(".activity-console", { opacity: 0, y: 20, scale: 0.98, duration: 0.6 }, "-=0.3")
    .from(".activity-console .commit-row", { opacity: 0, x: 12, duration: 0.4, stagger: 0.08 }, "-=0.3")
    .from(".file-card", { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, "-=0.2");

  /* Progress bar fill-in (visual only, values already set in markup) */
  gsap.utils.toArray(".progress-fill, .console-progress-fill").forEach((bar) => {
    const target = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 1, delay: 0.4, ease: "power2.out" });
  });
}

/* Tab bar scroll sync — highlights the tab matching the section in view.
   Visual state only; every section is always present in the DOM. */
const tabLinks = document.querySelectorAll(".tab-link");
const detailSections = document.querySelectorAll(".detail-section[id]");

if (tabLinks.length && detailSections.length && "IntersectionObserver" in window) {
  const setActiveTab = (id) => {
    tabLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  detailSections.forEach((section) => spy.observe(section));
}
