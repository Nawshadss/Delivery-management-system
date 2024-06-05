import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar></Sidebar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
