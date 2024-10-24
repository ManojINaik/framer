import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80"
          alt="Gallery Wall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Frame Your Moments<br />
          <span className="text-indigo-400">With Perfection</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Create custom frames that tell your story. From classic elegance to modern minimalism,
          find the perfect frame for every memory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center">
            Design Your Frame
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}