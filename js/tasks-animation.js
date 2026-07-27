/* ==========================================================================
   CodeForge Pro — Tasks UI animation only (GSAP)
   No DOM business logic, no drag/drop handling, no state, no filtering
   behavior. Purely visual entrance and progress-reveal animation.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".app-sidebar", { opacity: 0, x: -16, duration: 0.5 })
    .from(".app-topbar", { opacity: 0, y: -12, duration: 0.5 }, "-=0.3")
    .from(".content-head", { opacity: 0, y: 14, duration: 0.5 }, "-=0.2")
    .from(".tasks-toolbar > *", { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.25")
    .from(".task-col", { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, "-=0.2");

  /* Task cards cascade in per column, staggered by column for a settling effect */
  gsap.utils.toArray(".task-col").forEach((col, colIndex) => {
    gsap.from(col.querySelectorAll(".task-card"), {
      opacity: 0,
      y: 14,
      duration: 0.4,
      stagger: 0.07,
      delay: 0.55 + colIndex * 0.08,
      ease: "power2.out",
    });
  });

  /* Subtask mini progress bars fill in from zero */
  gsap.utils.toArray(".task-mini-fill").forEach((bar) => {
    const target = bar.style.width || "0%";
    gsap.fromTo(
      bar,
      { width: "0%" },
      { width: target, duration: 0.8, ease: "power2.out", delay: 1 }
    );
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
