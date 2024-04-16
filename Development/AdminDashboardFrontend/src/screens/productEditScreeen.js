import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProduct from "../components/Products/EditProduct";

const ProductEdit = () => {
    return (
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditProduct />
            </main>
        </div>
    );
};

export default ProductEdit;
