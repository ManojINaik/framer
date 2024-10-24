import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '../lib/store';
import { formatPrice } from '../lib/utils';

const product = {
  id: 1,
  name: 'Classic Wood Frame',
  price: 79.99,
  rating: 4.8,
  reviews: 124,
  description: 'Handcrafted from premium wood, this classic frame adds elegance to any photo or artwork. Perfect for both modern and traditional spaces.',
  features: [
    'Premium solid wood construction',
    'Protective glass cover',
    'Acid-free matting',
    'Easy hanging system included',
    'Available in multiple sizes'
  ],
  images: [
    'https://images.unsplash.com/photo-1544161513-0179fe746fd5?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80'
  ],
  sizes: ['5x7', '8x10', '11x14', '16x20'],
  colors: ['Natural', 'Black', 'White', 'Walnut']
};

export default function ProductPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImage, setCurrentImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      ...product,
      customizations: {
        size: selectedSize,
        color: selectedColor
      }
    });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 mb-4">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : prev))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : prev))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-indigo-600' : ''
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-semibold mb-4">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size:</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {size}"
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Color:</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded border ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <span className="text-3xl font-bold text-indigo-600">
                {formatPrice(product.price)}
              </span>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}