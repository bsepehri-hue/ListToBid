'use client';

import React, { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { markOrderAsShipped, ShippingFormState } from '@/actions/orders';
import { Truck, CheckCircle, Loader2 } from 'lucide-react';
import { OrderStatus } from '@/lib/mockData/orders';

interface ShippingUpdateFormProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const initialState: ShippingFormState = {
  success: false,
  message: 'Enter shipping details to mark this order as shipped.',
};

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full py-3 mt-6 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center
        ${pending 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-teal-600 hover:bg-teal-700'
        }
      `}
    >
      {pending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating Status...</> : 'Mark as Shipped'}
    </button>
  );
};

export const ShippingUpdateForm: React.FC<ShippingUpdateFormProps> = ({ orderId, currentStatus }) => {
  const [state, formAction] = useFormState(markOrderAsShipped, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  if (currentStatus === 'SHIPPED' || currentStatus === 'DELIVERED') {
    return (
      <div className="p-6 bg-green-50 border border-green-300 rounded-xl flex items-center space-x-3">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <p className="font-semibold text-green-800">
          This order has already been marked as shipped.
        </p>
      </div>
    );
  }
  
  if (currentStatus === 'PENDING_PAYMENT') {
     return (
      <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-xl flex items-center space-x-3">
        <Truck className="w-6 h-6 text-yellow-600 flex-shrink-0" />
        <p className="font-semibold text-yellow-800">
          Cannot ship. Payment is currently pending for this order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2 text-teal-600" />
        Update Shipping Status
      </h3>
      
      {/* Status Message Display */}
      {state.message && state.message !== initialState.message && (
        <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${
          state.success ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'
        }`}>
          {state.message}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="orderId" value={orderId} />
        
        {/* Tracking Number Field */}
        <div>
          <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
          <input
            id="trackingNumber"
            name="trackingNumber"
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
            placeholder="e.g., 9876543210"
          />
          {state.errors?.trackingNumber && (
            <p className="mt-1 text-xs text-red-500">{state.errors.trackingNumber.join(', ')}</p>
          )}
        </div>

        {/* Carrier Field */}
        <div>
          <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 mb-1">Shipping Carrier</label>
          <input
            id="carrier"
            name="carrier"
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
            placeholder="e.g., FedEx, USPS, DHL"
          />
          {state.errors?.carrier && (
            <p className="mt-1 text-xs text-red-500">{state.errors.carrier.join(', ')}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
};