import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../lib/store';
import { formatPrice } from '../../lib/utils';

const products = [
  {
    id: 1,
    name: 'Classic Wood Frame',
    price: 79.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?auto=format&fit=crop&q=80',
    material: 'Wood',
    color: 'Brown'
  },
  {
    id: 2,
    name: 'Modern Metallic',
    price: 99.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80',
    material: 'Metal',
    color: 'Silver'
  },
  {
    id: 3,
    name: 'Minimalist White',
    price: 69.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    material: 'Wood',
    color: 'White'
  },
  // Add more products here
];

export default function ProductGrid() {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div 
              className="relative h-64 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {product.material} · {product.color}
              </p>
              <p className="text-xl font-bold text-indigo-600 mb-4">
                {formatPrice(product.price)}
              </p>
              <button 
                onClick={() => addItem(product)}
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
  );
}