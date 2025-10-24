// Firebase v8 Auth Logic
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "bsepehri-hue.github.io",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
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