import React from "react";
import { Link } from "react-router-dom";

const AddProductMain = () => {
    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px", margin: "auto" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to Products
                        </Link>
                        <h2 className="content-title">Add Product</h2>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="product_title" className="form-label">
                                            Product Title
                                        </label>
                                        <input type="text" placeholder="Type here" className="form-control" id="product_title" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="product_price" className="form-label">
                                            Price
                                        </label>
                                        <input type="number" placeholder="Type here" className="form-control" id="product_price" required />
                                    </div>

                                    {/* Additional input for product_price */}
                                    <div className="mb-3">
                                        <label htmlFor="product_quantity" className="form-label">
                                            Quantity
                                        </label>
                                        <input type="number" placeholder="Type here" className="form-control" id="product_quantity" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_description" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Write description"
                                            className="form-control"
                                            id="product_description"
                                            rows="7"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_images" className="form-label">
                                            Images
                                        </label>
                                        <input className="form-control" type="text" placeholder="Enter Image URL" id="product_images" required />
                                        <input className="form-control mt-2" type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddProductMain;
