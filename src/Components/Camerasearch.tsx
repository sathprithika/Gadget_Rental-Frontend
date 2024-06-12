 import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

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

export default function Camerasearch() {

    const {id} = useParams();
    
    const [camera, setcamera] = useState<Camera[]>([]);
    const [cartItems, setCartItems] = useState<Camera[]>([]);

  useEffect(() => {
    fetch('/api/camera/sql/get/' + id , {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((data) => setcamera(data.results))
      .finally(() => console.log('done'));
  }, [id]);

  const addToCart = (id: number) => {
    const selectedLaptop = camera.find((lap) => lap.id === id);
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
      <h2 className="text-3xl font-bold mb-4">Cameras</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { camera.map((camera) => (
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
                    <Link to={`/camera/buy/${camera.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        BUY NOW
                      </button>
                    </Link>
                  </div>
                  <p className="text-gray-700">Comments: {camera.Comment}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
