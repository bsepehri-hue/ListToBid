import { InterfaceAbi } from 'ethers';

// Contract deployed on Polygon Amoy at: 0x9cecca238cBE4e9424886d7DcBc58df757c9B954

/**
 * Partial ABI for the ListToBid contract, focusing on core functions.
 */
export const LIST_TO_BID_ABI: InterfaceAbi = [
  // --- Write Function ---
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_profileDataUri", type: "string" },
    ],
    name: "createStorefront",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // --- Read Functions ---
  {
    inputs: [],
    name: "getAllStorefronts",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "profileDataUri", type: "string" },
          { internalType: "uint256", name: "totalListings", type: "uint256" },
        ],
        internalType: "struct ListToBid.Storefront[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // --- New Auction Read Function ---
  {
    inputs: [],
    name: "getAllActiveAuctions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "auctionId", type: "uint256" },
          { internalType: "uint256", name: "storefrontId", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "string", name: "listingName", type: "string" },
          { internalType: "string", name: "itemUri", type: "string" },
          { internalType: "uint256", name: "currentBid", type: "uint256" },
          { internalType: "address", name: "highestBidder", type: "address" },
          { internalType: "uint64", name: "endTime", type: "uint64" }, // Unix timestamp
        ],
        internalType: "struct ListToBid.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const CONTRACT_ADDRESS = "0x9cecca238cBE4e9424886d7DcBc58df757c9B954";
