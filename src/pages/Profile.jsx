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
    <div className="max-w-2xl min-h-screen mx-auto p-4">
      <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <FiUser size={48} className="text-gray-500" />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-center text-gray-800">
            Profile
          </h1>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">User ID:</span>
              <span className="text-gray-800">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Username:</span>
              <span className="text-gray-800">{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="text-gray-800">{user.role}</span>
            </div>
            {user.created_at && (
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Joined At:</span>
                <span className="text-gray-800">
                  {new Date(user.created_at).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
