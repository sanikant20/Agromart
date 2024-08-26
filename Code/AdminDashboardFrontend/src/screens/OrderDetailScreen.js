import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainOrderDetails from "../components/Orders/OrderDetailsMain";

const OrderDetails = () => {
    return (
        <div>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainOrderDetails />
            </main>   
        </div>
    );
}

export default OrderDetails;
