document.addEventListener("DOMContentLoaded", async () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) {
    console.error("Header placeholder not found.");
    return;
  }

  try {
    const response = await fetch("components/header.html");

    if (!response.ok) {
      throw new Error("header.html could not be loaded.");
    }

    const headerHTML = await response.text();

    headerPlaceholder.innerHTML = headerHTML;

    /* =========================
           MOBILE MENU
        ========================= */

    const menuButton = document.getElementById("mobileMenuToggle");

    const mobileNav = document.getElementById("mobileNav");

    if (menuButton && mobileNav) {
      menuButton.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
      });
    }

    /* =========================
           THEME TOGGLE
        ========================= */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");
      });
    }
  } catch (error) {
    console.error("Header loading error:", error);
  }
});

/* =========================================
   HIDE HEADER ON SCROLL DOWN
   SHOW HEADER ON SCROLL UP
========================================= */

let lastScrollY = window.scrollY;
let ticking = false;

function handleHeaderScroll() {
  const header = document.getElementById("siteHeader");

  if (!header) return;

  const currentScrollY = window.scrollY;

  // Page ke bilkul top par header visible rahega
  if (currentScrollY <= 20) {
    header.classList.remove("header-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  // Scroll DOWN
  if (currentScrollY > lastScrollY) {
    header.classList.add("header-hidden");
  }

  // Scroll UP
  else if (currentScrollY < lastScrollY) {
    header.classList.remove("header-hidden");
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(handleHeaderScroll);
      ticking = true;
    }
  },
  { passive: true },
);

