import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  return (
    <div>
      <Navbar openSidebar={openSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Layout;
