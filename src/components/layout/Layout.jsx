import { useLocation } from 'react-router-dom';
import SidebarLayout from '../common/sidebar/SideBarLayout';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex">
      {!hideSidebar && <SidebarLayout />}
      <main className="flex-1 h-screen overflow-y-auto p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
