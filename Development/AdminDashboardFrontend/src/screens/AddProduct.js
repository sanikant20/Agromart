import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddProductMain from "../components/Products/AddProductMain";
const AddProducts = () =>{
    return(
        <div>
            <Sidebar></Sidebar>
            <main className="main-wrap">
                <Header></Header>
                <AddProductMain></AddProductMain>
            </main>

        </div>
    )
}

export default AddProducts;
