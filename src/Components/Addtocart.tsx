import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Cart = {
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
  id: number;
  Rating: number;
  Comment: string;
};

export default function AddToCart() {
  const [carts, setcarts] = useState<Cart[]>([]);

  const handleIncrement = (id: number) => {
    setcarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === id ? { ...cart, Quantity: cart.Quantity + 1 } : cart
      )
    );
  };

  const handleDecrement = (id: number) => {
    setcarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === id && cart.Quantity > 0
          ? { ...cart, Quantity: cart.Quantity - 1 }
          : cart
      )
    );
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetch('/api/gadgets/sql/cart/get-all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setcarts(data.results))
      .finally(() => console.log('done'));
  }, []);

  async function deletecart(id: number) {
    
      const response = await fetch(`/api/gadgets/sql/cart/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Item successfully deleted, update the state or perform any other necessary actions
        console.log('Cart item deleted');
        // Update the state to reflect the changes
        setcarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
      } else {
        console.error('Failed to delete cart item');
      }
    
  }

  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">ADD TO CART</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {carts.map((cart, index) => (
          <div key={index} className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <img src={cart.imge_url} alt="Product" className="w-full h-48 object-cover mb-4" />
            <p className="font-bold text-lg mb-2">{cart.Product_name}</p>
            <p className="text-sm text-gray-600 mb-2">{cart.Description}</p>
            <p className="text-gray-800 mb-2">Brand: {cart.Brand}</p>
            <p className="text-gray-800 mb-2">Model: {cart.Model}</p>
            <p className="text-gray-800 mb-2">Price per day: ${cart.Rental_price_per_day}</p>
            <p className="text-gray-800 mb-2">Price per week: ${cart.Rental_price_per_week}</p>
            <p className="text-gray-800 mb-2">Price per 15 days: ${cart.Rental_price_per_15day}</p>
            <p className="text-gray-800 mb-2">Price per month: ${cart.Rental_price_per_month}</p>
            <p className="text-gray-800 mb-2">Rating: {cart.Rating}</p>
            <p className="text-gray-800 mb-2">Comment: {cart.Comment}</p>

            <div className='icon flex items-center space-x-4'>
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => handleDecrement(cart.id)}
              >
                -
              </button>
              <span>{cart.Quantity}</span>
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => handleIncrement(cart.id)}
              >
                +
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-blue-500 hover:text-blue-700 font-bold">
              <button onClick={() => deletecart(cart.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">DELETE</button>
              </div>
            

              <Link to={`/buy/${cart.id}`} className="text-blue-500 hover:text-blue-700 font-bold">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">RENT NOW</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}