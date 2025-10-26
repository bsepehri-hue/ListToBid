// Firebase v8 Auth Logic
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function handleCredentialResponse(response) {
  const idToken = response.credential;
  // Send this token to your backend or use it to verify the user
  console.log("ID Token:", 102420516875-s448p6eana7t6k9uo2f3poi5mpq5if2t.apps.googleusercontent.com);
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYKumffrnbNU_4F3ItEU3aHLe8UuGhbg",
  authDomain: "listtobid-9ede2.firebaseapp.com",
  projectId: "listtobid-9ede2",
  storageBucket: "listtobid-9ede2.firebasestorage.app",
  messagingSenderId: "482806996303",
  appId: "1:482806996303:web:2f9cbc2f5332b4a936f93a"
};
google.accounts.id.initialize({
  client_id: "102420516875-en87nbg7648ekfi7jsca3knuopst9c7l.apps.googleusercontent.com",
  callback: handleCredentialResponse
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("google-signin-button");
  var statusBox = document.getElementById("auth-status");

  if (btn && statusBox) {
    btn.addEventListener("click", function () {
      statusBox.textContent = "Sign-in button clicked";
      setTimeout(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(function(result) {
            statusBox.textContent = "Signed in as: " + result.user.email;
          })
          .catch(function(error) {
            statusBox.textContent = "Sign-in error: " + error.message;
          });
      }, 100); // Delay for mobile stability
    });
  }
});