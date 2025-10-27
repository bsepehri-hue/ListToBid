import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAS-eRT9CKzEvWuBS55Gqzaoa0lB1f_1lg",
  authDomain: "oakportal-57694.firebaseapp.com",
  projectId: "oakportal-57694",
  storageBucket: "oakportal-57694.appspot.com",
  messagingSenderId: "102420516875",
  appId: "1:102420516875:web:b8d86253b30a62e37f370e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Google One Tap credential
function handleCredentialResponse(response) {
  const idToken = response.credential;
  const credential = GoogleAuthProvider.credential(idToken);

  signInWithCredential(auth, credential)
    .then((result) => {
      console.log("User signed in:", result.user);
      document.getElementById("login-section").style.display = "none";
      document.getElementById("dashboard-section").style.display = "flex";
      document.getElementById("steward-name").textContent = result.user.displayName || result.user.email;
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Initialize Google One Tap
setTimeout(() => {
  google.accounts.id.initialize({
    client_id: "102420516875-6jqk32sanhgkpf169fcdoea11voqfr9s.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt();
}, 100);

// Glyph logic
function getGlyph(category) {
  const glyphs = {
    Art: '🎨',
    Tools: '🛠️',
    Books: '📚',
    Clothing: '👕',
    Electronics: '🔌',
    Furniture: '🪑',
    Other: '🌟'
  };
  return glyphs[category] || '🌟';
}

// Unified listing form handler
document.getElementById('create-listing-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('listing-title').value.trim();
  const description = document.getElementById('listing-description').value.trim();
  const category = document.getElementById('listing-category').value.trim();
  const bid = parseFloat(document.getElementById('starting-bid').value);
  const shipping = document.getElementById('shipping-type').value;
  const image = document.getElementById('listing-image').files[0];
  const timestamp = new Date().toISOString();
  const echoId = 'ECHO-' + Date.now();

  if (!title || !description || !category || isNaN(bid) || !shipping) {
    alert('Please fill out all required fields.');
    return;
  }

  const listing = {
    title,
    description,
    category,
    bid,
    shipping,
    imageName: image ? image.name : null,
    timestamp,
    steward: 'Bo Sepehri'
  };

  console.log('Listing created:', listing);
  alert('Listing published! (Placeholder)');

  // Blessing Scroll
  document.getElementById('scroll-title').textContent = title;
  document.getElementById('scroll-category').textContent = category;
  document.getElementById('scroll-timestamp').textContent = timestamp;
  document.getElementById('scroll-echo-id').textContent = echoId;
  document.getElementById('scroll-glyph').textContent = getGlyph(category);
  document.getElementById('blessing-scroll').style.display = 'block';
});