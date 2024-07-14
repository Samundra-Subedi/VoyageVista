import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 md:px-8 lg:px-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-2">Travel</h2>
            <p className="text-sm text-gray-600">
              Book your trip in minute, get full Control for much longer.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Explore</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Github</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Help/FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Faceboook</a></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Recomendations</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Home Stays</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Nature</a></li>
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          All rights Travel
        </div>
      </div>
    </footer>
  );
};

export default Footer;