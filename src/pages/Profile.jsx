import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FiUser } from 'react-icons/fi';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <FiUser size={24} /> Profile
      </h1>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">User ID:</span>{' '}
        <span className="text-gray-800">{user.id}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Username:</span>{' '}
        <span className="text-gray-800">{user.username}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Email:</span>{' '}
        <span className="text-gray-800">{user.email}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Role:</span>{' '}
        <span className="text-gray-800">{user.role}</span>
      </div>
      {user.created_at && (
        <div className="mb-4">
          <span className="font-semibold text-gray-700">Joined At:</span>{' '}
          <span className="text-gray-800">
            {new Date(user.created_at).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Profile;
