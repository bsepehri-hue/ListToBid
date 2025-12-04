import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Package, Clock, Home, Info, Truck } from 'lucide-react';
import { getOrderById } from '@/actions/orders';
import { Order, OrderItem, ShippingAddress, OrderStatus } from '@/lib/mockData/orders';
import { shortenAddress, formatEther } from '@/lib/utils';
import { ShippingUpdateForm } from '@/components/orders/ShippingUpdateForm';

// Utility to get status colors
const getStatusClasses = (status: OrderStatus) => {
  switch (status) {
    case 'PROCESSING': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    case 'SHIPPED': return 'text-blue-700 bg-blue-100 border-blue-300';
    case 'DELIVERED': return 'text-green-700 bg-green-100 border-green-300';
    case 'PENDING_PAYMENT': return 'text-red-700 bg-red-100 border-red-300';
    default: return 'text-gray-700 bg-gray-100 border-gray-300';
  }
};

// Component to display a single item in the order
const OrderItemRow: React.FC<{ item: OrderItem }> = ({ item }) => (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border">
            <Image src={item.itemUri} alt={item.listingName} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="flex-1">
            <h4 className="font-medium text-gray-900">{item.listingName}</h4>
            <p className="text-sm text-gray-500">Auction ID: #{item.auctionId}</p>
        </div>
        <div className="text-right">
            <p className="text-lg font-bold text-teal-600">
                {formatEther(item.finalPrice)} <span className="text-sm font-medium">ETH</span>
            </p>
        </div>
    </div>
);

// Component to display the shipping address
const AddressBox: React.FC<{ address: ShippingAddress }> = ({ address }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-1">
        <p className="font-bold text-gray-800">{address.name}</p>
        <p className="text-sm text-gray-600">{address.street}</p>
        <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
        <p className="text-sm font-semibold text-gray-700">{address.country}</p>
    </div>
);


async function OrderDetailFetcher({ orderId }: { orderId: string }) {
    
    const order = await getOrderById(orderId);

    if (!order) {
        return (
             <div className="p-8 text-center bg-red-50 rounded-xl shadow-lg mt-8">
                <AlertTriangle className="w-10 h-10 mx-auto text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-red-800">Order Not Found</h1>
                <p className="text-gray-600 mt-2">Could not load order ID: {orderId}.</p>
                <Link href="/dashboard/orders" className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800 transition">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Orders List
                </Link>
             </div>
        );
    }

    const { icon: StatusIcon, text: statusText, color: statusColor } = getStatusClasses(order.status);

    return (
        <div className="space-y-8">
            
            {/* Header and Status */}
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <Link href="/dashboard/orders" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition text-sm mb-2">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Orders List
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Order Details: <span className="text-teal-600">#{order.id}</span></h1>
                </div>
                <div className={`flex items-center text-sm font-bold px-4 py-2 rounded-full border ${statusColor}`}>
                  <StatusIcon className="w-4 h-4 mr-2" />
                  {statusText}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Order Info) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Items Section */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Package className="w-5 h-5 mr-2 text-teal-600" /> Ordered Items</h2>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item, index) => <OrderItemRow key={index} item={item} />)}
                        </div>
                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                            <span className="text-xl font-bold text-gray-900">Order Total:</span>
                            <span className="text-2xl font-extrabold text-red-600">
                                {formatEther(order.totalAmount)} <span className="text-lg font-semibold">ETH</span>
                            </span>
                        </div>
                    </div>
                    
                    {/* Shipping/Tracking Info */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Info className="w-5 h-5 mr-2 text-teal-600" /> Shipping Information</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Tracking Details */}
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-600">Tracking Number:</p>
                                <p className="text-lg font-mono text-gray-900">
                                    {order.shippingTrackingNumber || 'N/A'}
                                </p>
                                <p className="text-sm font-semibold text-gray-600">Carrier:</p>
                                <p className="text-lg font-medium text-gray-900">
                                    {order.shippingCarrier || 'N/A'}
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
                    <ShippingUpdateForm 
                        orderId={order.id}
                        currentStatus={order.status}
                    />
                    
                    {/* General Order Details Box */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-3">
                         <h3 className="text-xl font-bold text-gray-900 mb-3">Order Metadata</h3>
                         <div className="flex justify-between text-sm text-gray-600">
                             <span className="font-medium">Storefront ID:</span>
                             <Link href={`/dashboard/stores/${order.storefrontId}`} className="text-teal-600 hover:underline">#{order.storefrontId}</Link>
                         </div>
                         <div className="flex justify-between text-sm text-gray-600">
                             <span className="font-medium">Seller Address:</span>
                             <span className="font-mono">{shortenAddress(order.sellerAddress)}</span>
                         </div>
                         <div className="flex justify-between text-sm text-gray-600">
                             <span className="font-medium">Buyer Address:</span>
                             <span className="font-mono">{shortenAddress(order.buyerAddress)}</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Card } from "@/components/ui/Card";
import { fetchOrderById, OrderData } from "@/lib/web3/dataFetcher";

interface OrderDetailProps {
  order: OrderData;
}

const OrderDetailClientWrapper: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Order #{order.orderId.toString()}</h1>
      {/* render order details here */}
    </div>
  );
};

export default async function OrderDetailPage({ params }: { params: { orderId: string } }) {
  let order: OrderData;
  try {
    order = await fetchOrderById(params.orderId);
  } catch (error) {
    return (
      <Card borderColor="red" className="p-8 text-center mt-8">
        <AlertTriangle className="w-10 h-10 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-800">Order Not Found</h1>
        <p className="text-gray-600 mt-2">
          Could not load order ID: {params.orderId}. Check the contract data or try again.
        </p>
        <Link
          href="/orders"
          className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
      </Card>
    );
  }

  return <OrderDetailClientWrapper order={order} />;
}
