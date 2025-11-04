import { Outlet } from "react-router-dom";
import { DefaultSidebar } from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <DefaultSidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
