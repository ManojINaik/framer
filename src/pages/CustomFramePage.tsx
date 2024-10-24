import React, { useState } from 'react';
import { Upload, Frame, Palette, ArrowRight } from 'lucide-react';

interface FrameOptions {
  size: string;
  material: string;
  color: string;
  matting: string;
}

const initialOptions: FrameOptions = {
  size: '8x10',
  material: 'wood',
  color: 'black',
  matting: 'none'
};

export default function CustomFramePage() {
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState<FrameOptions>(initialOptions);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Design Your Custom Frame
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {i}
                  </div>
                  {i !== 3 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step > i ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
                <p className="text-gray-600 mb-6">
                  Upload a high-quality photo to get started
                </p>
                <label className="inline-block">
                  <span className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                    Choose Photo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Customize Your Frame</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={image!}
                      alt="Uploaded"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size
                      </label>
                      <select
                        value={options.size}
                        onChange={(e) =>
                          setOptions({ ...options, size: e.target.value })
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="5x7">5" x 7"</option>
                        <option value="8x10">8" x 10"</option>
                        <option value="11x14">11" x 14"</option>
                        <option value="16x20">16" x 20"</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material
                      </label>
                      <select
                        value={options.material}
                        onChange={(e) =>
                          setOptions({ ...options, material: e.target.value })
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="wood">Wood</option>
                        <option value="metal">Metal</option>
                        <option value="plastic">Plastic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <select
                        value={options.color}
                        onChange={(e) =>
                          setOptions({ ...options, color: e.target.value })
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="gold">Gold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Matting
                      </label>
                      <select
                        value={options.matting}
                        onChange={(e) =>
                          setOptions({ ...options, matting: e.target.value })
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="none">None</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setStep(3)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Frame</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={image!}
                      alt="Final Preview"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Frame Details</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Size:</dt>
                          <dd className="font-medium">{options.size}"</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Material:</dt>
                          <dd className="font-medium capitalize">{options.material}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Color:</dt>
                          <dd className="font-medium capitalize">{options.color}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Matting:</dt>
                          <dd className="font-medium capitalize">{options.matting}</dd>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex justify-between">
                            <dt className="text-gray-900 font-semibold">Total:</dt>
                            <dd className="text-xl font-bold text-indigo-600">$89.99</dd>
                          </div>
                        </div>
                      </dl>
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition-colors flex items-center justify-center">
                      Add to Cart
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}