import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';

const UserDropdown = ({ user, handleLogout, collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Mendaftarkan event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Membersihkan event listener saat unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative p-4 mt-auto" ref={containerRef}>
      {user && (
        <div
          className={`relative bg-blue-500 cursor-pointer hover:bg-blue-600 p-2 rounded-lg shadow ${
            collapsed ? 'flex justify-center' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Tombol User */}
          <div className="flex items-center gap-2 w-full text-white focus:outline-none">
            <FiUsers size={20} />
            {!collapsed && (
              <span className="font-sans text-lg capitalize">
                {user.username}
              </span>
            )}
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div
              className={`absolute z-50 w-40 bg-white shadow-lg rounded-md border transition-all duration-200 ${
                collapsed
                  ? // Saat collapsed, posisikan dropdown di sebelah kanan ikon
                    'left-full ml-2 -top-11'
                  : // Saat expanded, posisikan dropdown di atas tombol
                    'right-0 bottom-full mb-2 -translate-y-4'
              }`}
            >
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
