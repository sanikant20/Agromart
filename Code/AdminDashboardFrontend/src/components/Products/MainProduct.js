import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                // Sort orders by createdAt date in descending order
                const newProduct = result.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProducts(newProduct);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
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
    };

    const HandleProductSearch = async (event) => {
        try {
            const key = event.target.value;
            if (key) {
                const response = await fetch(`http://localhost:5000/api/searchProduct/${key}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch search results. Please try again later.");
                }
                const result = await response.json();
                setProducts(result);
            } else {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Error while fetching products data");
                }
                const result = await response.json();
                setProducts(result.products);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    };

    // Logic to paginate products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                            <input
                                type="search"
                                placeholder="Search..."
                                className="form-control p-2"
                                onChange={HandleProductSearch}
                            />
                        </div>
                        <div onChange={HandleProductSearch} className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option value="">All Products</option>
                                <option>seeds</option>
                                <option>Fertilizer</option>
                                <option>Pesticides</option>
                                <option>Tools</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    <div className="row">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((singleProduct) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={singleProduct._id}>
                                    <div className="card card-product-grid shadow-sm">

                                        <Link to="#" className="img-wrap">
                                            {singleProduct.image && singleProduct.image.data && (
                                                <img
                                                    src={`data:image/png;base64,${Buffer.from(singleProduct.image.data.data).toString("base64")}`}
                                                    alt={singleProduct.name}
                                                    className="img-fluid product-image"
                                                    style={{ width: '500px', height: '500px' }}
                                                />
                                            )}
                                        </Link>

                                        <div className="card-body">
                                            <div className="product-details" style={{ width: '180px', overflowX: 'auto' }}>
                                                <div className="price mb-2" style={{ display: 'flex' }}>
                                                    <span style={{ flex: '1' }}>Name:</span>
                                                    <span style={{ flex: '2' }}>{singleProduct.name}</span>
                                                </div>
                                            </div>

                                            <div className="price mb-2">Price: Rs {singleProduct.price}</div>
                                            <div className="price mb-2">Qty: {singleProduct.quantity}</div>
                                            <div className="mb-1 d-flex justify-content-between">
                                                <Link to={`/product/${singleProduct._id}`} className="btn btn-success text-white">
                                                    <i className="fas fa-pen">Edit</i>
                                                </Link>
                                                <button type="button" onClick={() => deleteProduct(singleProduct._id)} className="btn btn-danger">
                                                    <i className="fas fa-trash-alt">Delete</i>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <caption>
                                <b>No product available...</b>
                            </caption>
                        )}
                    </div>

                    {/* Pagination */}
                    <nav className="float-end mt-4" aria-label="page navigation">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                                <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                                    Previous
                                </Link>
                            </li>
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                                <li className={`page-item ${currentPage === index + 1 && "active"}`} key={index}>
                                    <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) && "disabled"}`}>
                                <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default MainProducts;
