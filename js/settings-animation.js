/* ==========================================================================
   CodeForge Pro — Workspace settings page animation (GSAP)
   UI animation + minimal tab-bar scroll sync and logo preview only.
   Mirrors the entrance-sequence style used in animations.js / profile-animation.js.
   ========================================================================== */

const prefersReducedMotionSettings = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionSettings) {
  /* Shell + heading entrance sequence */
  const settingsTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  settingsTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".breadcrumb-forge", { opacity: 0, y: 10, duration: 0.4 }, "-=0.15")
    .from(".dash-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, "-=0.1")
    .from(".dash-heading", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
    .from(".dash-temper", { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
    .from(".dash-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
    .from(".tab-link", { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.2")
    .from(".detail-section", { opacity: 0, y: 20, duration: 0.55, stagger: 0.1 }, "-=0.2");

  /* Usage / billing progress bars fill-in (visual only, values already set in markup) */
  gsap.utils.toArray(".usage-card .progress-fill").forEach((bar) => {
    const target = bar.style.width;
    gsap.fromTo(bar, { width: "0%" }, { width: target, duration: 1, delay: 0.6, ease: "power2.out" });
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

/* Workspace logo preview — reads the chosen file only to render a local
   preview thumbnail; no upload or data handling. */
const logoInput = document.getElementById("logoUpload");
const logoDisplay = document.querySelector(".workspace-logo");

if (logoInput && logoDisplay) {
  logoInput.addEventListener("change", () => {
    const file = logoInput.files && logoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      logoDisplay.style.backgroundImage = `url(${reader.result})`;
      logoDisplay.style.backgroundSize = "cover";
      logoDisplay.style.backgroundPosition = "center";
      const icon = logoDisplay.querySelector("i");
      if (icon) icon.remove();
    };
    reader.readAsDataURL(file);
  });
}
