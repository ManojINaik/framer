import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Camera, 
  Bell, Lock, CreditCard, Heart, Package,
  ChevronRight, Edit2
} from 'lucide-react';
import { useUserStore } from '../lib/store';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'Orders' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'settings', label: 'Settings' }
  ];

  const recentOrders = [
    {
      id: '1',
      date: '2024-02-20',
      status: 'Delivered',
      total: 159.99,
      image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?auto=format&fit=crop&q=80'
    }
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'Classic Wood Frame',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <button className="text-indigo-600 hover:text-indigo-700">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Premium Member
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm divide-y">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{user?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{user?.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">New York, USA</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">12</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">4</div>
                      <div className="text-sm text-gray-600">Wishlisted Items</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={order.image}
                          alt=""
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            ${order.total}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Wishlist</h2>
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm font-medium text-gray-900">${item.price}</p>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-700">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm divide-y">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Notifications</div>
                          <div className="text-sm text-gray-600">Manage your notification preferences</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Security</div>
                          <div className="text-sm text-gray-600">Update password and security settings</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Payment Methods</div>
                          <div className="text-sm text-gray-600">Manage your payment options</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 mr-3" />
                    <span>Track Order</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-gray-400 mr-3" />
                    <span>View Wishlist</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                    <span>Payment Methods</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-2">Need Help?</h3>
              <p className="text-sm text-indigo-700 mb-4">
                Our customer support team is available 24/7 to assist you.
              </p>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}