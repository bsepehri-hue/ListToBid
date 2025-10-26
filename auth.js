import { initializeApp } from "firebase/app";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS-eRT9CKzEvWuBS55Gqzaoa0lB1f_1lg",
  authDomain: "oakportal-57694.firebaseapp.com",
  projectId: "oakportal-57694",
  storageBucket: "oakportal-57694.firebasestorage.app",
  messagingSenderId: "102420516875",
  appId: "1:102420516875:web:b8d86253b30a62e37f370e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Google credential
function handleCredentialResponse(response) {
  const idToken = response.credential;
  const credential = GoogleAuthProvider.credential(idToken);

  signInWithCredential(auth, credential)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Delay for mobile stability
setTimeout(() => {
  google.accounts.id.initialize({
    client_id: "102420516875-fd1k2fl0g5gd2gkt5oenbh5lcov6db4o.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt();
}, 100);