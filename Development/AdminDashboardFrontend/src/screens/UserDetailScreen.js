import React from "react";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserDetail from "../components/Users/UserDetails";


const UserDetailScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <UserDetail />
            </main>

        </div>
    )
}

export default UserDetailScreen;
