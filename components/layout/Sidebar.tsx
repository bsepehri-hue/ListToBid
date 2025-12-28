"use client";

import React from 'react';
import Image from 'next/image';
import { storefrontSidebarItems } from '@/lib/navigation';
import { SidebarItem } from "@/components/ui/SidebarItem";
import useBadges from "@/hooks/useBadges";

const DARK_TEAL = '#014d4e';

type SidebarProps = {
  userId: string;
  sidebarOpen: boolean;   // ⭐ added
};

type BadgeColor = "emerald" | "teal" | "grey" | "amber" | "burgundy" | undefined;
type Badges = Record<string, BadgeColor>;

const Sidebar: React.FC<SidebarProps> = ({ userId, sidebarOpen }) => {
  const { badges, progress } = useBadges(userId) as {
    badges: Badges;
    progress: number;
  };

  const keys = Object.keys(badges);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen flex flex-col space-y-8
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64 p-8" : "w-20 p-4"}
      `}
      style={{ backgroundColor: DARK_TEAL }}
    >
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

      <div className="progress-block text-white font-bold">
        Progress: {progress}%
      </div>

      <nav className="flex-1 overflow-y-auto">
        <h4 className="text-xs uppercase tracking-wide text-gray-300 mb-2">Navigation</h4>
        <ul className="flex flex-col space-y-6">
          {storefrontSidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              name={item.name}
              href={item.href}
              Icon={item.icon}
              collapsed={!sidebarOpen}   // ⭐ added
            />
          ))}
        </ul>
      </nav>

      <div className="badge-ladder mt-8 text-white">
        {keys.map((key) => (
          <SidebarItem
            key={key}
            name={key}
            state={badges[key]}
            collapsed={!sidebarOpen}   // ⭐ added
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;