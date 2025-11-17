-- 1. Stewards Table (For Onboarding & Directory)
CREATE TABLE Stewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name TEXT NOT NULL,
    logo_url TEXT,
    category TEXT NOT NULL,
    description TEXT,
    is_verified BOOLEAN DEFAULT false, -- For the "Verified Steward" badge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Unified Listings Table (For Products & Auctions)
CREATE TABLE Listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    steward_id UUID REFERENCES Stewards(id), -- Foreign key
    title TEXT NOT NULL,
    description TEXT,
    images TEXT[], -- An array of image URLs
    
    listing_type TEXT NOT NULL, -- 'product' or 'auction'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'sold', 'archived'
    category TEXT,
    tags TEXT[],
    
    -- Product-specific fields
    price_in_cents INT,
    inventory_count INT,
    
    -- Auction-specific fields (for later)
    -- starting_bid_cents INT,
    -- auction_end_date TIMESTAMP,
    
    referral_code TEXT, -- As specified
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Sales Table (For "The Steward's Purse")
CREATE TABLE Sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES Listings(id),
    steward_id UUID REFERENCES Stewards(id),
    buyer_id UUID, -- Assuming you have a Users table
    amount_paid_cents INT NOT NULL,
    referral_earned INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);