import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AdminProfileMain from "../components/Admin/AdminProfileMain";

const AdminScreen = () => {
    return (
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AdminProfileMain />
            </main>
        </div>
    )
}

export default AdminScreen;
