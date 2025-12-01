export const SidebarItem: React.FC<SidebarItemProps> = ({ name, href, Icon }) => {
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  name: string;
  href: string;
  Icon: LucideIcon;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ name, href, Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="w-full">
      <Link
        href={href}
        className={`
          flex items-center space-x-3 w-full py-3 px-4 rounded-lg transition-all duration-150
          ${
            isActive
              ? 'bg-[#00d164] text-white font-bold' // Active State: Teal highlight (using a brighter shade for better contrast on dark bg)
              : 'text-gray-300 hover:text-white hover:bg-[#036a07]' // Hover State: white text/icon, slightly lighter background
          }
        `}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`} />
        <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{name}</span>
      </Link>
    </li>
  );
};

