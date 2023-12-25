import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainOrder from "../components/Orders/MainOrder";

const OrderScreen = () =>{
    return(
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <MainOrder></MainOrder>

            </main>

        </div>
    )
}

export default OrderScreen;
