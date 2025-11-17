// pages/onboarding.jsx
export default function Onboarding() {
  const options = [
    { label: 'Artifacts', value: 'artifacts' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Offerings', value: 'offerings' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Steward Onboarding</h1>

      <form className="space-y-4">
        <input
          type="text"
          name="store_name"
          placeholder="Store Name"
          className="border p-2 w-full"
        />

        <select name="category" className="border p-2 w-full">
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Store Description"
          className="border p-2 w-full"
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="accepted_oath" />
          <span>I vow to protect cadence</span>
        </label>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Join the Scroll
        </button>
      </form>
    </div>
  );
}
