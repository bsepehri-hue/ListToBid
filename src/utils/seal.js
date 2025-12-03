/* eslint-env node */
import express from "express";

const app = express();
app.use(express.json());

// --- 1. Steward Onboarding ---
app.post("/api/stewards", async (req, res) => {
  const { store_name } = req.body; // only keep what you use

  const mockSteward = { id: "uuid-123", store_name };
  res.status(201).json(mockSteward);
});

// --- 2. Product Module ---
app.post("/api/listings", async (req, res) => {
  const { title, description, price, inventory, images, category, steward_id } = req.body;

  // TODO: Insert into Listings table
  res.status(201).json({ message: "Offering Sealed Successfully" });
});

// --- 4. Merchant Bazaar ---
app.get("/api/stewards/:merchantID", async (req, res) => {
  const { merchantID } = req.params;

  const mockData = {
    steward: { store_name: "Saint Halo's Relics", logo_url: "...", description: "..." },
    products: [{ id: "prod-1", title: "Guitar Scroll", price_in_cents: 35000 }],
  };
  res.json(mockData);
});

// --- 5. Basic Directory ---
app.get("/api/directory", async (req, res) => {
  const mockStewards = [
    { id: "uuid-123", store_name: "Saint Halo's Relics", description: "Carved from ancient oak...", category: "Artifacts", is_verified: true },
    { id: "uuid-456", store_name: "Anya's Weavings", description: "Threads of fate and time.", category: "Apparel", is_verified: false },
  ];
  res.json(mockStewards);
});

// --- 6. Vault Lite ---
app.get("/api/vault/:stewardID", async (req, res) => {
  const { stewardID } = req.params;

  const mockSales = [
    { title: "Guitar Scroll", amount_paid_cents: 35000, referral_earned: 350, created_at: "2025-11-08" },
  ];
  res.json(mockSales);
});

app.listen(3001, () => console.log("API server running..."));
