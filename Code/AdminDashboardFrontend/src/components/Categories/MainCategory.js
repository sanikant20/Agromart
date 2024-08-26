import React from "react";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";

const MainCategory = () =>{
    return(
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Categories</h2>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row">
                        <CreateCategory></CreateCategory>
                        <CategoryTable></CategoryTable>
                    </div>
                </div>
            </div>
        </section>
    )};

export default MainCategory;
