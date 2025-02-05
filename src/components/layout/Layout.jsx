import { useLocation } from 'react-router-dom';
import SidebarLayout from './sidebar/SidebarLayout';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex">
      {!hideSidebar && <SidebarLayout />}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
