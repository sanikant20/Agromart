import React, { useEffect, useState } from "react";

const TopTotal = () => {
    const [totalUsers, setTotalUsers] = useState('');
    const [totalOrders, setTotalOrders] = useState('');
    const [totalProducts, setTotalProducts] = useState('');
    const [totalCategory, setTotalCategory] = useState('');

    // Fetch api to get total users
    useEffect(() => {
        const getTotalUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                if (!response.ok) {
                    throw new Error("Error while fetching users data");
                }
                const result = await response.json();
                setTotalUsers(result.totalUsers);
            } catch (error) {
                console.error("Error in fetching users data.");
            }
        };
        getTotalUsers();
    }, []);

    // Fetch api to get total orders
    useEffect(() => {
        const getTotalOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/allOrderData");
                if (!response.ok) {
                    throw new Error("Error in fetching orders...");
                }
                const result = await response.json();
                setTotalOrders(result.totalOrders);
            } catch (error) {
                console.error(error);
            }
        };
        getTotalOrders();
    }, []);

    // Fetch api to get total products
    useEffect(() => {
        const getTotalProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                setTotalProducts(result.totalProducts);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
        getTotalProducts();
    }, []);

    // Fetch api to get total category
    useEffect(() => {
        const getTotalCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/category");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                setTotalCategory(result.totalCategory);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
        getTotalCategories();
    }, []);

    return (
        <div className="row">
            {/* Div to display total users */}
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-primary">
                            <i className="text-primary fas fa-user"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Users</h6>
                            <span>{totalUsers > 0 ? totalUsers : 0}</span>
                        </div>
                    </article>
                </div>
            </div>
    
            {/* Div to display total orders */}
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-success">
                            <i className="text-success fas fa-shopping-bag"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Orders</h6>
                            <span>{totalOrders > 0 ? totalOrders : 0}</span>
                        </div>
                    </article>
                </div>
            </div>
    
            {/* Div to display total category */}
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-warning">
                            <i className="text-info fas fa-warehouse"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Categories</h6>
                            <span>{totalCategory > 0 ? totalCategory : 0}</span>
                        </div>
                    </article>
                </div>
            </div>
    
            {/* Div to display total products */}
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-warning">
                            <i className="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Products</h6>
                            <span>{totalProducts > 0 ? totalProducts : 0}</span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default TopTotal;
