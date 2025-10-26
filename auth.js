import { initializeApp } from "firebase/app";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

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
    client_id: "102420516875-6jqk32sanhgkpf169fcdoea11voqfr9s.apps.googleusercontent.com", // ✅ Updated client ID
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt();
}, 100);