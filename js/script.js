const darkModeBtn = document.getElementById("dark-mode-btn");

// Apply saved theme when page loads
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");

    if(darkModeBtn){
        darkModeBtn.textContent = "☀️";
    }
}

// Toggle dark mode
if(darkModeBtn){

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
        document.body.classList.contains("dark-mode");

        darkModeBtn.textContent =
        isDark ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

}