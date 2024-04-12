import React, { useState } from 'react';

const ProductReview = () => {
    const [reviews, setReviews] = useState([]);

    const handleSearchProductReview = async (event) => {
        try {
            const key = event.target.value;
            if (key) {
                const response = await fetch(`http://localhost:5000/api/searchReview/${key}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch search results. Please try again later.");
                }
                const result = await response.json();
                setReviews(result);
            } else {
                setReviews([]); // Clear reviews when the input is empty
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-center">
                <h2 className="content-title">View Product Review</h2>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 col-lg-4">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="product_name" className="form-label">
                                      UserID/ProductID ||  Product/User Name:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="form-control py-3"
                                        id="product_name"
                                        style={{ textAlign: 'left' }}
                                        onChange={handleSearchProductReview}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <table className="table float-end">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Product Name</th>
                                        <th>Rate</th>
                                        <th>Review</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reviews.length === 0 ? (
                                        <tr>
                                            <td colSpan="7"><b>No review available...</b></td>
                                        </tr>
                                    ) : (
                                        reviews.map((review, index) => (
                                            <tr key={index}>
                                                <td>{review.userName}</td>
                                                <td>{review.productName}</td>
                                                <td>{review.rate}</td>
                                                <td>{review.review}</td>
                                                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductReview;
