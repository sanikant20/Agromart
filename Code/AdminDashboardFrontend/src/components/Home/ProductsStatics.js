import React from "react";

const ProductsStatics = () => {
    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Products Statistics</h5>
                    <img style={{ width: "100%", height: "350px", objectFit: "contain" }}
                    src="/images/piechart.png"
                    alt="Pie chart of Products"
                    ></img>
                </article>
            </div>
        </div>
    )
}

export default ProductsStatics;