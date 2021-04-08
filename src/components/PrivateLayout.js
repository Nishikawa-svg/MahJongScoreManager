import React, { useState } from "react";
import PrivateNavbar from "./PrivateNavbar";
import PrivateSidebar from "./PrivateSidebar";

const PrivateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  return (
    <div>
      <PrivateNavbar openSidebar={openSidebar} />
      <PrivateSidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
    </div>
  );
};

export default PrivateLayout;
