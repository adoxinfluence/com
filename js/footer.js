/* =========================================
   AdoXInfluence FOOTER
   ========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const footerPlaceholder =
        document.getElementById("footer-placeholder");

    if (!footerPlaceholder) {
        console.error("Footer placeholder not found.");
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

        const footerPath =
            isInsidePagesFolder
                ? "../components/footer.html"
                : "components/footer.html";

        /* ================================
           LOAD FOOTER
        ================================= */

        const response =
            await fetch(footerPath);

        if (!response.ok) {
            throw new Error(
                "Footer could not be loaded."
            );
        }

        const footerHTML =
            await response.text();

        footerPlaceholder.innerHTML =
            footerHTML;

    } catch (error) {

        console.error(
            "Footer loading error:",
            error
        );

    }

});