import React from "react";
import { Link } from "react-router-dom";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailsProducts";

const OrderDetailMain = () => {
    return (
        <section className="content-main">
            <div className="content-header">
                <Link to="/orders" className="btn btn-dark text-white"> Back to Order</Link>
            </div>

            <div className="card">
                <header className="card-header p-3 Header-green">
                    <div className="col-lg-6 col-md-6">
                        <span>
                            <i className="far fa-calendar-alt mx-2"></i>
                            <b className="text-black">Dec 14, 2023</b>
                        </span>
                        <br />
                        <small className="text-black mx-3">Order ID: 23r32534t2rf34t5332</small>
                    </div>


                    <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-item-center">
                        <select className="form-select d-inline-block" style={{ maxWidth: "200px" }}>
                            <option>Change status</option>
                            <option>Awaiting payment</option>
                            <option>Confirmed</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                        </select>

                        <Link to="#" className="btn btn-success ms-2">
                            <i className="fas fa-print"></i>
                        </Link>
                    </div>
                </header>
                <div className="card-body">

                    {/* Order information */}
                    <OrderDetailInfo></OrderDetailInfo>

                    <div className="row">
                        <div className="col-lg-9">
                            <div className="table-responsive">
                                <OrderDetailProducts></OrderDetailProducts>
                            </div>
                        </div>

                        {/* Payment details */}
                        <div className="col-lg-3">
                            <div className="box shadow-sm bg-light">
                                <button className="btn btn-dark col-12">
                                    Mark as Delivered
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderDetailMain;
