import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, Frame } from 'lucide-react';
import { useCartStore } from '../../lib/store';

export default function Header() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Frame className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FrameCraft</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigate('/shop')} className="text-gray-700 hover:text-indigo-600">Shop</button>
            <button onClick={() => navigate('/custom-frame')} className="text-gray-700 hover:text-indigo-600">Custom Frames</button>
            <button onClick={() => navigate('/shop')} className="text-gray-700 hover:text-indigo-600">Upload Photo</button>
            <button className="text-gray-700 hover:text-indigo-600">Blog</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => navigate('/cart')} 
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}