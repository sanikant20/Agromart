import { Link } from 'react-router-dom';

const React = require('react');

const EditAdminProfile = () => {
    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">
                        <Link to="/adminProfile" className="btn btn-danger text-white">
                            Go to Profile
                        </Link>
                        <h2 className="content-title">Update Profile</h2>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <div className="mb-3">

                                        <label htmlFor="admin_name" className="form-label">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="admin_name"
                                            //   value={productId.category}
                                            // readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="admin_role" className="form-label">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="admin_role"
                                        //   value={productId.name}
                                          readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="address"
                                        //   value={productId.price}
                                        //   readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="email"
                                        //   value={productId.quantity}
                                        //   required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="profile_image" className="form-label">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Image URL"
                                            className="form-control"
                                            id="profile_image"
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

export default EditAdminProfile;
