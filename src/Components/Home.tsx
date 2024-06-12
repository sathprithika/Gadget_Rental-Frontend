// import React from 'react';
import { Link } from 'react-router-dom';

const home = "https://i.postimg.cc/sD6DMBzb/Whats-App-Image-2024-03-13-at-18-51-05-075c9da3.jpg";

export default function Home() {
  return (
    <div className="bg-gray-900 h-screen">
      <div className="relative flex flex-col items-center justify-center h-full">
        <img src={home} alt="Background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to GadgetHub</h1>
          <p className="text-lg mb-8 text-white font-semibold text-shadow-md">
  Experience the Future with Our Premium Gadgets and Accessories!
</p>

          <div className="flex flex-row gap-5">
            <Link to="/laptop">
              <button className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                LAPTOPS
              </button>
            </Link>
            <Link to="/phones">
              <button className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                PHONES
              </button>
            </Link>
            <Link to="/smartwatches">
              <button className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                SMARTWATCHES
              </button>
            </Link>
            <Link to="/camera">
              <button className="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                CAMERA
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}