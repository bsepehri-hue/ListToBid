'use client';

import React from 'react';
import Image from 'next/image';
import { storefrontSidebarItems } from '@/lib/navigation';
import { SidebarItem } from '../ui/SidebarItem';
import useBadges from 'hooks/useBadges';

// switched to teal
const DARK_TEAL = '#014d4e'; // standard dark teal

type SidebarProps = {
  userId: string;
};

// Sidebar.tsx
type Badges = Record<string, boolean | number>; // or more specific keys if you know them

export const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
  const { badges, progress }: { badges: Badges; progress: number } = useBadges(userId);

  const keys = Object.keys(badges);

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 p-8 flex flex-col space-y-8"
      style={{ backgroundColor: '#014d4e' }} // dark teal canon
    >
      {/* … */}
      <div className="badge-ladder mt-8 text-white">
        {keys.map((key) => (
          <SidebarItem key={key} name={key} state={badges[key]} />
        ))}
      </div>
    </aside>
  );
};
  className="fixed top-0 left-0 h-screen w-64 p-8 flex flex-col space-y-8"
  style={{ backgroundColor: DARK_TEAL }}
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

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto">
        <h4 className="text-xs uppercase tracking-wide text-gray-300 mb-2">Navigation</h4>
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

      {/* Badge Ladder Sections */}
      <div className="badge-ladder mt-8 text-white">
        {renderBadgeGroup('Core Identity', [
          'identity_verified',
          'services_selected',
          'terms_accepted',
          'domain_secured',
          'business_registered',
          'finance_connected'
        ])}

        {renderBadgeGroup('Branching Path', [
          'storefront_activated',
          'auction_core_activated',
          'auctionlink_connected',
          'auction_timing_configured'
        ])}

        {renderBadgeGroup('Communication', [
          'zoom_connected',
          'messaging_enabled',
          'email_domain_active',
          'notifications_hub_live'
        ])}

        {renderBadgeGroup('Vault', [
          'receipts_vault',
          'policy_copy',
          'business_license',
          'technical_docs',
          'data_files',
          'tax_forms'
        ])}

        {renderBadgeGroup('Support', [
          'support_connected'
        ])}
      </div>
    </aside>
  );
};