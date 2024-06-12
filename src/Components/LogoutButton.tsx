import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;