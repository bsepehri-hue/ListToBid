import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import Link from 'next/link';

// Assuming this is the Storefront Dashboard Home page

const StorefrontCard: React.FC<{ name: string; owner: string }> = ({ name, owner }) => (
  <div className="storefront-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer">
    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-500 mt-1">Owner: {owner}</p>
    <button className="mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm">
        View Dashboard &rarr;
    </button>
  </div>
);

export default function StorefrontDashboardPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Store Owner!</h1>
      
      {/* Storefronts Section */}
      <section className="storefronts">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Your Active Storefronts</h2>
        
        <div className="storefront-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          - {/* Mapping the sample data from the HTML reference */}
- <StorefrontCard name="Emily's Crafts" owner="Emily Peters" />
- <StorefrontCard name="Jumper's Outfits" owner="Oscar Salgado" />
- <StorefrontCard name="Ultimate Pens" owner="Sophia Chen" />
+ {storefronts.map((sf) => (
+   <StorefrontCard key={sf.id} name={sf.name} owner={sf.ownerName} />
+ ))}
          
          {/* Example of a call-to-action */}
          <div className="storefront-card bg-white p-6 rounded-xl shadow-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition duration-300 cursor-pointer">
            <span className="text-4xl text-gray-400 mb-2">+</span>
            <p className="font-semibold text-gray-700">Create New Storefront</p>
          </div>

        </div>
      </section>
    </div>
  );
}
