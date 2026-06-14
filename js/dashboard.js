// ===========================
// Authentication
// ===========================

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

if(
    !currentUser ||
    currentUser.role !== "seller"
){
    window.location.href =
    "properties.html";
}

// ===========================
// Welcome User
// ===========================

const welcomeUser =
document.getElementById("welcomeUser");

if(welcomeUser){

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

if(authLink){
    authLink.style.display = "none";
}

if(logoutLink){
    logoutLink.classList.remove("hidden");
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
// Properties
// ===========================

let properties =
JSON.parse(localStorage.getItem("properties")) || [];

const propertyCount =
document.getElementById("propertyCount");

const totalValue =
document.getElementById("totalValue");

const container =
document.getElementById("dashboardProperties");

propertyCount.textContent =
properties.length;

// Total Value

let total = 0;

properties.forEach(property => {

    total += Number(
        property.price.replace(/[₹,]/g,"")
    );

});

totalValue.textContent =
"₹" + total.toLocaleString("en-IN");

// ===========================
// Load Properties
// ===========================

function loadProperties(){

    container.innerHTML = "";

    if(properties.length === 0){

        container.innerHTML = `
            <div class="empty-state">
                <h2>No Properties Added Yet</h2>
            </div>
        `;

        return;
    }

    properties.forEach((property,index)=>{

        container.innerHTML += `

        <div class="dashboard-card">

            <img
                src="${property.image}"
                alt="${property.title}"
            >

            <div>

                <h3>${property.title}</h3>

                <p>📍 ${property.location}</p>

                <p>${property.price}</p>

                <div class="dashboard-actions">

                    <button
                        class="delete-btn"
                        onclick="deleteProperty(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ===========================
// Delete Property
// ===========================

function deleteProperty(index){

    properties.splice(index,1);

    localStorage.setItem(
        "properties",
        JSON.stringify(properties)
    );

    loadProperties();

    propertyCount.textContent =
    properties.length;

    let total = 0;

    properties.forEach(property => {

        total += Number(
            property.price.replace(/[₹,]/g,"")
        );

    });

    totalValue.textContent =
    "₹" + total.toLocaleString("en-IN");

}

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

    darkModeBtn.addEventListener("click",()=>{

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

    });

}

loadProperties();