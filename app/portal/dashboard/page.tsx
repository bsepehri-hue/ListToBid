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


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { LayoutDashboard, List, Settings, LogOut } from "lucide-react";

  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/portal/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/portal/login"); // ✅ redirect after logout
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-emerald-700">
            ListToBid
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center px-6 py-3 bg-emerald-800 rounded">
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-emerald-800 rounded">
                  <List className="w-5 h-5 mr-3" />
                  Listings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-6 py-3 hover:bg-emerald-800 rounded">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-6 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, <span className="text-teal-600">{user?.displayName || user?.email}</span>
          </h2>
        </header>
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-xl font-semibold mb-4">Your Dashboard</h3>
          <p className="text-gray-600">
            This is the steward workspace. From here you’ll manage storefronts, auctions, and account settings.
          </p>
        </div>
      </main>
    </div>
  );
}