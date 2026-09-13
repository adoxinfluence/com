/* =========================================
   AdoXInfluence HEADER
   ========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const headerPlaceholder =
        document.getElementById("header-placeholder");

    if (!headerPlaceholder) {
        console.error("Header placeholder not found.");
        return;
    }


    try {

        /* ================================
           DETECT PAGE LOCATION
        ================================= */

        const isInsidePagesFolder =
            window.location.pathname
                .split("/")
                .includes("pages");


        const headerPath =
            isInsidePagesFolder
                ? "../components/header.html"
                : "components/header.html";


        /* ================================
           LOAD HEADER
        ================================= */

        const response =
            await fetch(headerPath);


        if (!response.ok) {
            throw new Error(
                "Header could not be loaded."
            );
        }


        const headerHTML =
            await response.text();


        headerPlaceholder.innerHTML =
            headerHTML;


        /* ================================
           ACTIVE PAGE
        ================================= */

        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        if (!currentPage) {
            currentPage = "index.html";
        }


        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        navLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");


            if (!href) return;


            const linkPage =
                href
                    .split("/")
                    .pop();


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


        /* ================================
           MOBILE MENU
        ================================= */

        const menuToggle =
            document.getElementById(
                "menu-toggle"
            );


        const navContent =
            document.querySelector(
                ".nav-content"
            );


        if (
            menuToggle &&
            navContent
        ) {

            const mobileLinks =
                document.querySelectorAll(
                    ".nav-links a, .nav-btn"
                );


            /* Navigation click → close */

            mobileLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            menuToggle.checked =
                                false;

                        }
                    );

                }
            );


            /* Outside click → close */

            document.addEventListener(
                "click",
                function (event) {

                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    if (!header) return;


                    if (
                        !header.contains(
                            event.target
                        )
                    ) {

                        menuToggle.checked =
                            false;

                    }

                }
            );


            /* ESC → close */

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Escape"
                    ) {

                        menuToggle.checked =
                            false;

                    }

                }
            );

        }


        /* ================================
           HEADER SCROLL
        ================================= */

        const header =
            document.querySelector(
                ".site-header"
            );


        if (!header) return;


        let lastScrollY =
            window.scrollY;


        let ticking = false;


        function updateHeader() {

            const currentScrollY =
                window.scrollY;


            /* Top → always visible */

            if (
                currentScrollY <= 20
            ) {

                header.classList.remove(
                    "header-hidden"
                );


                lastScrollY =
                    currentScrollY;


                ticking = false;

                return;
            }


            /* Scroll down → hide */

            if (
                currentScrollY >
                lastScrollY
            ) {

                header.classList.add(
                    "header-hidden"
                );

            }


            /* Scroll up → show */

            else if (
                currentScrollY <
                lastScrollY
            ) {

                header.classList.remove(
                    "header-hidden"
                );

            }


            lastScrollY =
                currentScrollY;


            ticking = false;

        }


        window.addEventListener(
            "scroll",
            function () {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateHeader
                    );

                    ticking = true;

                }

            },
            {
                passive: true
            }
        );


    } catch (error) {

        console.error(
            "Header loading error:",
            error
        );

    }

});