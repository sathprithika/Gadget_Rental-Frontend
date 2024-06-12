import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { Link, useParams } from 'react-router-dom';

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

type Smartphones = {
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

type Smartwatches = {
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


type Payment = {
    PaymentId: number;
    UserId: number;
    id: number;
    AadharNo: string;
    PhoneNo: string;
    UserPhoto: string;
    PaymentMethod: string;
    CardNo: string;
    ExpiryDate: string;
    Amount: string;
};

export default function BuyNow() {

  const {id} = useParams();
    
  const [laptop, setLaptop] = useState<Laptop[]>([]);

  useEffect(() => {
    fetch('/api/laptops/sql/get/' + id , {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((data) => setLaptop(data.results))
      .finally(() => console.log('done'));
  }, [id]);

  const [phone, setphone] = useState<Smartphones[]>([]);

  useEffect(() => {
    fetch('/api/phones/sql/get/' + id , {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((data) => setphone(data.results))
      .finally(() => console.log('done'));
  }, [id]);

  const [watch, setwatch] = useState<Smartwatches[]>([]);

  useEffect(() => {
    fetch('/api/watches/sql/get/' + id , {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((data) => setwatch(data.results))
      .finally(() => console.log('done'));
  }, [id]);

  const [camera, setcamera] = useState<Camera[]>([]);

  useEffect(() => {
    fetch('/api/camera/sql/get/' + id , {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((data) => setcamera(data.results))
      .finally(() => console.log('done'));
  }, [id]);
  
  const [payment, setpayment] = useState<Payment>({
    PaymentId: 0,
    UserId: 0,
    id: 0,
    AadharNo: "",
    PhoneNo: "",
    UserPhoto: "",
    PaymentMethod: "",
    CardNo: "",
    ExpiryDate: "",
    Amount: "",
  });

  const isValidAadharNumber = (aadharNo: string): boolean => {
    // Aadhar number should be exactly 12 digits
    const aadharPattern = /^\d{12}$/;
    return aadharPattern.test(aadharNo);
  };
  
  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Assuming 10-digit phone numbers, but you might want to adjust based on your requirements
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };
  
  const isValidCardNumber = (cardNumber: string): boolean => {
    // Assuming common card number formats: 16 digits with spaces or dashes in between
    const cardPattern = /^(\d{4}[ -]?){3}\d{4}$/;
    return cardPattern.test(cardNumber);
  };
  
  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!isValidAadharNumber(payment?.AadharNo || "")) {
      alert("Invalid Aadhar Number. Please enter a valid 12-digit Aadhar Number.");
      return;
    }
  
    if (!isValidPhoneNumber(payment?.PhoneNo || "")) {
      alert("Invalid Phone Number. Please enter a valid 10-digit phone number.");
      return;
    }
  
    if (!isValidCardNumber(payment?.CardNo || "")) {
      alert("Invalid Card Number. Please enter a valid 16-digit card number.");
      return;
    }
  

    console.log('data submitted');

    alert('Payment successful!');

    fetch('/api/gadgets/sql/new/payment', {
      method: 'POST',
    
      body: JSON.stringify(payment),
    })
      .then((response) => response.json())
      .finally(() => console.log('Payment successfull'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-2xl text-white mb-4">Let's Go</h1>
      <form onSubmit={onSubmitData} className="flex flex-col items-center gap-6">
        
      {laptop.map((laptop, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-md">
    <img src={laptop.imge_url} alt="laptop" className="w-full h-48 object-cover mb-4" />
    <p className="font-bold text-lg mb-2">{laptop.Product_name}</p>
    <p className="text-sm text-gray-600 mb-2">{laptop.Description}</p>
    <p className="text-sm text-gray-600 mb-2">Brand: {laptop.Brand}</p>
    <p className="text-sm text-gray-600 mb-2">Model: {laptop.Model}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Day: {laptop.Rental_price_per_day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Week: {laptop.Rental_price_per_week}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per 15 Days: {laptop.Rental_price_per_15day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Month: {laptop.Rental_price_per_month}</p>
    <p className="text-sm text-gray-600 mb-2">Quantity: {laptop.Quantity}</p>
    <p className="text-sm text-gray-600 mb-2">Rating: {laptop.Rating}</p>
    <p className="text-sm text-gray-600 mb-2">Comment: {laptop.Comment}</p>
  </div>
))}

{phone.map((phone, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-md">
    <img src={phone.imge_url} alt="Smartphones" className="w-full h-48 object-cover mb-4" />
    <p className="font-bold text-lg mb-2">{phone.Product_name}</p>
    <p className="text-sm text-gray-600 mb-2">{phone.Description}</p>
    <p className="text-sm text-gray-600 mb-2">Brand: {phone.Brand}</p>
    <p className="text-sm text-gray-600 mb-2">Model: {phone.Model}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Day: {phone.Rental_price_per_day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Week: {phone.Rental_price_per_week}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per 15 Days: {phone.Rental_price_per_15day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Month: {phone.Rental_price_per_month}</p>
    <p className="text-sm text-gray-600 mb-2">Quantity: {phone.Quantity}</p>
    <p className="text-sm text-gray-600 mb-2">Rating: {phone.Rating}</p>
    <p className="text-sm text-gray-600 mb-2">Comment: {phone.Comment}</p>
  </div>
))}
        {watch.map((watch, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-md">
    <img src={watch.imge_url} alt="Smartwatches" className="w-full h-48 object-cover mb-4" />
    <p className="font-bold text-lg mb-2">{watch.Product_name}</p>
    <p className="text-sm text-gray-600 mb-2">{watch.Description}</p>
    <p className="text-sm text-gray-600 mb-2">Brand: {watch.Brand}</p>
    <p className="text-sm text-gray-600 mb-2">Model: {watch.Model}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Day: {watch.Rental_price_per_day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Week: {watch.Rental_price_per_week}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per 15 Days: {watch.Rental_price_per_15day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Month: {watch.Rental_price_per_month}</p>
    <p className="text-sm text-gray-600 mb-2">Quantity: {watch.Quantity}</p>
    <p className="text-sm text-gray-600 mb-2">Rating: {watch.Rating}</p>
    <p className="text-sm text-gray-600 mb-2">Comment: {watch.Comment}</p>
  </div>
))}
{camera.map((camera, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-md">
    <img src={camera.imge_url} alt="Camera" className="w-full h-48 object-cover mb-4" />
    <p className="font-bold text-lg mb-2">{camera.Product_name}</p>
    <p className="text-sm text-gray-600 mb-2">{camera.Description}</p>
    <p className="text-sm text-gray-600 mb-2">Brand: {camera.Brand}</p>
    <p className="text-sm text-gray-600 mb-2">Model: {camera.Model}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Day: {camera.Rental_price_per_day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Week: {camera.Rental_price_per_week}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per 15 Days: {camera.Rental_price_per_15day}</p>
    <p className="text-sm text-gray-600 mb-2">Rental Price per Month: {camera.Rental_price_per_month}</p>
    <p className="text-sm text-gray-600 mb-2">Quantity: {camera.Quantity}</p>
    <p className="text-sm text-gray-600 mb-2">Rating: {camera.Rating}</p>
    <p className="text-sm text-gray-600 mb-2">Comment: {camera.Comment}</p>
  </div>
))}

        {/* Render other product types similarly */}

        <input
          type="text"
          name="AadharNo"
          placeholder="Enter your AadharNo"
          className='text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.AadharNo}
          onChange={(data) => {
            setpayment({
              ...payment!,
              AadharNo: (data.target.value),
            });
          }}
        />
         <input
          type="text"
          name="PhoneNo"
          placeholder="Enter yourPhoneNo "
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.PhoneNo}
          onChange={(data) => {
            setpayment({
              ...payment!,
              PhoneNo: (data.target.value),
            });
          }}
        />
        <input
          type="text"
          name="UserPhoto"
          placeholder="Enter your UserPhoto"
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.UserPhoto}
          onChange={(data) => {
            setpayment({
              ...payment!,
              UserPhoto: data.target.value,
            });
          }}
        />
        <input
          type="text"
          name="Amount"
          placeholder="Enter your TotalAmount"
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.Amount}
          onChange={(data) => {
            setpayment({
              ...payment!,
              Amount: data.target.value,
            });
          }}
        />
        <input
          type="text"
          name="PaymentMethod"
          placeholder="Enter your PaymentMethod"
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.PaymentMethod}
          onChange={(data) => {
            setpayment({
              ...payment!,
              PaymentMethod: data.target.value,
            });
          }}
        />
        <input
          type="text"
          name="CardNo"
          placeholder="Enter your CardNo"
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.CardNo}
          onChange={(data) => {
            setpayment({
              ...payment!,
              CardNo: data.target.value,
            });
          }}
        />
        <input
          type="text"
          name="ExpiryDate"
          placeholder="Enter your ExpiryDate"
          className=' text-black bg-white border border-blue-500 px-9 mb-4 rounded-md'
          value={payment?.ExpiryDate}
          onChange={(data) => {
            setpayment({
              ...payment!,
              ExpiryDate: data.target.value,
            });
          }}
        />

        
        
        <button type="submit" className='bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600'>Pay Bill</button>
      </form>
    </div>
  );
}