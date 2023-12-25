import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";


const MainProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        const getProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }

                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };

        // Call the function to fetch data
        getProducts();
    }, []);

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Products</h2>
                <div>
                    <Link to="/addProduct" className="btn btn-primary">
                        Add New Product
                    </Link>
                </div>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input type="search" placeholder="Search..." className="form-control p-2" />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>All Category</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Latest Order</option>
                                <option>Most viewed</option>
                                <option>Cheap price</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">

                    <div className="row">

                        {products.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}

                        <nav className="float-end mt-4" aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <Link className="page-link" to="#">
                                        Previous
                                    </Link>
                                </li>
                                <li className="page-item active">
                                    <Link className="page-link" to="#">
                                        1
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">
                                        2
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">
                                        3
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">
                                        Next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MainProducts;