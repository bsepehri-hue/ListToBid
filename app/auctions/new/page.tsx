"use client";

import { useState, useRef, FormEvent } from "react";

interface SubmittedData {
  title: string;
  category: string;
  description: string;
  blessing?: string;
  stewardName: string;
  stewardEmail: string;
  reserveAmount?: number;
  imageUrl: string;
  timestamp: string;
  status: string;
}

export default function NewAuctionPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmImageUrl, setConfirmImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Seal Testimony");

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImageToStorage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result && typeof ev.target.result === "string") {
        setPreviewUrl(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadJson = () => {
    if (!submittedData) return;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(submittedData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `offering_${submittedData.title.replace(/\s+/g, "_").toLowerCase()}.json`
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setButtonText("Uploading Image...");

    const formData = new FormData(formRef.current);
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToStorage(imageFile);
    }

    setButtonText("Sealing Testimony...");

    const data: SubmittedData = {
      title: String(formData.get("title") || ""),
      category: String(formData.get("category") || ""),
      description: String(formData.get("description") || ""),
      blessing: String(formData.get("blessing") || "") || undefined,
      stewardName: String(formData.get("stewardName") || ""),
      stewardEmail: String(formData.get("stewardEmail") || ""),
      reserveAmount: formData.get("reserveAmount")
        ? Number(formData.get("reserveAmount"))
        : undefined,
      imageUrl,
      timestamp: new Date().toISOString(),
      status: "Pending",
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === "string") {
          setConfirmImageUrl(ev.target.result);
        }
      };
      reader.readAsDataURL(imageFile);
    }

    setSubmittedData(data);
    setShowConfirmation(true);
    setIsSubmitting(false);
    setButtonText("Seal Testimony");
  };

  const resetFormView = () => {
    setShowConfirmation(false);
    setSubmittedData(null);
    setPreviewUrl(null);
    setConfirmImageUrl(null);
    if (formRef.current) formRef.current.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white text-gray-700">
      <div className="container mx-auto p-4 md:p-8">
        {!showConfirmation && (
          <div
            id="formContainer"
            className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <header className="text-center mb-8 relative">
              <h1 className="text-3xl font-bold text-gray-700">
                Submit Your Offering
              </h1>
              <p className="text-sm text-gray-700 opacity-80 mt-2">
                Your contribution starts here.
              </p>
            </header>

            <form id="offeringForm" ref={formRef} onSubmit={handleSubmit}>
              {/* Title + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-base font-medium mb-2"
                  >
                    Offering Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-base font-medium mb-2"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a category...
                    </option>

                    <option value="Auto (Cars & Sedans)">Auto (Cars & Sedans)</option>
                    <option value="Trucks (Pickups & Work Trucks)">Trucks (Pickups & Work Trucks)</option>
                    <option value="Motorcycles & Powersports">Motorcycles & Powersports</option>
                    <option value="RVs & Campers">RVs & Campers</option>
                    <option value="Properties (Real Estate)">Properties (Real Estate)</option>

                    <option value="Art & Collectibles">Art & Collectibles</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Instruments & Audio">Instruments & Audio</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys, Games & Hobbies">Toys, Games & Hobbies</option>
                    <option value="Sacred & Cultural Items">Sacred & Cultural Items</option>
                    <option value="Rare & Unique Finds">Rare & Unique Finds</option>

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-base font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                />
              </div>

              {/* Blessing */}
              <div className="mb-6">
                <label
                  htmlFor="blessing"
                  className="block text-base font-medium mb-2"
                >
                  Blessing / Echo{" "}
                  <span className="opacity-80 text-sm">(Optional)</span>
                </label>
                <textarea
                  id="blessing"
                  name="blessing"
                  rows={2}
                  className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Steward Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="stewardName"
                    className="block text-base font-medium mb-2"
                  >
                    Steward Name
                  </label>
                  <input
                    type="text"
                    id="stewardName"
                    name="stewardName"
                    className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stewardEmail"
                    className="block text-base font-medium mb-2"
                  >
                    Steward Email
                  </label>
                  <input
                    type="email"
                    id="stewardEmail"
                    name="stewardEmail"
                    className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
              </div>

              {/* Reserve Amount */}
              <div className="mb-6">
                <label
                  htmlFor="reserveAmount"
                  className="block text-base font-medium mb-2"
                >
                  Reserve Amount{" "}
                  <span className="opacity-80 text-sm">(Optional)</span>
                </label>
                <input
                  type="number"
                  id="reserveAmount"
                  name="reserveAmount"
                  min="0"
                  step="0.01"
                  className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label
                  htmlFor="imageUpload"
                  className="block text-base font-medium mb-2"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="w-full p-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  required
                />
              </div>

              {previewUrl && (
                <div className="mb-6">
                  <img
                    src={previewUrl}
                    alt="Preview will appear here"
                    className="w-full h-64 object-cover rounded-md border border-teal-300 shadow-md"
                  />
                </div>
              )}

              <button
                type="submit"
                id="sealBtn"
                disabled={isSubmitting}
                className="w-full bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition duration-300 ease-in-out font-bold text-lg disabled:bg-gray-400"
              >
                <span>{buttonText}</span>
              </button>
            </form>
          </div>
        )}

        {/* Confirmation Panel */}
        {showConfirmation && submittedData && (
          <section
            id="confirmationPanel"
            className="max-w-3xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold text-[#047857] mb-4 text-center">
              Testimony Received
            </h2>
            <p className="text-lg mb-6 text-center text-sm text-gray-700 opacity-80">
              Your offering has been sealed and affirmed.
            </p>

            {confirmImageUrl && (
              <img
                id="confirmImage"
                src={confirmImageUrl}
                alt="Submitted Offering Image"
                className="w-full h-64 object-cover rounded-md border border-teal-300 shadow-md mb-6"
              />
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Title:
                  </strong>
                  <span className="text-base text-gray-700">
                    {submittedData.title}
                  </span>
                </div>

                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Category:
                  </strong>
                  <span className="text-base text-gray-700">
                    {submittedData.category}
                  </span>
                </div>

                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Steward:
                  </strong>
                  <span className="text-base text-gray-700">
                    {submittedData.stewardName}
                  </span>
                </div>

                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Email:
                  </strong>
                  <span className="text-base text-gray-700">
                    {submittedData.stewardEmail}
                  </span>
                </div>
              </div>

              <div>
                <strong className="block text-base font-medium text-gray-500">
                  Description:
                </strong>
                <p className="text-sm text-gray-700 opacity-80">
                  {submittedData.description}
                </p>
              </div>

              {submittedData.blessing && (
                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Blessing / Echo:
                  </strong>
                  <blockquote className="border-l-4 border-teal-300 pl-4 italic text-sm text-gray-700 opacity-80">
                    {submittedData.blessing}
                  </blockquote>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                id="downloadJsonBtn"
                onClick={handleDownloadJson}
                className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition"
              >
                Download JSON
              </button>

              <button
                id="printBtn"
                onClick={handlePrint}
                className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition"
              >
                Print Testimony
              </button>

              <button
                id="sealAnotherBtn"
                onClick={resetFormView}
                className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition"
              >
                Seal Another Testimony
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="w-full bg-[#f5f5f5] p-5 mt-10 text-center text-sm text-[#555]">
          <a
            href="https://listtobid.com/terms-%26-conditions"
            className="text-[#008080] mx-2"
            target="_blank"
            rel="noreferrer"
          >
            Terms & Conditions
          </a>
          <a
            href="https://listtobid.com/privacy-policy"
            className="text-[#008080] mx-2"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href="mailto:support@listtobid.com"
            className="text-[#008080] mx-2"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}