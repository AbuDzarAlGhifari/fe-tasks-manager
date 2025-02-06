import Sidebar from './Sidebar';
import { SidebarProvider } from './SidebarProvider';

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="absolute h-full lg:relative lg:h-screen">
        <Sidebar />
        <div className="fixed lg:flex-1 pt-16">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
