import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedFrames from '../components/home/FeaturedFrames';
import Categories from '../components/home/Categories';
import CustomFramePreview from '../components/home/CustomFramePreview';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedFrames />
      <Categories />
      <CustomFramePreview />
    </div>
  );
}