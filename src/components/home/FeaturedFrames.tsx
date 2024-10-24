import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore, useProductStore } from '../../lib/store';
import { formatPrice } from '../../lib/utils';

export default function FeaturedFrames() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const products = useProductStore((state) => state.products);

  // Get the top 3 highest-rated products
  const featuredFrames = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  if (featuredFrames.length === 0) {
    return null; // Don't show the section if there are no products
  }

  const handleAddToCart = (frame: typeof featuredFrames[0]) => {
    addItem({
      ...frame,
      quantity: 1
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bestselling Frames</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular frames, crafted with premium materials and perfect for any space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFrames.map((frame) => (
            <div key={frame.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${frame.id}`)}
              >
                <img
                  src={frame.image}
                  alt={frame.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{frame.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{frame.rating}</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-indigo-600 mb-4">{formatPrice(frame.price)}</p>
                <button 
                  onClick={() => handleAddToCart(frame)}
                  className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}