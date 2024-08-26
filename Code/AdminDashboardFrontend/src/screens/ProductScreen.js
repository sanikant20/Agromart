import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainProducts from "../components/Products/MainProduct";


const ProductScreen = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap ml-20">
                <Header></Header>
                <MainProducts></MainProducts>
            </main>
        </div>
    )
}

export default ProductScreen;