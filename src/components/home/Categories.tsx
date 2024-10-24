import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Classic Frames',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
    description: 'Timeless designs for any space'
  },
  {
    id: 2,
    name: 'Modern Collection',
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80',
    description: 'Contemporary styles for modern homes'
  },
  {
    id: 3,
    name: 'Gallery Walls',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    description: 'Create stunning wall arrangements'
  }
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate('/shop')}
              className="relative h-96 group cursor-pointer overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}