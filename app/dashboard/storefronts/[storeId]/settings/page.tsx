"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UploadListingImages from "@/components/UploadListingImages";

export default function StorefrontSettingsPage() {
  const { storeId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [banner, setBanner] = useState<string[]>([]);
  const [logo, setLogo] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "storefronts", storeId as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setStore(data);

        setName(data.name || "");
        setDescription(data.description || "");

        setBanner(data.banner ? [data.banner] : []);
        setLogo(data.logo ? [data.logo] : []);
      }

      setLoading(false);
    };

    load();
  }, [storeId]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    const ref = doc(db, "storefronts", storeId as string);

    await updateDoc(ref, {
      name,
      description,
      banner: banner[0] || "",
      logo: logo[0] || "",
      updatedAt: Date.now(),
    });

    router.refresh();
  };

  if (loading) {
    return <p className="text-gray-600">Loading storefront settings…</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Storefront Settings</h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Store Name */}
        <div>
          <label className="font-medium text-gray-700">Store Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Banner */}
        <div>
          <label className="font-medium text-gray-700">Banner</label>

          <UploadListingImages images={banner} setImages={setBanner} />

          {banner.length > 0 && (
            <img
              src={banner[0]}
              className="w-full h-40 object-cover rounded-lg border mt-4"
            />
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="font-medium text-gray-700">Logo</label>

          <UploadListingImages images={logo} setImages={setLogo} />

          {logo.length > 0 && (
            <img
              src={logo[0]}
              className="w-32 h-32 object-cover rounded-full border mt-4"
            />
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}