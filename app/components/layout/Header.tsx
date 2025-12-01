import React from 'react';
import { Menu } from 'lucide-react'; // Search icon is now handled inside Autocomplete
import { WalletButton } from '../web3/WalletButton';
import { NotificationBell } from '../notifications/NotificationBell';
import SearchAutocomplete from '../search/SearchAutocomplete'; // NEW IMPORT

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between h-16">
      <div className="search-container flex items-center space-x-4 w-full max-w-lg">
        {/* Replace static search bar with dynamic autocomplete component */}
        <SearchAutocomplete /> 
        
        {/* Mobile menu toggle (hidden on desktop) */}
        <button id="menuToggle" className="menu-toggle md:hidden p-2 text-gray-600 hover:text-gray-800 transition">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Action Block: Notification Bell and Wallet Button */}
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <WalletButton />
      </div>
    </header>
  );
};