import React from 'react';
import { useProductStore, useCartStore } from '../../lib/store';
import { Package, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products);
  const orders = useCartStore((state) => state.items);

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      icon: Package,
      change: '+4.75%',
      changeType: 'positive'
    },
    {
      name: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      change: '+54.02%',
      changeType: 'positive'
    },
    {
      name: 'Revenue',
      value: `$${orders.reduce((acc, order) => acc + order.price * order.quantity, 0).toFixed(2)}`,
      icon: TrendingUp,
      change: '+12.05%',
      changeType: 'positive'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}