import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Frame, Upload, Palette, ArrowRight } from 'lucide-react';

export default function CustomFramePreview() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Create Your Perfect Frame
            </h2>
            <p className="text-gray-300 mb-8">
              Design a custom frame that perfectly matches your style and space.
              Upload your photo, choose your materials, and we'll craft it just for you.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <Upload className="h-6 w-6 text-indigo-400" />
                <div>
                  <h3 className="font-semibold mb-1">Upload Photo</h3>
                  <p className="text-sm text-gray-400">Use your own images</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Frame className="h-6 w-6 text-indigo-400" />
                <div>
                  <h3 className="font-semibold mb-1">Choose Style</h3>
                  <p className="text-sm text-gray-400">Pick your perfect frame</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Palette className="h-6 w-6 text-indigo-400" />
                <div>
                  <h3 className="font-semibold mb-1">Customize</h3>
                  <p className="text-sm text-gray-400">Select colors & materials</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/custom-frame')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center"
            >
              Start Designing
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80"
              alt="Custom Frame Preview"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-indigo-600 p-4 rounded-lg shadow-xl">
              <p className="text-sm font-semibold">Starting from</p>
              <p className="text-2xl font-bold">$49.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}