import {
  Store,
  Extension,
  Link,
  ClipboardList,
  Wallet,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export const storefrontSidebarItems = [
  {
    name: "Stores",
    href: "/dashboard/stores",
    icon: Store,
  },
  {
    name: "Add-On Options",
    href: "/dashboard/addons",
    icon: Extension,
  },
  {
    name: "Auction Link (LinkToBid)",
    href: "/dashboard/auction-link",
    icon: Link,
  },
  {
    name: "Orders & Fulfillment",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    name: "Payouts & Earnings",
    href: "/dashboard/payouts",
    icon: Wallet,
  },
  {
    name: "Storefront Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings & Preferences",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Support & Resources",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
];
