import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailProducts = () => {
    const [order, setOrder] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://192.168.56.1:5000/api/singleOrderData/${params.id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch order data");
                }
                const result = await response.json();
                console.log("Order data:", result);
                setOrder(result);
            } catch (error) {
                console.error("Error fetching order data:", error.message);
                alert("No order available!");
            }
        };

        fetchOrderData();
    }, [params.id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    // Payment 
    const subTotal = order.products.reduce((total, item) => total + (item.quantity * item.price), 0);

    return (
        <div>
            <table key={order._id} className="table border table-lg mb-4">
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Product</th>
                        <th style={{ width: "20%" }}>Unit Price</th>
                        <th style={{ width: "20%" }}>Quantity</th>
                        <th style={{ width: "20%" }} className="text-end">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>Rs {product.price}</td>
                            <td>{product.quantity}</td>
                            <td className="text-end">Rs {product.price * product.quantity}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4">
                            <article className="float-end">
                                <dl className="dlist">
                                    <dt className="dlist-term">Grand Total:</dt>
                                    <dd className="dlist-description"><b>Rs {subTotal}</b></dd>
                                </dl>
                                <dl className="dlist">
                                    <dt className="dlist-term text-muted">Status:</dt>
                                    <dd className="dlist-description">
                                        <span className={`badge rounded-pill ${order.payment.status === 'Paid' ? 'alert-success text-success' : 'alert-warning text-warning'}`}>
                                            {order.payment.status === 'Paid' ? 'Payment done' : 'Payment pending'}
                                        </span>
                                    </dd>
                                </dl>
                            </article>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailProducts;
