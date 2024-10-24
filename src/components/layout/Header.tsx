import React from 'react';
import { ShoppingCart, Heart, Search, Menu, Frame } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Frame className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FrameCraft</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Shop</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Custom Frames</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Upload Photo</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Blog</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
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