import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user } = useAuth0();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex items-center mb-4">
        <img src={user?.picture} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
        <p className="text-lg">Welcome, {user?.name}</p>
      </div>
      <p className="text-gray-600">Email: {user?.email}</p>
    </div>
  );
}

export default Profile;