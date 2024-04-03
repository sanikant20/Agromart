import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestOrders = () => {
    const [latestOrders, setLatestOrders] = useState([]);

    useEffect(() => {
        fetchLatestOrders();
    }, []);

    const fetchLatestOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/allOrderData");
            if (!response.ok) {
                throw new Error("Error fetching orders...");
            }
            const result = await response.json();
            // Sort orders by createdAt date in descending order
            const sortedOrders = result.orderData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // Get the latest two orders
            const latestTwoOrders = sortedOrders.slice(0, 2);
            setLatestOrders(latestTwoOrders);
        } catch (error) {
            console.error(error);
            alert("Error fetching orders: " + error.message);
        }
    };

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.quantity * product.price), 0);
    };
    return (
        <div className="card-body">
            <h5 className="card-title">Latest Orders</h5>
            {latestOrders.length > 0 ? (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Customer Email</th>
                                <th scope="col">Total</th>
                                <th scope="col">Order Created At</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col" className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.user_email}</td>
                                    <td> Rs {calculateTotalPrice(order.products)}</td>
                                    <td>
                                        <span className="badge bg-info">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </span>
                                    </td>
                                    <td>
                                        {order.payment.status === 'Paid' ? (
                                            <span className="badge bg-success">
                                                {new Date(order.payment.paymentDate).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Not Paid
                                            </span>
                                        )}
                                    </td>

                                    <td className="d-flex justify-content-end align-item-center">
                                        <Link to={`/order/${order._id}`} className="text-success">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No latest orders available...</p>
            )}
        </div>
    );
};

export default LatestOrders;

