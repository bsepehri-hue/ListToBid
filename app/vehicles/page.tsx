"use client";

import { useRouter } from "next/navigation";

export default function VehiclesHubPage() {
  const router = useRouter();

  const categories = [
    {
      key: "cars",
      title: "Cars",
      description: "Sedans, SUVs, coupes, hatchbacks",
      image: "/images/vehicles/cars.jpg",
    },
    {
      key: "trucks",
      title: "Trucks",
      description: "Pickups, work trucks, heavy-duty",
      image: "/images/vehicles/trucks.jpg",
    },
    {
      key: "motorcycles",
      title: "Motorcycles",
      description: "Motorcycles, scooters, ATVs, UTVs",
      image: "/images/vehicles/motorcycles.jpg",
    },
    {
      key: "rvs",
      title: "RVs & Campers",
      description: "Travel trailers, motorhomes, fifth wheels",
      image: "/images/vehicles/rvs.jpg",
    },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold text-gray-900">Vehicles</h1>
      <p className="text-gray-700 text-lg max-w-2xl">
        Browse vehicles across all major categories — cars, trucks, motorcycles, and RVs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            onClick={() => router.push(`/vehicles/${cat.key}`)}
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