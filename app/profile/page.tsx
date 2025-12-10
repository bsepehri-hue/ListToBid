import React, { Suspense } from "react";
import Link from "next/link";
import { User, Shield, Briefcase, Calendar, Wallet } from "lucide-react";

import { getProfile } from "@/actions/profile";
import { mockActivity } from "@/lib/mockData/profile";
import { UserProfile } from "@/lib/profile";   // <-- fixed path
import ProfileForm from "@/components/profile/ProfileForm";
import ActivityList from "@/components/profile/ActivityList";
import { shortenAddress } from "@/lib/utils";

// Helper component for the main profile section
const ProfileInfoCard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 space-y-6">
            
            {/* Display Name and Avatar */}
            <div className="flex items-center space-x-4 pb-4 border-b">
                {/* Mock Avatar */}
                <div className="relative w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                    {profile.displayName.charAt(0)}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{profile.displayName}</h1>
                    <p className="text-sm font-mono text-gray-500 mt-1">{shortenAddress(profile.walletAddress, 8)}</p>
                </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 italic border-l-4 border-teal-500 pl-4">"{profile.bio}"</p>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                
                <div className="flex items-center text-sm font-medium text-gray-700">
                    <Wallet className="w-4 h-4 mr-2 text-teal-600" />
                    Wallet: <span className="ml-1 font-mono">{shortenAddress(profile.walletAddress, 4)}</span>
                </div>
                
                <div className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                    Joined: <span className="ml-1">{profile.joinDate.toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2 text-teal-600" />
                    Storefront: 
                    {profile.storefrontId ? (
                        <Link href={`/dashboard/stores/${profile.storefrontId}`} className="ml-1 text-blue-600 hover:underline">
                            View Store #{profile.storefrontId}
                        </Link>
                    ) : (
                        <span className="ml-1 text-red-500">None Linked</span>
                    )}
                </div>
                
                <div className="flex items-center text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 mr-2 text-teal-600" />
                    2FA Status: 
                    <span className={`ml-1 font-semibold ${profile.twoFactorEnabled ? 'text-green-600' : 'text-red-500'}`}>
                        {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Component to handle the async fetching logic and rendering
async function ProfileFetcher() {
    let profile: UserProfile;
    
    try {
        profile = await getUserProfile();
    } catch (e) {
        console.error("Failed to load user profile:", e);
        // Fallback or error state
        return <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">Failed to load profile data.</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Profile Info & Form */}
            <div className="lg:col-span-2 space-y-8">
                <ProfileInfoCard profile={profile} />
                <ProfileForm profile={profile} />
                
                {/* Future Settings Panel (e.g., Email, 2FA toggle) */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center"><Shield className="w-5 h-5 mr-2 text-teal-600" /> Security & Preferences</h3>
                    <p className="mt-2 text-gray-600">Placeholder for toggling email notifications, connecting social accounts, or enabling 2FA.</p>
                </div>
            </div>

            {/* Right Column: Recent Activity */}
            <div className="lg:col-span-1 space-y-8">
                {/* Mock data for activity is safe to use here as we haven't created a server action for it */}
                <ActivityList activities={mockRecentActivity} /> 
            </div>
        </div>
    );
}


export default function UserProfilePage() {
  
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <User className="w-7 h-7 mr-3 text-teal-600" />
          My Profile & Settings
        </h1>
      </div>

      {/* Main Content (Server Fetching) */}
      <Suspense fallback={<ProfileLoadingSkeleton />}>
        <ProfileFetcher />
      </Suspense>

    </div>
  );
}

function ProfileLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 animate-pulse">
            <div className="lg:col-span-2 space-y-8">
                <div className="h-64 bg-gray-200 rounded-xl shadow-lg"></div>
                <div className="h-96 bg-gray-200 rounded-xl shadow-lg"></div>
            </div>
            <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded-xl shadow-lg"></div>
            </div>
        </div>
    );
}