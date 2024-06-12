import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Smartphone = {
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

export default function Smartphones() {
  const [phones, setPhones] = useState<Smartphone[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredPhones, setFilteredPhones] = useState<Smartphone[]>([]);
  const [cartItems, setCartItems] = useState<Smartphone[]>([]);

  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('data submitted');
  };

  useEffect(() => {
    fetch('/api/phones/sql/get-all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setPhones(data.results))
      .finally(() => console.log('done'));
  }, []);

  useEffect(() => {
    const filteredPhones = phones.filter((ph) => {
      return ph.Model.includes(search);
    });
    setFilteredPhones(filteredPhones);
  }, [search]);

  const addToCart = (id: number) => {
    const selectedPhone = phones.find((ph) => ph.id === id);
    if (selectedPhone) {
      fetch('/api/gadgets/sql/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPhone),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Item added to cart:', data);
          setCartItems([...cartItems, selectedPhone]);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Smartphones</h2>
      <input
        type="text"
        value={search}
        placeholder="Search something"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {search.length > 0
          ? filteredPhones.map((ph) => (
              <Link to={`/phone/search/${ph.id}`} key={ph.id}>
                <div className="border border-gray-300 rounded-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <img src={ph.imge_url} alt="phone" className="w-full mb-2" />
                  <p className="text-lg font-semibold">{ph.Model}</p>
                </div>
              </Link>
            ))
          : phones.map((phone) => (
              <div key={phone.id} className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <img src={phone.imge_url} alt="phone" className="w-full mb-2" />
                <p className="text-lg font-semibold mb-2">{phone.Model}</p>
                <p>Id: {phone.id}</p>
                <p className="mb-2">{phone.Description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{phone.Brand}</p>
                  <p className="text-gray-700">Rating: {phone.Rating}</p>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <p className="text-blue-600 font-semibold">${phone.Rental_price_per_day}/day</p>
                    <p className="text-blue-600 font-semibold">${phone.Rental_price_per_week}/week</p>
                    <p className="text-blue-600 font-semibold">${phone.Rental_price_per_15day}/15day</p>
                    <p className="text-blue-600 font-semibold">${phone.Rental_price_per_month}/month</p>
                  </div>
                  <div className="mb-4">
                    <Link to={`/cart/${phone.id}`}>
                      <button
                        onClick={() => addToCart(phone.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
                      >
                        ADD TO CART
                      </button>
                    </Link>
                    <Link to={`/phone/buy/${phone.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        RENT NOW
                      </button>
                    </Link>
                  </div>
                  <p className="text-gray-700">Comments: {phone.Comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}