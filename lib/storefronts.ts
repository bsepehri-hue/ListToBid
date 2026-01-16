import { db } from './firebase';

// 🔑 Fetch all storefronts for a steward
export async function getStorefronts(stewardId: string) {
  const snap = await db
    .collection('storefronts')
    .where('ownerId', '==', stewardId)
    .orderBy('createdAt', 'desc')
    .get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🔑 Create a new storefront
export async function createStorefront(stewardId: string, data: any) {
  const docRef = await db.collection('storefronts').add({
    ...data,
    ownerId: stewardId,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
  });

  return docRef.id;
}