import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProduct from "../components/Products/EditProduct";

const ProductEdit = ({ match }) => {
    // console.log("ProductID", match.params.id)
    return (
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                {/* <EditProduct productId={match.params.id} /> */}
                <EditProduct />
            </main>
        </div>
    );
};

export default ProductEdit;
