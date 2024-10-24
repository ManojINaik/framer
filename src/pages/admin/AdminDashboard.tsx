import React from 'react';
import { useProductStore, useCartStore, useUserStore } from '../../lib/store';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products);
  const orders = useCartStore((state) => state.items);
  const users = useUserStore((state) => state.user ? 1 : 0);

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
      name: 'Active Users',
      value: users,
      icon: Users,
      change: '+12.05%',
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
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <li key={order.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={order.image}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {order.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {order.quantity}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ${(order.price * order.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Low Stock Products</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {products
                .filter((product) => (product.stock || 0) < 10)
                .slice(0, 5)
                .map((product) => (
                  <li key={product.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}