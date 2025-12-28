"use client";

import { useRouter } from "next/navigation";

export default function PropertiesHubPage() {
  const router = useRouter();

  const categories = [
    {
      key: "homes",
      title: "Homes for Sale",
      description: "Single‑family homes, condos, townhomes",
      image: "/images/properties/homes.jpg",
    },
    {
      key: "rentals",
      title: "Apartments for Rent",
      description: "Apartments, condos, multi‑unit rentals",
      image: "/images/properties/rentals.jpg",
    },
    {
      key: "rooms",
      title: "Rooms for Rent",
      description: "Private rooms, shared housing",
      image: "/images/properties/rooms.jpg",
    },
    {
      key: "land",
      title: "Land",
      description: "Residential lots, acreage, farmland",
      image: "/images/properties/land.jpg",
    },
    {
      key: "commercial",
      title: "Commercial",
      description: "Retail, office, industrial, mixed‑use",
      image: "/images/properties/commercial.jpg",
    },
    {
      key: "mobile",
      title: "Mobile Homes",
      description: "Manufactured homes, modular homes",
      image: "/images/properties/mobile.jpg",
    },
    {
      key: "vacation",
      title: "Vacation Rentals",
      description: "Short‑term rentals, cabins, beach homes",
      image: "/images/properties/vacation.jpg",
    },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold text-gray-900">Properties</h1>
      <p className="text-gray-700 text-lg max-w-2xl">
        Browse real estate across all major categories — homes, rentals, land, commercial, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            onClick={() => router.push(`/properties/${cat.key}`)}
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-200">
              <img
                src={cat.image}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">{cat.title}</h2>
              <p className="text-gray-600">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}