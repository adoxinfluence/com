/* =========================================
   AdoXInfluence HEADER
   ========================================= */

document.addEventListener("DOMContentLoaded", async function () {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) {
    console.error("Header placeholder not found.");
    return;
  }

  try {
    /* ================================
           LOAD HEADER
        ================================= */

    const response = await fetch("components/header.html");

    if (!response.ok) {
      throw new Error("Header could not be loaded.");
    }

    const headerHTML = await response.text();

    headerPlaceholder.innerHTML = headerHTML;

    /* ================================
           ACTIVE PAGE
        ================================= */

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {
      const linkPage = link.getAttribute("href").split("/").pop();

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });

    /* ================================
   MOBILE MENU
================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navContent = document.querySelector(".nav-content");

    if (menuToggle && navContent) {
      // Navigation link click → menu close
      const mobileLinks = document.querySelectorAll(".nav-links a");

      mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          menuToggle.checked = false;
        });
      });

      // Header ke bahar click → menu close
      document.addEventListener("click", function (event) {
        const header = document.querySelector(".site-header");

        if (!header) return;

        // Agar click header ke andar nahi hua
        if (!header.contains(event.target)) {
          menuToggle.checked = false;
        }
      });
    }

    /* ================================
           HEADER SCROLL
        ================================= */

    const header = document.querySelector(".site-header");

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
      const currentScrollY = window.scrollY;

      if (!header) return;

      // Top of page → always show
      if (currentScrollY <= 20) {
        header.classList.remove("header-hidden");

        lastScrollY = currentScrollY;

        return;
      }

      // Scrolling down → hide
      if (currentScrollY > lastScrollY) {
        header.classList.add("header-hidden");
      }

      // Scrolling up → show
      else if (currentScrollY < lastScrollY) {
        header.classList.remove("header-hidden");
      }

      lastScrollY = currentScrollY;
    });
  } catch (error) {
    console.error("Header loading error:", error);
  }
});
