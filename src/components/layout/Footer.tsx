import React from 'react';
import { Frame, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Frame className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">FrameCraft</span>
            </div>
            <p className="text-sm">
              Crafting perfect frames for your precious moments since 1970.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Shop</a></li>
              <li><a href="#" className="hover:text-white">Custom Frames</a></li>
              <li><a href="#" className="hover:text-white">Upload Photo</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                support@framecraft.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                1-800-FRAMES
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Frame Street, NY
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} FrameCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}