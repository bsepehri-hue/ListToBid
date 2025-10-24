// Firebase v8 Auth Logic
var firebaseConfig = {
  apiKey: "AIzaSyC1Tundh0nE4_5E3uH3pL5eUchghg",
  authDomain: "listtobid-3ecae.firebaseapp.com",
  projectId: "listtobid-3ecae",
  storageBucket: "listtobid-3ecae.appspot.com",
  messagingSenderId: "188620290063",
  appId: "1:188620290063:web:3e4f9f1e9e2e9e9e9e9e9e"
};
firebase.initializeApp(firebaseConfig);

// Handle redirect result
firebase.auth().getRedirectResult().then(function(result) {
  if (result.user) {
    alert("Signed in as: " + result.user.email);
  }
}).catch(function(error) {
  alert("Redirect error: " + error.message);
});

// Attach click listener
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("google-signin-button");
  if (btn) {
    btn.addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    });
  }
});
