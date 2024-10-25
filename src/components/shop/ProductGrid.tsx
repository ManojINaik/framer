import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore, useProductStore } from '../../lib/store';
import { formatPrice } from '../../lib/utils';

interface ProductGridProps {
  searchQuery?: string | null;
}

export default function ProductGrid({ searchQuery }: ProductGridProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);
  const products = useProductStore((state) => state.products);

  const filterProducts = (products: any[]) => {
    let filtered = [...products];

    // Text search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Material filter
    const materials = searchParams.getAll('material');
    if (materials.length > 0) {
      filtered = filtered.filter(product => 
        materials.includes(product.material)
      );
    }

    // Color filter
    const colors = searchParams.getAll('color');
    if (colors.length > 0) {
      filtered = filtered.filter(product => 
        colors.includes(product.color)
      );
    }

    // Size filter
    const sizes = searchParams.getAll('size');
    if (sizes.length > 0) {
      filtered = filtered.filter(product => {
        const productSize = `${product.size}"x${product.size}"`;
        return sizes.some(size => size.includes(productSize));
      });
    }

    // Price range filter
    const priceRanges = searchParams.getAll('price');
    if (priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return priceRanges.some(range => {
          if (range === 'Under $50') return product.price < 50;
          if (range === '$50 - $100') return product.price >= 50 && product.price <= 100;
          if (range === '$100 - $200') return product.price > 100 && product.price <= 200;
          if (range === 'Over $200') return product.price > 200;
          return true;
        });
      });
    }

    return filtered;
  };

  const filteredProducts = filterProducts(products);

  if (products.length === 0) {
    return (
      <div className="flex-1 text-center py-12">
        <p className="text-gray-600">No frames available. Please add some products in the admin panel.</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex-1 text-center py-12">
        <p className="text-gray-600">No frames found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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