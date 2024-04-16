import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/allOrderData");
                if (!response.ok) {
                    throw new Error("Error in fetching orders...");
                }
                const result = await response.json();

                const newOrder = result.orderData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(newOrder);

            } catch (error) {
                console.error(error);
            }
        };
        fetchOrderData();
    }, []);



    const renderOrderRow = (order) => {
        if (!order || !order.products || order.products.length === 0) {
            return null;
        }

        const total = order.products.reduce((total, item) => total + (item.quantity * item.price), 0);

        let paymentStatus = '';
        let paymentDateTime = '';

        if (order.payment && order.payment.status === 'Paid') {
            paymentStatus = 'Paid';
            paymentDateTime = new Date(order.payment.paymentDate).toLocaleString();
        } else {
            paymentStatus = 'Not Paid';
        }

        return (
            <tr key={order._id}>
                <td><b>{order.user_id}</b></td>
                <td>{order.user_email}</td>
                <td>Rs {total}</td>
                <td>
                    {paymentStatus === 'Paid' ? (
                        <span className="badge bg-success">Paid on {paymentDateTime}</span>
                    ) : (
                        <span className="badge bg-warning">Not Paid</span>
                    )}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                    <span className="badge btn-success">{order.orderStatus}</span>
                </td>
                <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                        <i className="fas fa-eye"></i>
                    </Link>

                </td>
            </tr>
        );
    };

    const handleOrderSearch = async (event) => {
        try {
            const key = event.target.value;
            if (key) {
                const response = await fetch(`http://localhost:5000/api/searchOrder/${key}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch search results. Please try again later.");
                }
                const result = await response.json();
                setOrders(result.response);
            } else {
                const response = await fetch("http://localhost:5000/api/allOrderData");
                if (!response.ok) {
                    throw new Error("Error in fetching orders while searching...");
                };
                const result = await response.json();
                // Sort orders by createdAt date in descending order
                const newOrder = result.orderData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(newOrder);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    };


    // Logic to paginate orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Orders</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="form-control p-2"
                                onChange={handleOrderSearch}
                            />
                        </div>

                        <div onChange={handleOrderSearch} className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option value=''>Order Status</option>
                                <option>process</option>
                                <option>waiting payment</option>
                                <option>confirm</option>
                                <option>shipped</option>
                                <option>delivered</option>
                            </select>
                        </div>
                        <div onChange={handleOrderSearch} className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option value=''>Paymenet Status</option>
                                <option>Paid</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Customer Email</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Date</th>
                                    <th>Order Status</th>
                                    <th scope="col" className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.length > 0 ? (
                                    currentOrders.map((order) => renderOrderRow(order))
                                ) : (
                                    <tr>
                                        <td colSpan="7"><b>No orders available...</b></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <nav className="float-end mt-4" aria-label="page navigation">
                    <ul className="pagination justify-content-end mb-3 mr-3">
                        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                                Previous
                            </Link>
                        </li>
                        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
                            <li className={`page-item ${currentPage === index + 1 && "active"}`} key={index}>
                                <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Link>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage) && "disabled"}`}>
                            <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                                Next
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default MainOrder;
