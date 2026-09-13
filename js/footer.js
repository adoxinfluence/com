document.addEventListener("DOMContentLoaded", async function () {

    const footerPlaceholder =
        document.getElementById("footer-placeholder");

    if (!footerPlaceholder) return;

    try {

        const response =
            await fetch("components/footer.html");

        if (!response.ok) {
            throw new Error("Footer could not be loaded.");
        }

        const footerHTML =
            await response.text();

        footerPlaceholder.innerHTML = footerHTML;

    } catch (error) {

        console.error(
            "Footer loading error:",
            error
        );

    }

});