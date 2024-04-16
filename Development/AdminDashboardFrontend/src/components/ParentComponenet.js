import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ParentComponent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar toggleSidebar={toggleSidebar} />
            {/* Other content */}
        </div>
    );
};

export default ParentComponent;
