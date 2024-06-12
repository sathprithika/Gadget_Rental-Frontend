import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Smartwatch = {
  id: number;
  Product_name: string;
  Description: string;
  Brand: string;
  Model: string;
  Rental_price_per_day: number;
  Rental_price_per_week: number;
  Rental_price_per_15day: number;
  Rental_price_per_month: number;
  Quantity: number;
  imge_url: string;
  Rating: number;
  Comment: string;
};

export default function Smartwatches() {
  const [watches, setWatches] = useState<Smartwatch[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredWatches, setFilteredWatches] = useState<Smartwatch[]>([]);
  const [cartItems, setCartItems] = useState<Smartwatch[]>([]);

  useEffect(() => {
    fetch('/api/watches/sql/get-all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setWatches(data.results))
      .finally(() => console.log('done'));
  }, []);

  useEffect(() => {
    const filteredWatches = watches.filter((watch) => {
      return watch.Model.includes(search);
    });
    setFilteredWatches(filteredWatches);
  }, [search]);

  const addToCart = (id: number) => {
    const selectedWatch = watches.find((watch) => watch.id === id);
    if (selectedWatch) {
      fetch('/api/gadgets/sql/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedWatch),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Item added to cart:', data);
          setCartItems([...cartItems, selectedWatch]);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Smartwatches</h2>
      <input
        type="text"
        value={search}
        placeholder="Search something"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {search.length > 0
          ? filteredWatches.map((watch) => (
              <Link to={`/watches/search/${watch.id}`} key={watch.id}>
                <div className="border border-gray-300 rounded-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <img src={watch.imge_url} alt="watch" className="w-full mb-2" />
                  <p className="text-lg font-semibold">{watch.Model}</p>
                </div>
              </Link>
            ))
          : watches.map((watch) => (
              <div key={watch.id} className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <img src={watch.imge_url} alt="watch" className="w-full mb-2" />
                <p className="text-lg font-semibold mb-2">{watch.Model}</p>
                <p>Id: {watch.id}</p>
                <p className="mb-2">{watch.Description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{watch.Brand}</p>
                  <p className="text-gray-700">Rating: {watch.Rating}</p>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <p className="text-blue-600 font-semibold">${watch.Rental_price_per_day}/day</p>
                    <p className="text-blue-600 font-semibold">${watch.Rental_price_per_week}/week</p>
                    <p className="text-blue-600 font-semibold">${watch.Rental_price_per_15day}/15day</p>
                    <p className="text-blue-600 font-semibold">${watch.Rental_price_per_month}/month</p>
                  </div>
                  <div className="mb-4">
                    <Link to={`/cart/${watch.id}`}>
                      <button
                        onClick={() => addToCart(watch.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
                      >
                        ADD TO CART
                      </button>
                    </Link>
                    <Link to={`/buy/${watch.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        RENT NOW
                      </button>
                    </Link>
                  </div>
                  <p className="text-gray-700">Comments: {watch.Comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}