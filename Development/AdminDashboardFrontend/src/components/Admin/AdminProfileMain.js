import React from "react";
import { Link } from "react-router-dom";

const AdminProfileMain = () => {
    return (
        <div className="container mt-5" style={{ margin: "20px", padding: "20px" }}>
            <h2 className="mb-4">Admin Profile</h2>
            <div className="row">

                {/* Image at top center */}
                <div className="col-md-12 text-center mb-4">
                    <img
                        src="/images/profile1.jpg"
                        alt="Admin Profile"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "150px" }} // Adjust the size as needed
                    />
                </div>

                {/* Admin Information Form */}
                <div className="col-md-6 d-flex align-items-center">
                    <form className="w-100">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="name" value="Priya" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input type="text" className="form-control" id="address" value="Kalimati" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="email" value="priya@gmail.com" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input type="text" className="form-control" id="date" value="2023" readOnly />
                        </div>
                        
                        <Link to="/editAdminInfo" className="btn btn-success ms-2">
                            <i className="fas fa-edit me-2"></i>Edit Profile
                        </Link>
                    </form>
                </div>

                {/* Additional Information */}
                <div className="col-md-6">
                    {/* Add any additional information here */}
                </div>

            </div>
        </div>
    );
};

export default AdminProfileMain;
