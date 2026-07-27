/* ==========================================================================
   CodeForge Pro — Login page UI animation only (GSAP)
   No DOM business logic, no form handling, no validation, no event-driven
   state. Purely visual entrance / ambient animation.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".auth-brand", { opacity: 0, y: -14, duration: 0.6 })
    .from(".auth-visual-img", { opacity: 0, scale: 1.06, duration: 1.1, ease: "power2.out" }, "-=0.4")
    .from(".auth-glass-card", { opacity: 0, y: 24, duration: 0.7 }, "-=0.7")
    .from(".auth-quote", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
    .from(".auth-form-topbar", { opacity: 0, y: -10, duration: 0.5 }, "-=0.9")
    .from(".auth-form-wrap .eyebrow", { opacity: 0, y: 10, duration: 0.5 }, "-=0.5")
    .from(".auth-form-wrap h1", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
    .from(".auth-temper", { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.35")
    .from(".auth-form-sub", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
    .from(".field-group", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.25")
    .from(".field-row-between", { opacity: 0, duration: 0.4 }, "-=0.2")
    .from(".btn-ember-block", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2")
    .from(".auth-divider", { opacity: 0, duration: 0.4 }, "-=0.15")
    .from(".btn-social", { opacity: 0, y: 10, duration: 0.45, stagger: 0.1 }, "-=0.15")
    .from(".auth-footnote", { opacity: 0, duration: 0.4 }, "-=0.1");

  /* Gentle ambient drift on the visual scrim glow — purely decorative */
  gsap.to(".auth-visual-scrim", {
    backgroundPosition: "20px 10px",
    duration: 8,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}
