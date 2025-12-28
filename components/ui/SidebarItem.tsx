"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";

interface SidebarItemProps {
  name: string;
  href?: string;
  Icon?: LucideIcon | React.ElementType;
  state?: 'grey' | 'teal' | 'emerald' | 'amber' | 'burgundy';
  count?: number;
collapsed?: boolean;
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

  // ⭐ Badge ladder items (unchanged)
  if (!href) {
    return (
      <li className={`flex items-center space-x-3 py-2 px-4 rounded-lg ${colorMap[state || 'grey']}`}>
        {Icon ? <Icon className="w-5 h-5" /> : <span>•</span>}
        <span className="font-medium">{name}</span>
      </li>
    );
  }

  // ⭐ Navigation items (with sliding highlight + numeric badge)
  return (
    <li className="relative w-full">

      {/* ⭐ Sliding highlight bar */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-lg"
          style={{ backgroundColor: ACTIVE_TEAL }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <Link
        href={href}
        className={`
          relative flex items-center justify-between w-full py-3 px-4 rounded-lg transition-all duration-150
          ${isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}
        `}
      >
        {/* Left side: icon + label */}
      collapsed?: boolean;

        {/* ⭐ Numeric badge */}
        {typeof count === "number" && count > 0 && (
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </Link>
    </li>
  );
};