// ===========================
// Authentication Check
// ===========================

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

// Allow only logged-in sellers

if (
    !currentUser ||
    currentUser.role === "buyer"
) {
    window.location.href =
    "properties.html";
}

// ===========================
// Live Preview
// ===========================

const imageInput =
document.getElementById("image");

const previewImage =
document.getElementById("previewImage");

const titleInput =
document.getElementById("title");

const previewTitle =
document.getElementById("previewTitle");

const locationInput =
document.getElementById("location");

const previewLocation =
document.getElementById("previewLocation");

const priceInput =
document.getElementById("price");

const previewPrice =
document.getElementById("previewPrice");

imageInput.addEventListener("input", () => {

    previewImage.src =
    imageInput.value ||
    "../assets/images/preview.jpeg";

});

titleInput.addEventListener("input", () => {

    previewTitle.textContent =
    titleInput.value ||
    "Property Title";

});

locationInput.addEventListener("input", () => {

    previewLocation.textContent =
    locationInput.value ||
    "Location";

});

priceInput.addEventListener("input", () => {

    previewPrice.textContent =
    priceInput.value
        ? "₹ " + priceInput.value
        : "Price";

});

// ===========================
// Add Property
// ===========================

document
.getElementById("propertyForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    const property = {

        title:
        document.getElementById("title").value,

        type:
        document.getElementById("type").value,

        price:
        "₹" +
        document.getElementById("price").value,

        location:
        document.getElementById("location").value,

        bedrooms:
        document.getElementById("bedrooms").value,

        bathrooms:
        document.getElementById("bathrooms").value,

        area:
        document.getElementById("area").value,

        image:
        document.getElementById("image").value,

        description:
        document.getElementById("description").value,

        phone:
        document.getElementById("phone").value,

        email:
        document.getElementById("email").value

    };

    const properties =
    JSON.parse(
        localStorage.getItem("properties")
    ) || [];

    properties.push(property);

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    window.location.href =
    "properties.html";

});

// ===========================
// Dark Mode
// ===========================

const darkModeBtn =
document.getElementById("dark-mode-btn");

// Apply saved theme

if (
    localStorage.getItem("theme")
    === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

    if(darkModeBtn){
        darkModeBtn.textContent = "☀️";
    }

}

if(darkModeBtn){

    darkModeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            const dark =
            document.body.classList.contains(
                "dark-mode"
            );

            darkModeBtn.textContent =
            dark ? "☀️" : "🌙";

            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );

        }
    );

}

// ===========================
// Welcome User
// ===========================

const welcomeUser =
document.getElementById("welcomeUser");

if (
    currentUser &&
    welcomeUser
) {

    welcomeUser.textContent =
    `Welcome, ${currentUser.name}`;

}

// ===========================
// Login / Logout
// ===========================

const authLink =
document.getElementById("authLink");

const logoutLink =
document.getElementById("logoutLink");

if(currentUser){

    if(authLink){
        authLink.style.display =
        "none";
    }

    if(logoutLink){
        logoutLink.classList.remove(
            "hidden"
        );
    }

}

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        (e) => {

            e.preventDefault();

            localStorage.removeItem(
                "currentUser"
            );

            window.location.href =
            "login.html";

        }
    );

}