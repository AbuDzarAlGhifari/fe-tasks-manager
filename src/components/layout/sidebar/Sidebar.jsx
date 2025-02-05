import React, { useContext, useEffect, useRef } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { FiHome, FiLogOut, FiUser, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useSidebar } from './SidebarProvider';

const SideBar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const sidebarRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Header untuk Mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white shadow-md lg:hidden">
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <FaBars className="w-6 h-6 text-black" />
        </button>
        <Link to="/" className="text-lg font-bold">
          LOGO
        </Link>
      </header>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white text-gray-800 flex flex-col border-r 
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Header di dalam Sidebar (hanya untuk mobile) */}
        <div className="flex items-center justify-between px-4 py-4 border-b lg:hidden">
          <span className="text-xl font-bold">LOGO</span>
          <button onClick={() => setSidebarOpen(false)} className="p-2">
            <FaXmark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b hidden lg:block">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
          >
            <FiHome size={20} />
            <span className="font-sans text-lg">Home</span>
          </Link>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            {user && (
              <li>
                <Link
                  to="/groups"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
                >
                  <FiUsers size={20} />
                  <span className="font-sans text-lg">Groups</span>
                </Link>
              </li>
            )}
            {user?.role === 'admin' && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
                >
                  <FiUsers size={20} />
                  <span className="font-sans text-lg">Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Bagian Bawah */}
        <div className="p-6 border-t">
          {user && (
            <div className="flex items-center space-x-2">
              <FiUser size={20} className="text-gray-800" />
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className="font-sans text-gray-800 hover:text-blue-500 transition-colors duration-200"
              >
                {user.username}
              </Link>
            </div>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span className="ml-2">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
