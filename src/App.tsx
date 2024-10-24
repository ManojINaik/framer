import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import FeaturedFrames from './components/home/FeaturedFrames';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <FeaturedFrames />
      </main>
    </div>
  );
}

export default App;