import React from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface FilterSidebarProps {
  show: boolean;
  onClose: () => void;
}

export const filters = {
  material: ['Wood', 'Metal', 'Plastic'],
  color: ['Black', 'White', 'Brown', 'Silver', 'Gold'],
  size: ['Small (5"x7")', 'Medium (8"x10")', 'Large (11"x14")', 'Extra Large (16"x20")'],
  price: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200']
};

export default function FilterSidebar({ show, onClose }: FilterSidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (category: string, value: string) => {
    const currentFilters = searchParams.getAll(category);
    if (currentFilters.includes(value)) {
      const newFilters = currentFilters.filter(filter => filter !== value);
      if (newFilters.length === 0) {
        searchParams.delete(category);
      } else {
        searchParams.delete(category);
        newFilters.forEach(filter => searchParams.append(category, filter));
      }
    } else {
      searchParams.append(category, value);
    }
    setSearchParams(searchParams);
  };

  const isChecked = (category: string, value: string) => {
    return searchParams.getAll(category).includes(value);
  };

  return (
    <div className={`
      fixed md:relative top-0 left-0 h-full w-64 bg-white md:block
      transform transition-transform duration-300 ease-in-out z-40
      ${show ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      border-r border-gray-200 p-6 overflow-y-auto
    `}>
      <div className="flex justify-between items-center md:hidden mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-gray-900 mb-3">
            {category}
          </h3>
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked(category, option)}
                  onChange={() => handleFilterChange(category, option)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}