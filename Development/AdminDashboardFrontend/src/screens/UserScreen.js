import React from "react";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserMain from "../components/Users/UserMain";


const UserScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <UserMain></UserMain>
            </main>

        </div>
    )
}

export default UserScreen;
