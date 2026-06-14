const defaultProperties = [
    {
        title: "Luxury Villa",
        type: "Villa",
        location: "Bangalore",
        price: "₹85,00,000",
        image: "../assets/images/villa1.jpeg",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        description: "Luxury villa with swimming pool and garden.",
        phone: "9876543210",
        email: "villa@example.com"
    },
    {
        title: "Modern Apartment",
        type: "Apartment",
        location: "Hyderabad",
        price: "₹45,00,000",
        image: "../assets/images/apartment1.jpeg",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        description: "Modern apartment near IT Hub.",
        phone: "9876543211",
        email: "apartment@example.com"
    },
    {
        title: "Family House",
        type: "House",
        location: "Tirupati",
        price: "₹60,00,000",
        image: "../assets/images/house1.jpeg",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        description: "Spacious family house with parking.",
        phone: "9876543212",
        email: "house@example.com"
    }
];

// Load properties
let properties = JSON.parse(localStorage.getItem("properties"));

if (!properties) {
    properties = defaultProperties;
    localStorage.setItem(
        "properties",
        JSON.stringify(defaultProperties)
    );
}

const container = document.getElementById("propertyContainer");
const propertyCount = document.getElementById("propertyCount");

// Display Properties
function displayProperties(list) {

    container.innerHTML = "";

    propertyCount.textContent =
        `${list.length} Properties Found`;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No Properties Found</h2>
            </div>
        `;
        return;
    }

    list.forEach((property, index) => {

        container.innerHTML += `
        <div class="property-card">

            <img
                src="${property.image}"
                alt="${property.title}"
            >

            <h3>${property.title}</h3>

            <p>📍 ${property.location}</p>

            <p>${property.price}</p>

            <button onclick="showDetails(${index})">
                View Details
            </button>

        </div>
        `;

    });
}

displayProperties(properties);

// Search
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    const filtered = properties.filter(property =>
        property.title.toLowerCase().includes(value) ||
        property.location.toLowerCase().includes(value)
    );

    displayProperties(filtered);

});

// Filter
function filterProperties(type) {

    if (type === "All") {
        displayProperties(properties);
        return;
    }

    const filtered = properties.filter(
        property => property.type === type
    );

    displayProperties(filtered);
}

// Sort
const sortPrice =
document.getElementById("sortPrice");

if(sortPrice){

    sortPrice.addEventListener("change", function () {

        const sorted = [...properties];

        sorted.sort((a, b) => {

            const priceA =
                Number(a.price.replace(/[₹,]/g, ""));

            const priceB =
                Number(b.price.replace(/[₹,]/g, ""));

            return this.value === "low"
                ? priceA - priceB
                : priceB - priceA;
        });

        displayProperties(sorted);

    });

}

// Modal
const modal =
document.getElementById("propertyModal");

const closeBtn =
document.querySelector(".close-btn");

function showDetails(index) {

    const property = properties[index];

    document.getElementById("modalImage").src =
        property.image;

    document.getElementById("modalTitle").textContent =
        property.title;

    document.getElementById("modalType").innerHTML =
        `🏠 <strong>Type:</strong> ${property.type}`;

    document.getElementById("modalLocation").innerHTML =
        `📍 <strong>Location:</strong> ${property.location}`;

    document.getElementById("modalPrice").innerHTML =
        `💰 <strong>Price:</strong> ${property.price}`;

    document.getElementById("modalBedrooms").innerHTML =
        `🛏 <strong>Bedrooms:</strong> ${property.bedrooms || "N/A"}`;

    document.getElementById("modalBathrooms").innerHTML =
        `🛁 <strong>Bathrooms:</strong> ${property.bathrooms || "N/A"}`;

    document.getElementById("modalArea").innerHTML =
        `📐 <strong>Area:</strong> ${property.area || "N/A"} sq.ft`;

    document.getElementById("modalDescription").innerHTML =
        `<strong>Description:</strong> ${property.description || "N/A"}`;

    document.getElementById("modalPhone").innerHTML =
        `📞 <strong>Phone:</strong> ${property.phone || "N/A"}`;

    document.getElementById("modalEmail").innerHTML =
        `📧 <strong>Email:</strong> ${property.email || "N/A"}`;

    modal.style.display = "block";
}

// Close Modal
if(closeBtn){

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});

// Dark Mode
const darkModeBtn =
document.getElementById("dark-mode-btn");

if(darkModeBtn){

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️";
    }

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

// Hamburger
const hamburger =
document.querySelector(".hamburger");

if(hamburger){

    hamburger.addEventListener("click", () => {

        document
            .querySelector(".nav-links")
            .classList.toggle("active");

    });

}

// ===========================
// Authentication UI
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

const addPropertySection =
document.getElementById("addPropertySection");

if(currentUser){

    // Show welcome message
    if(welcomeUser){
        welcomeUser.textContent =
        `Welcome, ${currentUser.name}`;
    }

    // Hide Login button
    if(authLink){
        authLink.style.display = "none";
    }

    // Show Logout button
    if(logoutLink){
        logoutLink.classList.remove("hidden");
    }

    // Buyer restrictions
    if(currentUser.role === "buyer"){

        if(dashboardLink){
            dashboardLink.style.display = "none";
        }

        if(addPropertySection){
            addPropertySection.style.display = "none";
        }

    }

}

// ===========================
// Logout
// ===========================

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