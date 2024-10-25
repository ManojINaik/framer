import React from 'react';
import { useCartStore } from '../../lib/store';
import { calculateOrderSummary, formatOrderAmount } from '../../lib/utils/orderCalculations';

export default function OrderSummary() {
  const items = useCartStore((state) => state.items);
  const { subtotal, shipping, tax, total } = calculateOrderSummary(items);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatOrderAmount(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatOrderAmount(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatOrderAmount(tax)}</span>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatOrderAmount(total)}</span>
          </div>
        </div>
      </div>
      {subtotal >= 100 && (
        <p className="text-sm text-green-600 mb-4">
          ✓ Free shipping applied
        </p>
      )}
      {subtotal < 100 && (
        <p className="text-sm text-gray-600 mb-4">
          Add ${formatOrderAmount(100 - subtotal)} more for free shipping
        </p>
      )}
    </div>
  );
}