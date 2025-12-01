import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  name: string;
  href: string;
  Icon: LucideIcon;
}

// Define the custom teal highlight color token
const ACTIVE_TEAL = '#00d164'; // Active State: Teal highlight

export const SidebarItem: React.FC<SidebarItemProps> = ({ name, href, Icon }) => {
  const pathname = usePathname();
  // Simplified check for active state (exact match only)
  const isActive = pathname === href; 

  return (
    <li className="w-full">
      <Link
        href={href}
        className={`
          flex items-center space-x-3 w-full py-3 px-4 rounded-lg transition-all duration-150
          ${
            isActive
              ? 'text-white font-bold' // Text color white when active
              : 'text-gray-300 hover:text-white' // Normal text/icon color
          }
          ${
            isActive
              ? 'bg-teal-500' // Placeholder class, overridden by style below
              : 'hover:bg-[#036a07]' // Hover state using a lighter emerald shade
          }
        `}
        style={isActive ? { backgroundColor: ACTIVE_TEAL } : {}} // Apply explicit active color
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`} />
        <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{name}</span>
      </Link>
    </li>
  );
};
