'use client';

import React from 'react';
import Image from 'next/image';
import { storefrontSidebarItems } from '@/lib/navigation';
import { SidebarItem } from '../ui/SidebarItem';
import useBadges from '@/hooks/useBadges'; // our Firestore listener hook

// Define the custom dark emerald color token
const DARK_EMERALD = '#024c05'; // Background: #024c05

type SidebarProps = {
  userId: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
  const { badges, progress } = useBadges(userId);

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 p-8 flex flex-col space-y-8"
      style={{ backgroundColor: DARK_EMERALD }}
    >
      {/* Logo Block */}
      <div className="logo-block h-12 flex-shrink-0">
        <div className="relative h-full w-full">
          <Image
            src="/ltblogo.png"
            alt="ListToBid Logo"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            className="logo"
            priority
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-block text-white font-bold">
        Progress: {progress}%
      </div>

      {/* Navigation (static links) */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col space-y-6">
          {storefrontSidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              name={item.name}
              href={item.href}
              Icon={item.icon}
            />
          ))}
        </ul>
      </nav>

      {/* Badge Ladder (dynamic from Firestore) */}
      <div className="badge-ladder mt-8">
        <h4 className="text-sm text-gray-200 mb-2">Onboarding Badges</h4>
        <ul className="space-y-2">
          {Object.entries(badges).map(([badge, state]) => (
            <SidebarItem
              key={badge}
              name={badge}
              href="#"
              Icon={() => <span>•</span>}
              state={state} // pass badge state for color mapping
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};