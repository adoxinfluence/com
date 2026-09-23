/* =========================================================
   DAY / NIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("adox-theme");

    if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode");
        document.body.classList.add("light-mode");
    }

    themeToggle.addEventListener("click", () => {

        const isLight =
            document.documentElement.classList.toggle("light-mode");

        document.body.classList.toggle("light-mode", isLight);

        localStorage.setItem(
            "adox-theme",
            isLight ? "light" : "dark"
        );

    });
}




/* =========================================================
   AdoXInfluence — CONNECT FORMS
   Brand + Creator Form Switcher
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const brandTab =
        document.getElementById("brand-tab");

    const creatorTab =
        document.getElementById("creator-tab");

    const brandPanel =
        document.getElementById("brand-form-panel");

    const creatorPanel =
        document.getElementById("creator-form-panel");


    /* =========================================
       CHECK ELEMENTS
    ========================================= */

    if (
        !brandTab ||
        !creatorTab ||
        !brandPanel ||
        !creatorPanel
    ) {
        return;
    }


    /* =========================================
       SWITCH FORM
    ========================================= */

    function showForm(type) {

        const isBrand =
            type === "brand";


        /* ================================
           BUTTON STATE
        ================================= */

        brandTab.classList.toggle(
            "active",
            isBrand
        );

        creatorTab.classList.toggle(
            "active",
            !isBrand
        );


        brandTab.setAttribute(
            "aria-selected",
            isBrand ? "true" : "false"
        );

        creatorTab.setAttribute(
            "aria-selected",
            isBrand ? "false" : "true"
        );


        /* ================================
           PANEL STATE
        ================================= */

        if (isBrand) {

            brandPanel.hidden = false;
            creatorPanel.hidden = true;

            brandPanel.classList.add("active");
            creatorPanel.classList.remove("active");

        } else {

            brandPanel.hidden = true;
            creatorPanel.hidden = false;

            brandPanel.classList.remove("active");
            creatorPanel.classList.add("active");

        }

    }


    /* =========================================
       BRAND TAB
    ========================================= */

    brandTab.addEventListener(
        "click",
        function () {

            showForm("brand");

        }
    );


    /* =========================================
       CREATOR TAB
    ========================================= */

    creatorTab.addEventListener(
        "click",
        function () {

            showForm("creator");

        }
    );


    /* =========================================
       KEYBOARD SUPPORT
    ========================================= */

    brandTab.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {

                event.preventDefault();

                creatorTab.focus();

                showForm("creator");

            }

        }
    );


    creatorTab.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                brandTab.focus();

                showForm("brand");

            }

        }
    );


    /* =========================================
       INITIAL STATE
    ========================================= */

    showForm("brand");

});