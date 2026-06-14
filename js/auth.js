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
// Redirect if Already Logged In
// ===========================

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

if(
    currentUser &&
    (
        window.location.pathname.includes("login") ||
        window.location.pathname.includes("signup")
    )
){
    window.location.href = "index.html";
}

// ===========================
// Message Area
// ===========================

const authMessage =
document.getElementById("authMessage");

// ===========================
// Signup
// ===========================

const signupForm =
document.getElementById("signupForm");

if(signupForm){

    signupForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name =
        document.getElementById("signupName").value;

        const email =
        document.getElementById("signupEmail").value;

        const password =
        document.getElementById("signupPassword").value;

        const role =
        document.getElementById("role").value;

        let users =
        JSON.parse(localStorage.getItem("users")) || [];

        const existingUser =
        users.find(
            user => user.email === email
        );

        if(existingUser){

            if(authMessage){

                authMessage.textContent =
                "Email already registered!";

            }

            return;
        }

        const user = {
            name,
            email,
            password,
            role
        };

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        window.location.href =
        "login.html";

    });

}

// ===========================
// Login
// ===========================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const email =
        document.getElementById("loginEmail").value;

        const password =
        document.getElementById("loginPassword").value;

        const users =
        JSON.parse(localStorage.getItem("users")) || [];

        const user =
        users.find(
            u =>
            u.email === email &&
            u.password === password
        );

        if(user){

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            window.location.href =
            "index.html";

        }else{

            if(authMessage){

                authMessage.textContent =
                "Invalid email or password!";

            }

        }

    });

}