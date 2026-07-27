/* ==========================================================================
   CodeForge Pro — Profile page animation (GSAP)
   UI animation + minimal tab-bar scroll sync and character counter only.
   Mirrors the entrance-sequence style used in animations.js / project-details-animation.js.
   ========================================================================== */

const prefersReducedMotionProfile = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotionProfile) {
  /* Shell + header entrance sequence */
  const profileTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  profileTl
    .from(".sidebar-forge", { opacity: 0, x: -16, duration: 0.5 })
    .from(".topbar-forge", { opacity: 0, y: -12, duration: 0.5 }, "-=0.25")
    .from(".breadcrumb-forge", { opacity: 0, y: 10, duration: 0.4 }, "-=0.15")
    .from(".profile-avatar-wrap", { opacity: 0, scale: 0.85, duration: 0.5, ease: "back.out(1.6)" }, "-=0.15")
    .from(".profile-header-info > *", { opacity: 0, y: 12, duration: 0.45, stagger: 0.08 }, "-=0.3")
    .from(".tab-link", { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.2")
    .from(".detail-section", { opacity: 0, y: 20, duration: 0.55, stagger: 0.1 }, "-=0.2");
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

/* Character counter — visual feedback only, no submission logic */
document.querySelectorAll("[data-char-count-for]").forEach((counter) => {
  const fieldId = counter.getAttribute("data-char-count-for");
  const field = document.getElementById(fieldId);
  if (!field) return;

  const max = field.getAttribute("maxlength") || "";
  const update = () => {
    counter.textContent = `${field.value.length}${max ? " / " + max : ""}`;
  };

  update();
  field.addEventListener("input", update);
});

/* Avatar upload preview — reads the chosen file only to render a local
   preview thumbnail; no upload or data handling. */
const avatarInput = document.getElementById("avatarUpload");
const avatarDisplay = document.querySelector(".profile-avatar-wrap .avatar-forge.xl");

if (avatarInput && avatarDisplay) {
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files && avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarDisplay.style.backgroundImage = `url(${reader.result})`;
      avatarDisplay.style.backgroundSize = "cover";
      avatarDisplay.style.backgroundPosition = "center";
      avatarDisplay.textContent = "";
    };
    reader.readAsDataURL(file);
  });
}
