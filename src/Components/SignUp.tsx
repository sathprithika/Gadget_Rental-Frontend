import React, { useState } from 'react';

type SignUp = {
  Username: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  Checkpassword: string;
};

export default function SignUp() {
  const [signup, setsignup] = useState<SignUp>({
    Username: '',
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
    Checkpassword: '',
  });

  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!signup.Username || !signup.Firstname || !signup.Lastname || !signup.Email || !signup.Password || !signup.Checkpassword) {
      setError('Please fill in all fields');
    } else if (signup.Password !== signup.Checkpassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Perform signup action here
      fetch('/api/gadgets/sql/signup', {
        method: 'POST',
        body: JSON.stringify(signup),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Signup successful');
          // Redirect or handle success accordingly
        })
        .catch((error) => {
          console.error('Error signing up:', error);
          // Handle error
        });

        alert('Signup successful!');
    }
  };

  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };
  


  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'url(https://i.postimg.cc/4d9h56fK/Whats-App-Image-2024-03-13-at-19-16-52-41c3dbde.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-80 px-28 py-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl text-gray-800 mb-4">Let's Go</h1>
        <form onSubmit={onSubmitData} className="flex flex-col gap-4">
          <input
            type="text"
            name="Username"
            placeholder="Enter your name"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Username}
            onChange={(data) => {
              setsignup({
                ...signup,
                Username: data.target.value,
              });
            }}
          />
          <input
            type="text"
            name="Firstname"
            placeholder="Enter your Firstname"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Firstname}
            onChange={(data) => {
              setsignup({
                ...signup,
                Firstname: data.target.value,
              });
            }}
          />
          <input
            type="text"
            name="Lastname"
            placeholder="Enter your Lastname"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Lastname}
            onChange={(data) => {
              setsignup({
                ...signup,
                Lastname: data.target.value,
              });
            }}
          />
          <input
            type="text"
            name="Email"
            placeholder="Enter your Email"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Email}
            onChange={(data) => {
              setsignup({
                ...signup,
                Email: data.target.value,
              });
            }}
          />
          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Password}
            onChange={(data) => {
              setsignup({
                ...signup,
                Password: data.target.value,
              });
            }}
          />
          <input
            type="password"
            name="Checkpassword"
            placeholder="Again enter your password"
            className="text-black bg-gray-200 border border-blue-500 px-8 py-2 rounded-md"
            value={signup.Checkpassword}
            onChange={(data) => {
              setsignup({
                ...signup,
                Checkpassword: data.target.value,
              });
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
