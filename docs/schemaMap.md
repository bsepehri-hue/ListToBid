📜 Transaction Schema Map

BaseTransaction (shared by all)
- transactionId: string — unique ID for the transaction  
- status: string — e.g. "pending", "complete", "failed"  
- createdAt: Date — when the transaction was created  
- updatedAt: Date — when the transaction was last updated  
- externalCosts?: number — optional audit field for fees/extra costs  

---

Txn001 — Merchant Transaction
- merchantId: string — anchor to merchant profile  
- storefrontId?: string — optional, links to storefront  
- referrerId?: string — optional, for referral payouts  
- netValue: number — merchant net after fees  
- amount: number — gross transaction amount  
- externalCosts?: number — shipping, handling, etc.  

---

Txn002 — Discount / Steward Transaction
- merchantId: string — anchor to merchant profile  
- stewardId?: string — optional, links to steward for payout tracking  
- referrerId?: string — optional, for referral discounts  
- netValue: number — merchant net after fees/discounts  
- amount: number — gross transaction amount  
- discountApplied?: number — optional, discount amount (absolute or %)  

---

Txn003 — Auction Transaction
- auctionId: string — anchor to auction event  
- bidderId: string — anchor to user placing the bid  
- merchantId?: string — optional, links to merchant/storefront  
- bidAmount: number — amount offered in the bid  
- amount: number — final transaction amount if bid wins  

---

Txn004 — Vault Transaction
- vaultId: string — anchor to vault record  
- userId: string — anchor to user who locked funds  
- amount: number — amount locked in the vault  
- lockPeriod: number — lock duration in days  

# 📜 Transaction Schema Map

## BaseTransaction (shared by all)
| Field          | Type    | Notes                                      |
|----------------|---------|--------------------------------------------|
| transactionId  | string  | Unique ID for the transaction              |
| status         | string  | e.g. "pending", "complete", "failed"       |
| createdAt      | Date    | When the transaction was created           |
| updatedAt      | Date    | When the transaction was last updated      |
| externalCosts? | number  | Optional audit field for fees/extra costs  |

---

## Txn001 — Merchant Transaction
| Field          | Type    | Notes                                      |
|----------------|---------|--------------------------------------------|
| merchantId     | string  | Anchor to merchant profile                 |
| storefrontId?  | string  | Optional, links to storefront              |
| referrerId?    | string  | Optional, for referral payouts             |
| netValue       | number  | Merchant net after fees                    |
| amount         | number  | Gross transaction amount                   |
| externalCosts? | number  | Shipping, handling, etc.                   |

---

## Txn002 — Discount / Steward Transaction
| Field           | Type    | Notes                                      |
|-----------------|---------|--------------------------------------------|
| merchantId      | string  | Anchor to merchant profile                 |
| stewardId?      | string  | Optional, links to steward for payout      |
| referrerId?     | string  | Optional, for referral discounts           |
| netValue        | number  | Merchant net after fees/discounts          |
| amount          | number  | Gross transaction amount                   |
| discountApplied?| number  | Optional, discount amount (absolute or %)  |

---

## Txn003 — Auction Transaction
| Field       | Type    | Notes                                      |
|-------------|---------|--------------------------------------------|
| auctionId   | string  | Anchor to auction event                    |
| bidderId    | string  | Anchor to user placing the bid             |
| merchantId? | string  | Optional, links to merchant/storefront      |
| bidAmount   | number  | Amount offered in the bid                  |
| amount      | number  | Final transaction amount if bid wins        |

---

## Txn004 — Vault Transaction
| Field     | Type    | Notes                                      |
|-----------|---------|--------------------------------------------|
| vaultId   | string  | Anchor to vault record                     |
| userId    | string  | Anchor to user who locked funds            |
| amount    | number  | Amount locked in the vault                 |
| lockPeriod| number  | Lock duration in days                      |
