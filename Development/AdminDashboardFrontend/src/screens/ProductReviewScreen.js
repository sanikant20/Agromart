import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductReview from '../components/Products/productReview'

const ProductEdit = () => {
    return (
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <ProductReview />
            </main>
        </div>
    );
};

export default ProductEdit;
