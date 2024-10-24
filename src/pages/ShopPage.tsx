import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/shop/ProductGrid';
import FilterSidebar from '../components/shop/FilterSidebar';

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop Frames</h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2">
              Search results for: "{searchQuery}"
            </p>
          )}
        </div>
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
        <ProductGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
}