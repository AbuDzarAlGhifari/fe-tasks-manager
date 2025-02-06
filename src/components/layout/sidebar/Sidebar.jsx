import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdOutlineAddTask } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useSidebar } from './SidebarProvider';
import UserDropdown from './UserDropdown';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const sidebarRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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

  const linkClass = ({ isActive }) =>
    `flex items-center  ${
      collapsed ? 'justify-center' : 'space-x-2'
    } transition-colors duration-200 ${
      isActive ? 'text-blue-500' : 'hover:text-blue-500'
    }`;

  return (
    <>
      {/* Header Mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white shadow-md lg:hidden">
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <FaBars className="w-6 h-6 text-black" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`relative top-0 left-0 z-50 h-full bg-white text-gray-800 flex flex-col shadow transition-all duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-20' : 'w-52'}
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Header Mobile */}
        <div className="flex items-center justify-between px-4 shadow pt-4 pb-2 lg:hidden">
          <button onClick={() => setSidebarOpen(false)} className="p-2">
            <FaXmark className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute hidden sm:block top-1/2 right-[-16px] bg-white hover:text-gray-900 hover:bg-gray-200 p-2 rounded-full shadow z-50"
        >
          {collapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>

        {/* Judul / Logo */}
        <div className="p-6">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
          >
            {collapsed ? (
              <span className="font-sans text-2xl font-bold">TM</span>
            ) : (
              <span className="font-sans text-2xl font-bold">Task Manager</span>
            )}
          </Link>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            {user && (
              <li>
                <NavLink
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className={linkClass}
                >
                  <MdOutlineAddTask size={20} />
                  {!collapsed && (
                    <span className="font-sans text-lg">Task</span>
                  )}
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to="/groups"
                  onClick={() => setSidebarOpen(false)}
                  className={linkClass}
                >
                  <FiUsers size={20} />
                  {!collapsed && (
                    <span className="font-sans text-lg">Group</span>
                  )}
                </NavLink>
              </li>
            )}
            {user?.role === 'admin' && (
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={linkClass}
                >
                  <RiAdminLine size={20} />
                  {!collapsed && (
                    <span className="font-sans text-lg">Admin</span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Komponen UserDropdown */}
        <UserDropdown
          user={user}
          handleLogout={handleLogout}
          collapsed={collapsed}
        />
      </aside>
    </>
  );
};

export default Sidebar;
