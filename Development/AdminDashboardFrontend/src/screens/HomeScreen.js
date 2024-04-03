import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../components/Home/Main"
const HomeScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <Main />
            </main>
        </>
    )
}

export default HomeScreen;
