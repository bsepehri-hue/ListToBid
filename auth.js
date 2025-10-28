// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6Xz5WvZ7xZKxgZJtJvKZzZzZzZzZzZzZz",
  authDomain: "oakportal-57694.firebaseapp.com",
  projectId: "oakportal-57694",
  storageBucket: "oakportal-57694.appspot.com",
  messagingSenderId: "102420516875",
  appId: "1:102420516875:web:2f3b4a5c6d7e8f9g0h1i2j"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle Google One Tap response
function handleCredentialResponse(response) {
  const credential = GoogleAuthProvider.credential(response.credential);
  signInWithCredential(auth, credential)
    .then((result) => {
      const user = result.user;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("dashboard-section").style.display = "block";
      document.getElementById("user-email").textContent = user.email;
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
    });
}

// Email/password login
document.getElementById("login-button").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("dashboard-section").style.display = "block";
      document.getElementById("user-email").textContent = user.email;
    })
    .catch((error) => {
      document.getElementById("login-error").textContent = "Login failed. Please check your credentials.";
      console.error("Email login error:", error);
    });
});

// Listing form logic
document.getElementById("create-listing-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("listing-title").value;
  const description = document.getElementById("listing-description").value;
  const category = document.getElementById("listing-category").value;
  const echo = document.getElementById("listing-echo").value;
  const glyph = getGlyph(category);
  const timestamp = new Date().toLocaleString();

  const scroll = `
    🪶 Steward: ${auth.currentUser.email}
    ✏️ Echo: ${echo}
    🕰️ Timestamp: ${timestamp}
    🔮 Constellation Glyph: ${glyph}
  `;

  document.getElementById("blessing-scroll").textContent = scroll;
});

// Glyph logic
function getGlyph(category) {
  switch (category.toLowerCase()) {
    case "art": return "🎨";
    case "tech": return "💻";
    case "clothing": return "👕";
    case "books": return "📚";
    default: return "✨";
  }
}

// Google One Tap + Button setup
window.onload = () => {
  const buttonDiv = document.getElementById("buttonDiv");
  const loginBtn = document.getElementById("google-login");

  // One Tap
  if (google.accounts?.id) {
    google.accounts.id.initialize({
      client_id: "102420516875-fd1k2fl0g5gd2gkt5oenbh5lcov6db4o.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    if (buttonDiv) {
      buttonDiv.innerHTML = "";
      google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large"
      });
      google.accounts.id.prompt();
    } else {
      console.warn("One Tap buttonDiv not found.");
    }
  }

  // Manual Google login button
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          document.getElementById("login-section").style.display = "none";
          document.getElementById("dashboard-section").style.display = "block";
          document.getElementById("user-email").textContent = user.email;
        })
        .catch((error) => {
          console.error("Popup login error:", error);
        });
    });
  }
};
