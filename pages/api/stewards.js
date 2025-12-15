import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "stewards.json");

  if (req.method === "GET") {
    // Return all stewards
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const stewards = raw ? JSON.parse(raw) : [];
      return res.status(200).json(stewards);
    }
    return res.status(200).json([]);
  }

  if (req.method === "POST") {
    const newSteward = {
      ...req.body,
      createdAt: new Date().toISOString(),
      referrals: 0,
    };

    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      existing = raw ? JSON.parse(raw) : [];
    }

    const updated = Array.isArray(existing)
      ? [...existing, newSteward]
      : [existing, newSteward];

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

    return res.status(200).json({ message: "Steward added to the scroll." });
  }

  return res.status(405).json({ message: "Method not allowed" });
}