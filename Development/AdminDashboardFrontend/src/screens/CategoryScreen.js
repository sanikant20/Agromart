import React from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainCategory from "../components/Categories/MainCategory"


const CategoryScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <MainCategory></MainCategory>
            </main>
        </div>
    )
}

export default CategoryScreen;
