import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/shop/ProductGrid';
import FilterSidebar from '../components/shop/FilterSidebar';

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop Frames</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg md:hidden"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <FilterSidebar show={showFilters} onClose={() => setShowFilters(false)} />
        <ProductGrid />
      </div>
    </div>
  );
}