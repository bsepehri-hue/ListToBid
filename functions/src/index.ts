import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const onSaleCreated = onDocumentCreated("sales/{saleId}", async (event) => {
  const snap = event.data;
  if (!snap) return;
  const sale = snap.data();
  const vaultRef = db.collection("vault").doc(sale.stewardId);
  // your logic here
});
