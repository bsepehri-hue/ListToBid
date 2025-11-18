import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your Firebase config (replace with your actual values from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/welcome');
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/welcome');
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className="parchment p-8">
      <h1 className="text-4xl mb-6">Login to ListToBid</h1>

      {/* Email/Password form */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-emerald ml-4">Login</button>
      </form>

      {/* Google Sign-In button */}
      <div className="mt-6">
        <button onClick={handleGoogleLogin} className="btn-gold">
          Sign in with Google
        </button>
      </div>

      {/* Load Google Identity Services script (optional if using Firebase popup) */}
      <Script src="https://accounts.google.com/gsi/client" async defer />
    </div>
  );
}
