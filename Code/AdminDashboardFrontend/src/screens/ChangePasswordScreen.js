import React from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChangePasswordMain from "../components/Admin/ChangePasswordMain";


const ChangePasswordScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <ChangePasswordMain />
            </main>
        </div>
    )
}

export default ChangePasswordScreen;
