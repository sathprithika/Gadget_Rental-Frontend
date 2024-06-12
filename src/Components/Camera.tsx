import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Camera = {
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

export default function Camera() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredCameras, setFilteredCameras] = useState<Camera[]>([]);
  const [cartItems, setCartItems] = useState<Camera[]>([]);

  // const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('data submitted');
  // };

  useEffect(() => {
    fetch('/api/camera/sql/get-all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setCameras(data.results))
      .finally(() => console.log('done'));
  }, []);

  useEffect(() => {
    const filteredCameras = cameras.filter((cam) => {
      return cam.Model.includes(search);
    });
    setFilteredCameras(filteredCameras);
  }, [search]);

  const addToCart = (id: number) => {
    const selectedCamera = cameras.find((cam) => cam.id === id);
    if (selectedCamera) {
      fetch('/api/gadgets/sql/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCamera),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Item added to cart:', data);
          setCartItems([...cartItems, selectedCamera]);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Cameras</h2>
      <input
        type="text"
        value={search}
        placeholder="Search something"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {search.length > 0
          ? filteredCameras.map((cam) => (
              <Link to={`/camera/search/${cam.id}`} key={cam.id}>
                <div className="border border-gray-300 rounded-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <img src={cam.imge_url} alt="camera" className="w-full mb-2" />
                  <p className="text-lg font-semibold">{cam.Model}</p>
                </div>
              </Link>
            ))
          : cameras.map((camera) => (
              <div key={camera.id} className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <img src={camera.imge_url} alt="camera" className="w-full mb-2" />
                <p className="text-lg font-semibold mb-2">{camera.Model}</p>
                <p>Id: {camera.id}</p>
                <p className="mb-2">{camera.Description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{camera.Brand}</p>
                  <p className="text-gray-700">Rating: {camera.Rating}</p>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <p className="text-blue-600 font-semibold">${camera.Rental_price_per_day}/day</p>
                    <p className="text-blue-600 font-semibold">${camera.Rental_price_per_week}/week</p>
                    <p className="text-blue-600 font-semibold">${camera.Rental_price_per_15day}/15day</p>
                    <p className="text-blue-600 font-semibold">${camera.Rental_price_per_month}/month</p>
                  </div>
                  <div className="mb-4">
                    <Link to={`/cart/${camera.id}`}>
                      <button
                        onClick={() => addToCart(camera.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
                      >
                        ADD TO CART
                      </button>
                    </Link>
                    <Link to={`/buy/${camera.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        RENT NOW
                      </button>
                    </Link>
                  </div>
                  <p className="text-gray-700">Comments: {camera.Comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}