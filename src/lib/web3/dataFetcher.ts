Build Error

Module not found: Can't resolve '@/lib/web3/dataFetcher'

./app/marketplace/page.tsx (5:1)

Module not found: Can't resolve '@/lib/web3/dataFetcher'
  3 | import { LayoutGrid, AlertTriangle, Gavel } from "lucide-react";
  4 | import { StorefrontCard } from "@/components/storefront/StorefrontCard";
> 5 | import { fetchAllStorefronts, StorefrontData } from "@/lib/web3/dataFetcher";
    | ^
  6 | import { StewardLinks } from "./StewardLinks"; // separate client component
  7 |
  8 | // Server Component: main marketplace page

https://nextjs.org/docs/messages/module-not-found
1