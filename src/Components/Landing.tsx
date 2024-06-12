import React from 'react';

const gadget = "https://i.postimg.cc/xdbWHpX4/landing.jpg";

export default function Landing() {
  return (
    <div className="relative">
      <div className="relative">
        <img src={gadget} alt="Example" className="w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Gadget Rental Website</h1>
          <p className="text-lg mb-8 text-white font-bold">
  Rent the latest gadgets and accessories!!
</p>

          
        </div>
      </div>
    </div>
  );
}