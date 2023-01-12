import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-12 p-3 gap-3 h-screen w-screen">
      <Sidebar />
      <div className="col-span-10 w-full bg-gray-100 rounded-lg p-4 overflow-x-hidden">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
