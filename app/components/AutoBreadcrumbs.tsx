"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AutoBreadcrumbs() {
  const pathname = usePathname();

  // Remove query params and split path
  const pathname = usePathname();

if (!pathname) return null;

const segments = pathname
  .split("/")
  .filter(Boolean)
  .slice(1);



  const buildHref = (index: number) => {
    return "/dashboard/" + segments.slice(0, index + 1).join("/");
  };

  if (segments.length === 0) {
    return (
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Dashboard
      </div>
    );
  }

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
      <Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-gray-100">
        Dashboard
      </Link>

      {segments.map((seg, i) => {
        const href = buildHref(i);
        const label = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={href} className="flex items-center space-x-2">
            <span>/</span>
            <Link
              href={href}
              className="hover:text-gray-900 dark:hover:text-gray-100"
            >
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
