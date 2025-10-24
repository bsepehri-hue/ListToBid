// Firebase v8 Auth Logic
var firebaseConfig = {
  apiKey: "AIzaSyCTtUnnoNdEA_SE4u3pSbLsehgHC",
  authDomain: "listoid-b3eca.firebaseapp.com",
  projectId: "listoid-b3eca",
  storageBucket: "listoid-b3eca.appspot.com",
  messagingSenderId: "188888888888",
  appId: "1:188888888888:web:8888888888888888"
};
firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("google-signin-button");
  if (btn) {
    btn.addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          alert("Signed in as: " + result.user.email);
        })
        .catch(function(error) {
          alert("Sign-in error: " + error.message);
        });
    });
  }
});