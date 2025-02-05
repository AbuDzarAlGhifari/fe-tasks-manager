import React, { useContext } from 'react';
import { FiLogOut, FiHome, FiUser, FiUsers } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white text-gray-800 py-4 px-6 flex justify-between items-center border-b border-gray-200 shadow">
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
        >
          <FiHome size={20} />
          <span className="font-sans text-lg">Home</span>
        </Link>

        {user && (
          <Link
            to="/groups"
            className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
          >
            <FiUsers size={20} />
            <span className="font-sans text-lg">Groups</span>
          </Link>
        )}

        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
          >
            <FiUsers size={20} />
            <span className="font-sans text-lg">Admin</span>
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-1">
            <FiUser size={20} className="text-gray-800" />

            <Link
              to="/profile"
              className="font-sans text-gray-800 hover:text-blue-500 transition-colors duration-200"
            >
              {user.username}
            </Link>
          </div>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition-colors duration-200"
          >
            <FiLogOut size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
