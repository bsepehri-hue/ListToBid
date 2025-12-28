"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  name: string;
  href?: string;
  Icon?: LucideIcon | React.ElementType;
  state?: 'grey' | 'teal' | 'emerald' | 'amber' | 'burgundy';
  count?: number; // ⭐ NEW: numeric badge
}

const ACTIVE_TEAL = '#00d164';

const colorMap: Record<string, string> = {
  grey: 'text-gray-400',
  teal: 'text-teal-400',
  emerald: 'text-green-500',
  amber: 'text-yellow-400',
  burgundy: 'text-red-600'
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ name, href, Icon, state, count }) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  // ⭐ Badge ladder items (no href)
  if (!href) {
    return (
      <li className={`flex items-center space-x-3 py-2 px-4 rounded-lg ${colorMap[state || 'grey']}`}>
        {Icon ? <Icon className="w-5 h-5" /> : <span>•</span>}
        <span className="font-medium">{name}</span>
      </li>
    );
  }

  // ⭐ Navigation items (with optional numeric badge)
  return (
    <li className="w-full">
      <Link
        href={href}
        className={`
          flex items-center justify-between w-full py-3 px-4 rounded-lg transition-all duration-150
          ${isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}
          ${isActive ? 'bg-teal-500' : 'hover:bg-[#036a07]'}
        `}
        style={isActive ? { backgroundColor: ACTIVE_TEAL } : {}}
      >
        {/* Left side: icon + label */}
        <div className="flex items-center space-x-3">
          {Icon && (
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`} />
          )}
          <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{name}</span>
        </div>

        {/* ⭐ Right side: numeric badge */}
        {typeof count === "number" && count > 0 && (
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </Link>
    </li>
  );
};