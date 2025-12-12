import { saveTransaction } from './services/saveTransaction';
import { fetchTransaction } from './services/fetchTransaction';
import { Txn002 } from './schemas/txn002';

async function testTxn002Flow() {
  // 1. Save a transaction
  const txn: Txn002 = {
    transactionId: 'txn002-001',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    merchantId: 'merchant-123',
    netValue: 500,
    amount: 550,
    discountApplied: 50,
  };

  await saveTransaction('txn002', txn);

  // 2. Fetch it back
  const fetched = await fetchTransaction<Txn002>('txn002', 'txn002-001');
  console.log('Fetched transaction:', fetched);
}

testTxn002Flow().catch(console.error);