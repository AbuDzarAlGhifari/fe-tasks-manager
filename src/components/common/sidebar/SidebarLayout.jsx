import SideBar from './SideBar';
import { SidebarProvider } from './SidebarProvider';

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex">
        <SideBar />
        <div className="flex-1 pt-16">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
