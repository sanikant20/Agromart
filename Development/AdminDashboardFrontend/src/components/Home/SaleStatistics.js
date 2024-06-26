import React from "react";

const SaleStatistics = () => {
    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Sale Statistics</h5>
                    <img style={{ width: "100%", height: "350px", objectFit: "contain" }} 
                    src="/images/barchart.png"
                    alt="Bar Diagram of sales"
                    ></img>
                </article>
            </div>
        </div>
    )
}

export default SaleStatistics;