"use client";

import { useState, useRef, FormEvent } from "react";

type SubmittedData = {
  title: string;
  category: string;
  description: string;
  blessing?: string;
  stewardName: string;
  stewardEmail: string;
  imageUrl?: string;
  timestamp: string;
  status: string;
};

export default function NewAuctionPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmImageUrl, setConfirmImageUrl] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Seal This Testimony");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // TODO: When you have Firebase client & Storage wired,
  // replace this placeholder with real upload logic.
  async function uploadImageToStorage(file: File): Promise<string> {
    // Example shape (once Firebase is ready):
    //
    // const storage = getStorage(app);
    // const storageRef = ref(storage, `offerings/${crypto.randomUUID()}`);
    // await uploadBytes(storageRef, file);
    // const downloadUrl = await getDownloadURL(storageRef);
    // return downloadUrl;
    //
    // For now, we just return an empty string to keep the flow working.
    return "";
  }

  const handleImageChange = () => {
    const file = fileInputRef.current?.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const resetFormView = () => {
    setShowConfirmation(false);
    setSubmittedData(null);
    setConfirmImageUrl(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);

    if (formRef.current) {
      formRef.current.reset();
    }

    setIsSubmitting(false);
    setButtonText("Seal This Testimony");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setButtonText("Uploading Image...");

    const formData = new FormData(formRef.current);
    const imageFile = formData.get("image") as File | null;

    try {
      let imageUrl = "";
      if (imageFile) {
        // Placeholder: once Firebase is ready, this will upload & return a URL.
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
        imageUrl,
        timestamp: new Date().toISOString(),
        status: "Pending",
      };

      // TODO: When Firestore is wired, send `data` to your collection here.
      // e.g. await addDoc(collection(db, "auctions"), data);

      // Local confirmation image preview
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result && typeof ev.target.result === "string") {
            setConfirmImageUrl(ev.target.result);
          }
        };
        reader.readAsDataURL(imageFile);
      } else {
        setConfirmImageUrl(null);
      }

      setSubmittedData(data);
      setShowConfirmation(true);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert(
        `An error occurred: ${
          error?.message || "Unknown error"
        }. Please try again.`
      );
      setIsSubmitting(false);
      setButtonText("Seal This Testimony");
    }
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
                    <option value="Art & Imagery">Art & Imagery</option>
                    <option value="Scrolls & Writings">
                      Scrolls & Writings
                    </option>
                    <option value="Wearables & Apparel">
                      Wearables & Apparel
                    </option>
                    <option value="Tools & Objects">Tools & Objects</option>
                    <option value="Tokens & Keepsakes">
                      Tokens & Keepsakes
                    </option>
                  </select>
                </div>
              </div>

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

              <div className="mb-6">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview will appear here"
                    className="w-full h-64 object-cover rounded-md border border-teal-300 shadow-md"
                  />
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="affirmationTerms" className="flex items-start">
                  <input
                    id="affirmationTerms"
                    name="affirmationTerms"
                    type="checkbox"
                    className="h-5 w-5 mt-1 text-[#047857] border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                  <span className="ml-3 text-sm text-gray-700 opacity-80">
                    I agree to the{" "}
                    <a
                      href="https://listtobid.com/terms-%26-conditions"
                      className="text-[#047857] underline hover:text-[#065F46]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms & Conditions
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                id="sealBtn"
                disabled={isSubmitting}
                className="w-full bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition duration-300 ease-in-out font-bold text-lg disabled:bg-gray-400"
              >
                <span id="buttonText">{buttonText}</span>
              </button>
            </form>
          </div>
        )}

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
                  <span
                    id="confirmTitle"
                    className="text-base text-gray-700"
                  >
                    {submittedData.title}
                  </span>
                </div>
                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Category:
                  </strong>
                  <span
                    id="confirmCategory"
                    className="text-base text-gray-700"
                  >
                    {submittedData.category}
                  </span>
                </div>
                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Steward:
                  </strong>
                  <span
                    id="confirmStewardName"
                    className="text-base text-gray-700"
                  >
                    {submittedData.stewardName}
                  </span>
                </div>
                <div>
                  <strong className="block text-base font-medium text-gray-500">
                    Email:
                  </strong>
                  <span
                    id="confirmStewardEmail"
                    className="text-base text-gray-700"
                  >
                    {submittedData.stewardEmail}
                  </span>
                </div>
              </div>

              <div>
                <strong className="block text-base font-medium text-gray-500">
                  Description:
                </strong>
                <p
                  id="confirmDescription"
                  className="text-sm text-gray-700 opacity-80"
                >
                  {submittedData.description}
                </p>
              </div>

              {submittedData.blessing && (
                <div id="confirmBlessingContainer">
                  <strong className="block text-base font-medium text-gray-500">
                    Blessing / Echo:
                  </strong>
                  <blockquote
                    id="confirmBlessing"
                    className="border-l-4 border-teal-300 pl-4 italic text-sm text-gray-700 opacity-80"
                  >
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

        {/* Footer links (kept minimal; your global layout can own the true footer) */}
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