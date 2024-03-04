import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopTotal from "../Home/TopTotal";

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

    const deleteProduct = async (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) {
            return;
        }

        try {
            let result = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'DELETE'
            });
            result = await result.json();

            if (!result.ok) {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            } else {
                console.error("Error while deleting product");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

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
                                <option>seeds</option>
                                <option>Fertilizers</option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    {/* <TopTotal totalProducts={products.length} /> */}
                    <div className="row">
                        {products.map((singleProduct) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={singleProduct._id}>
                                <div className="card card-product-grid shadow-sm">
                                    <Link to="#" className="img-wrap">
                                        {/* Rendering the image */}
                                        {singleProduct.image && singleProduct.image.data && (
                                            <img
                                                src={`data:image/png;base64,${Buffer.from(singleProduct.image.data.data).toString("base64")}`}
                                                alt={singleProduct.name}
                                                className="img-fluid product-image"
                                            />
                                        )}
                                    </Link>

                                    <div className="card-body">
                                        <Link to="#" className="title text-truncate product-name">
                                            {singleProduct.name}
                                        </Link>

                                        <div className="price mb-2">NPR {singleProduct.price}</div>

                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <Link
                                                    to={`/product/${singleProduct._id}`}
                                                    className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-center p-2 pb-3 w-100"
                                                >
                                                    <i className="fas fa-pen me-2">Edit</i>
                                                </Link>
                                            </div>

                                            <div className="col-6">
                                                <button
                                                    className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 pb-3 w-100"
                                                    onClick={() => deleteProduct(singleProduct._id)}
                                                >
                                                    <i className="fas fa-trash-alt me-2">Delete</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainProducts;
