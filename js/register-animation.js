/* ==========================================================================
   CodeForge Pro — Register page animation (GSAP)
   UI animation + minimal input-adornment interaction only.
   Mirrors the entrance-sequence style used in animations.js / login-animation.js.
   ========================================================================== */

const prefersReducedMotionRegister = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionRegister) {
  /* Auth entrance sequence */
  const registerTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  registerTl
    .from(".auth-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
    .from(".auth-heading", { opacity: 0, y: 22, duration: 0.75 }, "-=0.35")
    .from(".auth-temper", { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.3")
    .from(".auth-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
    .from(".form-group-forge", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.3")
    .from(".form-check-forge", { opacity: 0, y: 10, duration: 0.45 }, "-=0.2")
    .from(".auth-form button[type='submit']", { opacity: 0, y: 12, duration: 0.5 }, "-=0.2")
    .from(".auth-divider", { opacity: 0, duration: 0.4 }, "-=0.15")
    .from(".social-btn-forge", { opacity: 0, y: 10, duration: 0.45, stagger: 0.08 }, "-=0.2")
    .from(".auth-footnote", { opacity: 0, duration: 0.5 }, "-=0.1")
    .from(".auth-perks .eyebrow", { opacity: 0, y: 14, duration: 0.5 }, "-=0.9")
    .from(".perk-card", { opacity: 0, y: 20, duration: 0.55, stagger: 0.08 }, "-=0.35")
    .from(".auth-visual", { opacity: 0, y: 30, scale: 0.97, duration: 0.8, ease: "power3.out" }, "-=0.3")
    .from(".auth-visual .commit-row", { opacity: 0, x: 12, duration: 0.45, stagger: 0.1 }, "-=0.3");
}

/* Password visibility toggle — minimal input-adornment interaction, no form/state logic */
document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-toggle-password");
    const input = document.getElementById(targetId);
    if (!input) return;

    const icon = btn.querySelector("i");
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    btn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    if (icon) {
      icon.classList.toggle("bi-eye", !isHidden);
      icon.classList.toggle("bi-eye-slash", isHidden);
    }
  });
});

/* Password strength meter — visual feedback only, no validation gating or submission logic */
const pwInput = document.getElementById("registerPassword");
const pwBars = document.querySelectorAll("[data-pw-strength] span");
const pwLabel = document.querySelector("[data-pw-strength-label]");

if (pwInput && pwBars.length && pwLabel) {
  const strengthTiers = [
    { className: "", text: "Use 8+ characters, a number, and a symbol" },
    { className: "filled-weak", text: "Weak — try adding numbers or symbols" },
    { className: "filled-fair", text: "Fair — add a symbol for extra strength" },
    { className: "filled-good", text: "Good — almost there" },
    { className: "filled-strong", text: "Strong password" },
  ];

  pwInput.addEventListener("input", () => {
    const value = pwInput.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;

    if (value.length === 0) score = 0;

    pwBars.forEach((bar, i) => {
      bar.className = i < score ? strengthTiers[score].className : "";
    });
    pwLabel.textContent = strengthTiers[score].text;
  });
}
