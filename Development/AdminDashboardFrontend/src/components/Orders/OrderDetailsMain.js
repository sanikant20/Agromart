import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailsProducts";
import { useParams } from 'react-router-dom';

const OrderDetailMain = () => {
    const params = useParams();
    const [order, setOrder] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('');
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderResponse = await fetch(`http://localhost:5000/api/singleOrderData/${params.id}`);
                if (!orderResponse.ok) {
                    throw new Error('Failed to fetch order data');
                }
                const orderData = await orderResponse.json();
                setOrder(orderData);
                setCurrentStatus(orderData.orderStatus);
            } catch (error) {
                console.error("Error while fetching order data: ", error);
                // Handle error
            }
        };
        fetchOrder();
    }, [params.id]);

    useEffect(() => {
        const handleOrderStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/changeOrderStatus/${params.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newStatus })
                });
                if (!response.ok) {
                    throw new Error('Failed to update order status');
                }
                console.log("Order status updated successfully");
            } catch (error) {
                console.error("Error while changing order status: ", error);
                // Handle error
            }
        };
        if (newStatus) {
            handleOrderStatus();
        }
    }, [params.id, newStatus]);

    const handleChangeStatus = (e) => {
        setNewStatus(e.target.value);
    };

    if (!order) {
        return <div>Loading...</div>;
    }


    return (
        <section className="content-main">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="content-header">
                    <Link to="/orders" className="btn btn-danger text-white"> Back to Order List</Link>
                </div>

                <div className="content-header">
                    <Link to="/" className="btn btn-danger text-white"> Back to Latest Order</Link>
                </div>
            </div>

            <div className="card">
                <header className="card-header p-3 Header-green">
                    <div className="col-lg-6 col-md-6">
                        <span>
                            <i className="far fa-calendar-alt mx-2"></i>
                            <b className="text-black">First Order Date: {new Date(order.createdAt).toLocaleDateString()}</b>
                            <br />
                            <i className="far fa-calendar-alt mx-2"></i>
                            <b className="text-black">Latest Order Date: {new Date(order.updatedAt).toLocaleDateString()}</b>
                            <br />
                            <i className="fa fa-shopping-cart mx-2"></i>
                            <small className="text-black">Order ID: {params.id}</small>
                        </span>
                    </div>


                    <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-item-center">
                        <select className="form-select d-inline-block" style={{ maxWidth: "200px" }} value={newStatus || currentStatus} onChange={handleChangeStatus}>
                            <option value="">Change status</option>
                            <option value="process">Process</option>
                            <option value="waiting payment">Awaiting payment</option>
                            <option value="confirm">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>

                    </div>
                </header>
                <div className="card-body">

                    {/* Pass order data to OrderDetailInfo component */}
                    <OrderDetailInfo order={order}></OrderDetailInfo>

                    <div className="row">
                        <div className="col-lg-9">
                            <div className="table-responsive">
                                {/* Pass order data to OrderDetailProducts component */}
                                <OrderDetailProducts order={order}></OrderDetailProducts>
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
