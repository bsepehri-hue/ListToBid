"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

type VaultDoc = {
  id: string;
  available: number;
  totalEarned: number;
  totalRefunded: number;
  totalPayouts: number;
  locked: number;
  updatedAt?: number;
};

type TimelineEvent = {
  id: string;
  type: "sale" | "refund" | "payout" | "system";
  label: string;
  amount?: number;
  buyerId?: string;
  sellerId?: string;
  contextId?: string;
  createdAt?: number;
};

type PaymentDoc = {
  id: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: string;
  contextId?: string;
  createdAt?: number;
};

type PayoutDoc = {
  id: string;
  sellerId: string;
  amount: number;
  status: string;
  createdAt?: number;
};

type RefundDoc = {
  id: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: string;
  createdAt?: number;
};

export default function AdminFinancialConsolePage() {
  const [vault, setVault] = useState<VaultDoc[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [payments, setPayments] = useState<PaymentDoc[]>([]);
  const [payouts, setPayouts] = useState<PayoutDoc[]>([]);
  const [refunds, setRefunds] = useState<RefundDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Vault
      const vaultSnap = await getDocs(collection(db, "vault"));
      const vaultRows: VaultDoc[] = vaultSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          available: data.available ?? 0,
          totalEarned: data.totalEarned ?? 0,
          totalRefunded: data.totalRefunded ?? 0,
          totalPayouts: data.totalPayouts ?? 0,
          locked: data.locked ?? 0,
          updatedAt: data.updatedAt,
        };
      });

      // Timeline (latest 50)
      const timelineQuery = query(
        collection(db, "timeline"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const timelineSnap = await getDocs(timelineQuery);
      const timelineRows: TimelineEvent[] = timelineSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          type: data.type,
          label: data.label,
          amount: data.amount,
          buyerId: data.buyerId,
          sellerId: data.sellerId,
          contextId: data.contextId,
          createdAt: data.createdAt,
        };
      });

      // Payments (latest 50)
      const paymentsQuery = query(
        collection(db, "payments"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const paymentsSnap = await getDocs(paymentsQuery);
      const paymentRows: PaymentDoc[] = paymentsSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          buyerId: data.buyerId,
          sellerId: data.sellerId,
          amount: data.amount,
          status: data.status,
          contextId: data.contextId,
          createdAt: data.createdAt,
        };
      });

      // Payouts (latest 50)
      const payoutsQuery = query(
        collection(db, "payouts"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const payoutsSnap = await getDocs(payoutsQuery);
      const payoutRows: PayoutDoc[] = payoutsSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          sellerId: data.sellerId,
          amount: data.amount,
          status: data.status,
          createdAt: data.createdAt,
        };
      });

      // Refunds (latest 50)
      const refundsQuery = query(
        collection(db, "refunds"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const refundsSnap = await getDocs(refundsQuery);
      const refundRows: RefundDoc[] = refundsSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          buyerId: data.buyerId,
          sellerId: data.sellerId,
          amount: data.amount,
          status: data.status,
          createdAt: data.createdAt,
        };
      });

      setVault(vaultRows);
      setTimeline(timelineRows);
      setPayments(paymentRows);
      setPayouts(payoutRows);
      setRefunds(refundRows);
      setLoading(false);
    };

    void load();
  }, []);

  const totalAvailable = vault.reduce((sum, v) => sum + v.available, 0);
  const totalEarned = vault.reduce((sum, v) => sum + v.totalEarned, 0);
  const totalRefunded = vault.reduce((sum, v) => sum + v.totalRefunded, 0);
  const totalPayouts = vault.reduce((sum, v) => sum + v.totalPayouts, 0);
  const totalLocked = vault.reduce((sum, v) => sum + v.locked, 0);

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin Financial Console</h1>
        <p className="text-sm text-gray-500">
          Unified view of balances, payments, refunds, payouts, and events.
        </p>
      </header>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <SummaryCard label="Total Available" value={totalAvailable} />
        <SummaryCard label="Total Earned" value={totalEarned} />
        <SummaryCard label="Total Refunded" value={totalRefunded} />
        <SummaryCard label="Total Payouts" value={totalPayouts} />
        <SummaryCard label="Total Locked" value={totalLocked} />
      </section>

      {loading ? (
        <p className="text-sm text-gray-500">Loading financial data…</p>
      ) : (
        <>
          {/* Vault table */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Vault balances</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Seller</Th>
                    <Th>Available</Th>
                    <Th>Earned</Th>
                    <Th>Refunded</Th>
                    <Th>Payouts</Th>
                    <Th>Locked</Th>
                  </tr>
                </thead>
                <tbody>
                  {vault.map((v) => (
                    <tr key={v.id} className="border-t">
                      <Td>{v.id}</Td>
                      <Td>{v.available}</Td>
                      <Td>{v.totalEarned}</Td>
                      <Td>{v.totalRefunded}</Td>
                      <Td>{v.totalPayouts}</Td>
                      <Td>{v.locked}</Td>
                    </tr>
                  ))}
                  {vault.length === 0 && (
                    <tr>
                      <Td colSpan={6} className="text-center text-gray-500">
                        No vault records yet.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Timeline feed */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Latest events</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Time</Th>
                    <Th>Type</Th>
                    <Th>Label</Th>
                    <Th>Amount</Th>
                    <Th>Buyer</Th>
                    <Th>Seller</Th>
                    <Th>Context</Th>
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((e) => (
                    <tr key={e.id} className="border-t">
                      <Td>{e.createdAt ? new Date(e.createdAt).toLocaleString() : "-"}</Td>
                      <Td>{e.type}</Td>
                      <Td>{e.label}</Td>
                      <Td>{e.amount ?? "-"}</Td>
                      <Td>{e.buyerId ?? "-"}</Td>
                      <Td>{e.sellerId ?? "-"}</Td>
                      <Td>{e.contextId ?? "-"}</Td>
                    </tr>
                  ))}
                  {timeline.length === 0 && (
                    <tr>
                      <Td colSpan={7} className="text-center text-gray-500">
                        No events yet.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payments */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Payments</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Time</Th>
                    <Th>Payment</Th>
                    <Th>Buyer</Th>
                    <Th>Seller</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Context</Th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-t">
                      <Td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}</Td>
                      <Td>{p.id}</Td>
                      <Td>{p.buyerId}</Td>
                      <Td>{p.sellerId}</Td>
                      <Td>{p.amount}</Td>
                      <Td>{p.status}</Td>
                      <Td>{p.contextId ?? "-"}</Td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <Td colSpan={7} className="text-center text-gray-500">
                        No payments yet.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payouts */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Payouts</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Time</Th>
                    <Th>Payout</Th>
                    <Th>Seller</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.id} className="border-t">
                      <Td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}</Td>
                      <Td>{p.id}</Td>
                      <Td>{p.sellerId}</Td>
                      <Td>{p.amount}</Td>
                      <Td>{p.status}</Td>
                    </tr>
                  ))}
                  {payouts.length === 0 && (
                    <tr>
                      <Td colSpan={5} className="text-center text-gray-500">
                        No payouts yet.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Refunds */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Refunds</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Time</Th>
                    <Th>Refund</Th>
                    <Th>Buyer</Th>
                    <Th>Seller</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((r) => (
                    <tr key={r.id} className="border-t">
                      <Td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</Td>
                      <Td>{r.id}</Td>
                      <Td>{r.buyerId}</Td>
                      <Td>{r.sellerId}</Td>
                      <Td>{r.amount}</Td>
                      <Td>{r.status}</Td>
                    </tr>
                  ))}
                  {refunds.length === 0 && (
                    <tr>
                      <Td colSpan={6} className="text-center text-gray-500">
                        No refunds yet.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-semibold">${value.toFixed(2)}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </th>
  );
}

function Td({
  children,
  colSpan,
  className = "",
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  return (
    <td
      className={`px-3 py-2 align-top text-xs text-gray-800 ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}