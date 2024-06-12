import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Laptop = {
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
  User_id: number;
  Rating: number;
  Comment: string;
};

export default function Laptops() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]);
  const [cartItems, setCartItems] = useState<Laptop[]>([]);

  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('data submitted');
  };

  useEffect(() => {
    fetch('/api/laptops/sql/get-all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setLaptops(data.results))
      .finally(() => console.log('done'));
  }, []);

  useEffect(() => {
    const filteredLaptops = laptops.filter((lap) => {
      return lap.Model.includes(search);
    });
    setFilteredLaptops(filteredLaptops);
  }, [search]);

  const addToCart = (id: number) => {
    const selectedLaptop = laptops.find((lap) => lap.id === id);
    if (selectedLaptop) {
      fetch('/api/gadgets/sql/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedLaptop),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Item added to cart:', data);
          setCartItems([...cartItems, selectedLaptop]);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Laptops</h2>
      <input
        type="text"
        value={search}
        placeholder="Search something"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
        {search.length > 0
          ? filteredLaptops.map((lap) => (
              <Link to={`/search/${lap.id}`} key={lap.id}>
                <div className="border border-gray-300 rounded-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <img src={lap.imge_url} alt="laptop" className="w-full mb-2" />
                  <p className="text-lg font-semibold">{lap.Model}</p>
                </div>
              </Link>
            ))
          : laptops.map((laptop) => (
              <div key={laptop.id} className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-full"> {/* Fixed height for each item */}
                <img src={laptop.imge_url} alt="laptop" className="w-full mb-2" />
                <p className="text-lg font-semibold mb-2">{laptop.Model}</p>
                <p>Id: {laptop.id}</p>
                <p className="mb-2">{laptop.Description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{laptop.Brand}</p>
                  <p className="text-gray-700">Rating: {laptop.Rating}</p>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <p className="text-blue-600 font-semibold">${laptop.Rental_price_per_day}/day</p>
                    <p className="text-blue-600 font-semibold">${laptop.Rental_price_per_week}/week</p>
                    <p className="text-blue-600 font-semibold">${laptop.Rental_price_per_15day}/15day</p>
                    <p className="text-blue-600 font-semibold">${laptop.Rental_price_per_month}/month</p>
                  </div>
                  <div className="mb-4">
                    <Link to={`/cart/${laptop.id}`}>
                      <button
                        onClick={() => addToCart(laptop.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
                      >
                        ADD TO CART
                      </button>
                    </Link>
                    <Link to={`/buy/${laptop.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        RENT NOW
                      </button>
                    </Link>
                  </div>
                  <p className="text-gray-700">Comments: {laptop.Comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}