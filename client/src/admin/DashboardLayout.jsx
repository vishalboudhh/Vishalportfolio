import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
