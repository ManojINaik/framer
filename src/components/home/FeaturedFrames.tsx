import React from 'react';
import { Star } from 'lucide-react';

const frames = [
  {
    id: 1,
    name: 'Classic Wood Frame',
    price: 79.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Modern Metallic',
    price: 99.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Minimalist White',
    price: 69.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80'
  }
];

export default function FeaturedFrames() {
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
          {frames.map((frame) => (
            <div key={frame.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
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
                <p className="text-xl font-bold text-indigo-600 mb-4">${frame.price}</p>
                <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors">
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