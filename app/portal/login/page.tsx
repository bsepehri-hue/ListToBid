"use client";

import TopNav from "@/components/ui/TopNav";

export default function MarketplacePage() {
  return (
    <>
      <TopNav />
      <div className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        {/* rest of Marketplace */}
      </div>
    </>
  );
}



import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "@/lib/firebase"; // your firebase init

  const router = useRouter();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Redirect to dashboard once logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/portal/dashboard");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Invalid email or password.");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError("Google sign-in failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">ListToBid Steward Login</h1>

        {error && (
          <div className="mb-4 text-red-600 font-medium">{error}</div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}