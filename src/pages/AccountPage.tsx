import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useUserStore, useCartStore, useWishlistStore } from '../lib/store';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const orders = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => navigate('/orders')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
              >
                <Package className="h-5 w-5" />
                Orders ({orders.length})
              </button>
              <button 
                onClick={() => navigate('/wishlist')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
              >
                <Heart className="h-5 w-5" />
                Wishlist ({wishlistItems.length})
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:border-indigo-600 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-medium">{order.name}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {order.quantity}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          ${(order.price * order.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No orders yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}