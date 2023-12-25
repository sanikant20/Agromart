import React from "react";
import { Link } from "react-router-dom";

const EditProduct = () => {
    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="content-title">Update Product</h2>
                        <button type="submit" className="btn btn-primary">
                            Publish now
                        </button>
                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="product_category" className="form-label">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_category"
                                            //   value={productId.category}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_name" className="form-label">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_name"
                                        //   value={productId.name}
                                        //   readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_price"
                                        //   value={productId.price}
                                        //   readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_quantity" className="form-label">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_quantity"
                                        //   value={productId.quantity}
                                        //   required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_weight" className="form-label">
                                            Weight
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_weight"
                                        //   value={productId.weight}
                                        //   required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_description" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Write description"
                                            className="form-control"
                                            id="product_description"
                                            //   value={productId.description}
                                            rows="5"
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_image" className="form-label">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Image URL"
                                            className="form-control"
                                            id="product_image"
                                        //   value={productId.image}
                                        //   required
                                        />
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

export default EditProduct;
