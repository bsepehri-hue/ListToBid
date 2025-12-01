import React from 'react';
import { Search, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between h-16">
      <div className="search-container flex items-center space-x-4 w-full max-w-lg">
        <div className="relative flex items-center w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search the marketplace"
            className="search-bar w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
        
        {/* Mobile menu toggle (hidden on desktop) */}
        <button id="menuToggle" className="menu-toggle md:hidden p-2 text-gray-600 hover:text-gray-800 transition">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Wallet Button */}
      {/* This will eventually use Ethers/Wagmi hook */}
      <button className="wallet-btn bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-150 ease-in-out">
        Connect Wallet
      </button>
    </header>
  );
};
