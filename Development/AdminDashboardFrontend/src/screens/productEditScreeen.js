import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProduct from "../components/Products/EditProduct";
// import Products from "../data/Products";

// const ProductEdit = ({match}) => {
//     const productId = Products.find((p)=> p._id === match.params.id);

const ProductEdit = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                {/* <EditProduct productId = {productId} /> */}
                <EditProduct />
            </main>
        </div>
    )
}

export default ProductEdit;
