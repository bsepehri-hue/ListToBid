document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("google-signin-button");
  if (btn) {
    btn.addEventListener("click", function () {
      setTimeout(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(function(result) {
            alert("Signed in as: " + result.user.email);
          })
          .catch(function(error) {
            alert("Sign-in error: " + error.message);
          });
      }, 100); // 100ms delay
    });
  }
});