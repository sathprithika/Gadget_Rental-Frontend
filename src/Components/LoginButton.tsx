import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const buttonStyle = {
    backgroundImage: 'url("https://i.postimg.cc/KYn2D4XG/Whats-App-Image-2024-03-13-at-18-50-29-c9ad62a8.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return !isAuthenticated && (
    <div className="flex justify-center items-center h-screen" style={buttonStyle}>
      <button 
        onClick={(event: any) => loginWithRedirect(event)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out"
      >
        Log in
      </button>
    </div>
  );
}

export default LoginButton;