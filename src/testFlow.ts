import { saveTransaction } from './services/saveTransaction';
import { fetchTransaction } from './services/fetchTransaction';
import { Txn002 } from './schemas/txn002';

async function testFlow() {
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

  // Save
  await saveTransaction('txn002', txn);

  // Fetch
  const fetched = await fetchTransaction<Txn002>('txn002', 'txn002-001');
  console.log('Fetched transaction:', fetched);
}

testFlow().catch(console.error);