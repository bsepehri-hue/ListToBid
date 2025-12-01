'use client';

import React from 'react';
import Image from 'next/image';
import { storefrontSidebarItems } from '@/lib/navigation';
import { SidebarItem } from '../ui/SidebarItem';

// Define the custom dark emerald color
const DARK_EMERALD = '#024c05'; // Background: #024c05

export const Sidebar: React.FC = () => {
  return (
    // Fixed sidebar with dark emerald background and specified padding/spacing
    <aside
      className="fixed top-0 left-0 h-screen w-64 p-8 flex flex-col space-y-8"
      style={{ backgroundColor: DARK_EMERALD }}
    >
      {/* Logo Block */}
      <div className="logo-block h-12 flex-shrink-0">
        {/* Placeholder for the logo image */}
        <div className="relative h-full w-full">
          <Image
            src="/ltblogo.png" // Assume logo is in public folder
            alt="ListToBid Logo"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            className="logo"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col space-y-6">
          {/* Spacing: 24px vertical spacing is handled by the `space-y-6` class, which is 24px (6 * 4px) */}
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
    </aside>
  );
};
