import React from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditCategory from "../components/Categories/EditCategory"


const CategoryScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <EditCategory></EditCategory>
            </main>
        </div>
    )
}

export default CategoryScreen;
