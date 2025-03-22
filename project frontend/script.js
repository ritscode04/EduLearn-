// 🔹 Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// 🔹 Firebase Configuration (Replace with actual credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Ensure buttons are available before adding event listeners
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-btn")?.addEventListener("click", login);
    document.getElementById("signup-btn")?.addEventListener("click", signUp);
    document.getElementById("google-btn")?.addEventListener("click", googleSignIn);
});

/* ==========================
   🔹 Authentication Functions
========================== */

// 🔹 Sign Up
async function signUp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        document.getElementById("message").innerText = "✅ Account Created!";
    } catch (error) {
        document.getElementById("message").innerText = "❌ " + error.message;
    }
}

// 🔹 Login
async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById("message").innerText = "✅ Logged In!";
        localStorage.setItem("user", email);
        window.location.href = "index.html"; // Redirect to homepage
    } catch (error) {
        document.getElementById("message").innerText = "❌ " + error.message;
    }
}

// 🔹 Google Sign-In
async function googleSignIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        document.getElementById("message").innerText = `✅ Welcome, ${result.user.displayName}!`;
        localStorage.setItem("user", result.user.email);
        window.location.href = "index.html"; // Redirect after login
    } catch (error) {
        document.getElementById("message").innerText = "❌ " + error.message;
    }
}

// 🔹 Logout (Call this function when needed)
async function logout() {
    try {
        await signOut(auth);
        localStorage.removeItem("user");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        alert("❌ Logout Error: " + error.message);
    }
}
