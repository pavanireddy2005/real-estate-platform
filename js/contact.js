// ===========================
// Dark Mode
// ===========================

const darkModeBtn =
document.getElementById("dark-mode-btn");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    if(darkModeBtn){
        darkModeBtn.textContent = "☀️";
    }

}

if(darkModeBtn){

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const dark =
        document.body.classList.contains("dark-mode");

        darkModeBtn.textContent =
        dark ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

    });

}

// ===========================
// Authentication
// ===========================

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

const welcomeUser =
document.getElementById("welcomeUser");

const authLink =
document.getElementById("authLink");

const logoutLink =
document.getElementById("logoutLink");

const dashboardLink =
document.getElementById("dashboardLink");

if(currentUser){

    if(welcomeUser){
        welcomeUser.textContent =
        `Welcome, ${currentUser.name}`;
    }

    if(authLink){
        authLink.style.display = "none";
    }

    if(logoutLink){
        logoutLink.classList.remove("hidden");
    }

    if(currentUser.role === "buyer"){

        if(dashboardLink){
            dashboardLink.style.display = "none";
        }

    }

}

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        localStorage.removeItem("currentUser");

        window.location.href =
        "login.html";

    });

}

// ===========================
// Contact Form
// ===========================

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        alert(
            "Message sent successfully!"
        );

        contactForm.reset();

    }
);

const hamburger = document.querySelector(".hamburger");

if(hamburger){

    hamburger.addEventListener("click", () => {

        document
        .querySelector(".nav-links")
        .classList.toggle("active");

    });

}