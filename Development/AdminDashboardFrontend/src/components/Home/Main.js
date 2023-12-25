import React from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SaleStatistics";
import ProductsStatics from "./ProductsStatics";
import LatestOrder from "./LatestOrder";

const Main = () => {
    return (
       
            <section className="content-main">
                <div content-header>
                    <h2 className="content-title">Dashboard</h2>
                </div>

                {/* Top Total */}
                < TopTotal />

                <div className="row">
                    {/* Bar chart */}
                    < SaleStatistics />
                    < ProductsStatics />
                </div>

                {/* Latest Order */}
                <div className="card mb-4 shadow-sm">
                    < LatestOrder />
                </div>
            </section>
       
    )
}

export default Main;