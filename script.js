document.addEventListener("DOMContentLoaded", () => {
  initFAQ();
  initScrollAnimations();
  initSmoothScroll();
  initMobileMenu();
  initFormHandler();
});

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        closeMobileMenu();
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav-links");
  const navLinks = nav?.querySelectorAll("a");
  const body = document.body;

  const setMenuState = (isOpen) => {
    if (toggle) toggle.classList.toggle("active", isOpen);
    if (nav) nav.classList.toggle("active", isOpen);
    if (toggle) toggle.setAttribute("aria-expanded", isOpen);
    body.style.overflow = isOpen ? "hidden" : "";
  };

  const closeMobileMenu = () => setMenuState(false);
  window.closeMobileMenu = closeMobileMenu; // Expose for smooth scroll

  toggle?.addEventListener("click", () => {
    setMenuState(!nav?.classList.contains("active"));
  });

  navLinks?.forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  document.addEventListener("click", (e) => {
    if (
      nav?.classList.contains("active") &&
      !nav.contains(e.target) &&
      !toggle?.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("active"))
      closeMobileMenu();
  });
}

function initFormHandler() {
  const form = document.getElementById("quoteForm");
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = "✓ Demande envoyée avec succès !";
    btn.style.background = "var(--success)";
    btn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.35)";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.boxShadow = "";
      this.reset();
    }, 3000);
  });
}
