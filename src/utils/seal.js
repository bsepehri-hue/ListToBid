// server.js (Simplified Example)
const express = require('express');
const app = express();
app.use(express.json());

// --- 1. Steward Onboarding ---
app.post('/api/stewards', async (req, res) => {
  const { store_name, logo_url, category, description } = req.body;
  // TODO: Insert into Stewards table in your database
  // const newSteward = await db.query(INSERT...);
  // res.json(newSteward);
  
  // On success, send back the new steward's info
  const mockSteward = { id: 'uuid-123', store_name, ... };
  res.status(201).json(mockSteward);
});

// --- 2. Product Module ---
app.post('/api/listings', async (req, res) => {
  const { title, description, price, inventory, images, category, steward_id } = req.body;
  
  // TODO: Insert into Listings table
  // const newListing = await db.query(INSERT... 
  //   (steward_id, title, ..., listing_type, price_in_cents, inventory_count, status)
  //   VALUES ($1, $2, ..., 'product', price * 100, inventory, 'active')
  // );
  
  // Using your anchor text
  res.status(201).json({ message: 'Offering Sealed Successfully' });
});

// --- 4. Merchant Bazaar ---
app.get('/api/stewards/:merchantID', async (req, res) => {
  const { merchantID } = req.params;
  
  // TODO: 1. Get Steward info from Stewards table
  // const stewardInfo = await db.query(SELECT * FROM Stewards WHERE id = $1, [merchantID]);
  
  // TODO: 2. Get Steward's products from Listings table
  // const products = await db.query(
  //   SELECT * FROM Listings WHERE steward_id = $1 AND listing_type = 'product' AND status = 'active',
  //   [merchantID]
  // );
  
  const mockData = {
    steward: { store_name: 'Saint Halo\'s Relics', logo_url: '...', description: '...' },
    products: [{ id: 'prod-1', title: 'Guitar Scroll', price_in_cents: 35000 }]
  };
  res.json(mockData);
});

// --- 5. Basic Directory ---
app.get('/api/directory', async (req, res) => {
  // TODO: Get all stewards, sorted by category
  // const stewards = await db.query(
  //   SELECT id, store_name, description, category, is_verified 
  //   FROM Stewards 
  //   ORDER BY category, store_name
  // );
  
  // res.json(stewards);
  const mockStewards = [
    { id: 'uuid-123', store_name: 'Saint Halo\'s Relics', description: 'Carved from ancient oak...', category: 'Artifacts', is_verified: true },
    { id: 'uuid-456', store_name: 'Anya\'s Weavings', description: 'Threads of fate and time.', category: 'Apparel', is_verified: false }
  ];
  res.json(mockStewards);
});

// --- 6. Vault Lite ---
app.get('/api/vault/:stewardID', async (req, res) => {
  const { stewardID } = req.params;
  
  // TODO: Get sales from Sales table, joining with Listings for title
  // const sales = await db.query(
  //   SELECT s.created_at, s.amount_paid_cents, s.referral_earned, l.title
  //   FROM Sales s
  //   JOIN Listings l ON s.listing_id = l.id
  //   WHERE s.steward_id = $1
  //   ORDER BY s.created_at DESC,
  //   [stewardID]
  // );
  // res.json(sales);
  
  const mockSales = [
    { title: 'Guitar Scroll', amount_paid_cents: 35000, referral_earned: 350, created_at: '2025-11-08' }
  ];
  res.json(mockSales);
});

// app.listen(3001, () => console.log('API server running...'));