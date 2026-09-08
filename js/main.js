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