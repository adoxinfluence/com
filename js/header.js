document.addEventListener("DOMContentLoaded", async () => {

    const headerPlaceholder =
        document.getElementById("header-placeholder");

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

        const menuButton =
            document.getElementById("mobileMenuToggle");

        const mobileNav =
            document.getElementById("mobileNav");

        if (menuButton && mobileNav) {

            menuButton.addEventListener("click", () => {

                const isOpen =
                    mobileNav.classList.toggle("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            });

        }


        /* =========================
           THEME TOGGLE
        ========================= */

        const themeToggle =
            document.getElementById("themeToggle");

        if (themeToggle) {

            themeToggle.addEventListener("click", () => {

                document.documentElement.classList.toggle(
                    "dark-mode"
                );

            });

        }

    } catch (error) {

        console.error(
            "Header loading error:",
            error
        );

    }

});