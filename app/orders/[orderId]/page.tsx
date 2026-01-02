import { getOrderById } from "@/lib/orders/data";
import { OrderStatus } from "@/lib/orders/types";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Package, Info, Home } from "lucide-react";
import { formatEther } from "@/lib/utils";
import OrderItemRow from "@/components/orders/OrderItemRow";
import AddressBox from "@/components/orders/AddressBox";
import { ShippingUpdateForm } from "@/components/orders/ShippingUpdateForm";

// If you actually have a TimelineItem component, keep this.
// If not, comment this out and the <TimelineItem> block below.
import TimelineItem from "@/components/orders/TimelineItem";

// Utility to map status → icon/text/color
function getStatusClasses(status: OrderStatus) {
  switch (status) {
    case "PENDING":
      return {
        icon: AlertTriangle,
        text: "Pending",
        color: "border-yellow-500 text-yellow-700",
      };
    case "SHIPPED":
      return {
        icon: Package,
        text: "Shipped",
        color: "border-blue-500 text-blue-700",
      };
    case "DELIVERED":
      return {
        icon: Package,
        text: "Delivered",
        color: "border-green-500 text-green-700",
      };
    case "CANCELLED":
      return {
        icon: AlertTriangle,
        text: "Cancelled",
        color: "border-red-500 text-red-700",
      };
    case "PENDING_PAYMENT":
      return {
        icon: AlertTriangle,
        text: "Payment Pending",
        color: "border-orange-500 text-orange-700",
      };
    default:
      return {
        icon: AlertTriangle,
        text: "Unknown",
        color: "border-gray-500 text-gray-700",
      };
  }
}

// ─────────────────────────────────────────────
// Server action stubs (safe, compile‑ready)
// You can fill these in later with real logic.
// ─────────────────────────────────────────────

export async function markAsShipped(formData: FormData) {
  "use server";
  const orderId = formData.get("orderId");
  console.log("markAsShipped called for", orderId);
  // TODO: update order status to SHIPPED and send notification
}

export async function markAsDelivered(formData: FormData) {
  "use server";
  const orderId = formData.get("orderId");
  console.log("markAsDelivered called for", orderId);
  // TODO: update order status to DELIVERED and send notification
}

export async function markAsCompleted(formData: FormData) {
  "use server";
  const orderId = formData.get("orderId");
  console.log("markAsCompleted called for", orderId);
  // TODO: update order status to COMPLETED and send notification
}

// ─────────────────────────────────────────────
// Fetcher component (your original core UI)
// ─────────────────────────────────────────────

async function OrderDetailFetcher({ orderId }: { orderId: string }) {
  const order = await getOrderById(orderId);

  if (!order) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-xl shadow-lg mt-8">
        <AlertTriangle className="w-10 h-10 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-800">Order Not Found</h1>
        <p className="text-gray-600 mt-2">Could not load order ID: {orderId}.</p>
        <Link
          href="/dashboard/orders"
          className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
      </div>
    );
  }

  const { icon: StatusIcon, text: statusText, color: statusColor } =
    getStatusClasses(order.status as OrderStatus);

  return (
    <div className="space-y-8">
      {/* Header and Status */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 transition text-sm mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders List
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Order Details: <span className="text-teal-600">#{order.id}</span>
          </h1>
        </div>
        <div
          className={`flex items-center text-sm font-bold px-4 py-2 rounded-full border ${statusColor}`}
        >
          <StatusIcon className="w-4 h-4 mr-2" />
          {statusText}
        </div>
      </div>

      {/* Full grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Order Info) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-teal-600" /> Ordered Items
            </h2>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <OrderItemRow key={index} item={item} />
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
              <span className="text-xl font-bold text-gray-900">Order Total:</span>
              <span className="text-2xl font-extrabold text-red-600">
                {formatEther(order.totalAmount)}{" "}
                <span className="text-lg font-semibold">ETH</span>
              </span>
            </div>
          </div>

          {/* Shipping/Tracking Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-teal-600" /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tracking Details */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">
                  Tracking Number:
                </p>
                <p className="text-lg font-mono text-gray-900">
                  {order.shippingTrackingNumber || "N/A"}
                </p>
                <p className="text-sm font-semibold text-gray-600">Carrier:</p>
                <p className="text-lg font-medium text-gray-900">
                  {order.shippingCarrier || "N/A"}
                </p>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-600 flex items-center">
                  <Home className="w-4 h-4 mr-1" /> Ship To:
                </h3>
                <AddressBox address={order.shippingAddress} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Actions) */}
        <div className="lg:col-span-1 space-y-6">
          <ShippingUpdateForm orderId={order.id} currentStatus={order.status} />

          {/* General Order Details Box */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-3">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Order Metadata
            </h3>

            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Store</span>
              <span>{order.storeName}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Placed</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Timeline (if TimelineItem exists) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Order Timeline
            </h3>
            <div className="timeline space-y-2">
              <TimelineItem
                label="Order Placed"
                date={order.createdAt}
                active={true}
              />
              <TimelineItem
                label="Payment Confirmed"
                date={order.paidAt}
                active={order.status !== "PENDING_PAYMENT" && order.status !== "PENDING"}
              />
              <TimelineItem
                label="Shipped"
                date={order.shippedAt}
                active={
                  order.status === "SHIPPED" ||
                  order.status === "DELIVERED" ||
                  order.status === "COMPLETED"
                }
              />
              <TimelineItem
                label="Delivered"
                date={order.deliveredAt}
                active={
                  order.status === "DELIVERED" ||
                  order.status === "COMPLETED"
                }
              />
              <TimelineItem
                label="Completed"
                date={order.completedAt}
                active={order.status === "COMPLETED"}
              />
            </div>
          </div>

          {/* Seller Actions (no user gate for now to avoid missing imports) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Seller Actions
            </h3>

            <form action={markAsShipped}>
              <input type="hidden" name="orderId" value={order.id} />
              <button
                type="submit"
                className="w-full rounded-lg bg-amber-500 text-white font-semibold py-2 hover:bg-amber-600 transition"
              >
                Mark as Shipped
              </button>
            </form>

            <form action={markAsDelivered}>
              <input type="hidden" name="orderId" value={order.id} />
              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-500 text-white font-semibold py-2 hover:bg-emerald-600 transition"
              >
                Mark as Delivered
              </button>
            </form>

            <form action={markAsCompleted}>
              <input type="hidden" name="orderId" value={order.id} />
              <button
                type="submit"
                className="w-full rounded-lg bg-teal-500 text-white font-semibold py-2 hover:bg-teal-600 transition"
              >
                Mark as Completed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page wrapper for Next.js app router
// ─────────────────────────────────────────────

export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;
  return (
    <div className="max-w-7xl mx-auto py-8">
      <OrderDetailFetcher orderId={orderId} />
    </div>
  );
}