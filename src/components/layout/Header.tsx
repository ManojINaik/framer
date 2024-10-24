import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, Frame, X } from 'lucide-react';
import { useCartStore } from '../../lib/store';

export default function Header() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUploadPhoto = () => {
    navigate('/custom-frame');
  };

  const handleBlogClick = () => {
    navigate('/blog');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Frame className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FrameCraft</span>
          </div>
          
          <nav className={`
            md:flex space-y-4 md:space-y-0 md:space-x-8
            ${isMenuOpen 
              ? 'absolute top-16 left-0 right-0 bg-white p-4 border-t shadow-lg' 
              : 'hidden'
            }
            md:relative md:top-0 md:bg-transparent md:p-0 md:border-none md:shadow-none
          `}>
            <button onClick={() => navigate('/shop')} className="block w-full md:w-auto text-left text-gray-700 hover:text-indigo-600">Shop</button>
            <button onClick={() => navigate('/custom-frame')} className="block w-full md:w-auto text-left text-gray-700 hover:text-indigo-600">Custom Frames</button>
            <button onClick={handleUploadPhoto} className="block w-full md:w-auto text-left text-gray-700 hover:text-indigo-600">Upload Photo</button>
            <button onClick={handleBlogClick} className="block w-full md:w-auto text-left text-gray-700 hover:text-indigo-600">Blog</button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg p-4">
                  <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search frames..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
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
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay to close search when clicking outside */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-transparent"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
}