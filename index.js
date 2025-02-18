
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formTitle = document.getElementById("form-title");
    const errorMessage = document.createElement("p");
    errorMessage.id = "errorMessage";
    document.querySelector(".form-box").appendChild(errorMessage);

    const switchToSignup = document.getElementById("switch-to-signup");
    const switchToLogin = document.getElementById("switch-to-login");

    // Check if user has already signed up
    if (!localStorage.getItem("isSignedUp")) {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        formTitle.textContent = "Sign Up";
    }

    // Switch to Signup Form
    switchToSignup.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        formTitle.textContent = "Sign Up";
        errorMessage.textContent = ""; // Clear error message
    });

    // Switch to Login Form
    switchToLogin.addEventListener("click", function (event) {
        event.preventDefault();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.textContent = "Login";
        errorMessage.textContent = ""; // Clear error message
    });

    // Form Validation & Signup Request
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userName = signupForm.querySelector("input[type='text']").value;
        const password = signupForm.querySelector("input[type='password']").value;

        if (userName === "" || password === "") {
            errorMessage.textContent = "All fields are required!";
        } else if (password.length < 4) {
            errorMessage.textContent = "Password must be at least 4 characters!";
        } else {
            // Send signup request to backend
            fetch("http://localhost:8080/resumebuilder/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: Date.now().toString(), // Unique ID for user (replace with backend logic if needed)
                    username: userName,
                    password: password
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Signup failed! Please try again.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Signup Successful:", data);
                alert("Signup Successful!");

                // Store signup status in localStorage
                localStorage.setItem("isSignedUp", "true");

                signupForm.reset();
                signupForm.style.display = "none";
                loginForm.style.display = "block";
                formTitle.textContent = "Login";
            })
            .catch(error => {
                console.error("Error:", error);
                errorMessage.textContent = "Signup failed. Try again.";
            });
        }
    });

    // Form Validation & Login Request
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userName = loginForm.querySelector("input[type='text']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        if (userName === "" || password === "") {
            errorMessage.textContent = "All fields are required!";
        } else {
            // Send login request to backend
            fetch(`http://localhost:8080/resumebuilder/user/login?username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`, {
                method: "POST"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid username or password.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Login Successful:", data);
                alert("Login Successful!");

                // Redirect to dashboard or another page after login
                window.location.href = "dashboard.html";
            })
            .catch(error => {
                console.error("Error:", error);
                errorMessage.textContent = "Invalid credentials. Please try again.";
            });
        }
    });
});
