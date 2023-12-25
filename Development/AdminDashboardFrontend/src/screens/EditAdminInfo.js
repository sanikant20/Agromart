import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditAdminProfile from "../components/Admin/EditAdminProfile";

const EditAdminInfo = () =>{
    return(
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditAdminProfile />

            </main>

        </div>
    )
}

export default EditAdminInfo;
