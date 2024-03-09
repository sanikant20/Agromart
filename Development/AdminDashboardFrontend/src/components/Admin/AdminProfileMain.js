import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AdminProfileMain = () => {
    const [user, setUser] = useState('');
    // const [userImage, setUserImage] = useState(null);

    const params = useParams();

    // getting the userID from the local storage
    var userID = JSON.parse(window.localStorage.getItem("user"))._id;

    useEffect(() => {
        const fetchUserProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/adminProfile/${params.id}`);

                if (!response.ok) {
                    throw new Error("Error while fetching user data");
                }
                const userData = await response.json();
                setUser(userData)
                // setUserImage(userData.userImage);
            } catch (error) {
                console.error("Error fetching user profile data:", error.message);
            }
        };
        fetchUserProfileData();
    }, [params.id]);



    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">
                        <div style={{ alignContent: "center", alignItems: "center" }}>
                            <h2 className="content-title">Admin Profile</h2>
                        </div>
                    </div>
                    <div className="row">
                        {/* Profile image
                        <div className="col-md-12 mb-4">
                            {userImage && userImage.userImage ? (
                                <img
                                    // src={getImageSource()}
                                    alt="User Profile"
                                    className="img-fluid rounded-circle"
                                    style={{ maxWidth: '150px' }}
                                />
                            ) : (
                                <span>No profile image available</span>
                            )}
                        </div> */}
                        {/* Admin Information */}
                        <div className="row mt-4">
                            <div className="col-xl-8 col-lg-8">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                defaultValue={user.name}
                                                readOnly
                                                style={{ textAlign: 'left' }}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Address:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                defaultValue={user.location}
                                                readOnly
                                                style={{ textAlign: 'left' }}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                defaultValue={user.email}
                                                readOnly
                                                style={{ textAlign: 'left' }}

                                            />
                                        </div>
                                        <div>
                                            <Link to={`/editAdminInfo/${userID}`} className="btn btn-success ms-2">
                                                <i className="fas fa-edit me-2"></i>Edit Profile
                                            </Link>
                                            <Link to={`/changePassword/${userID}`} className="btn btn-success ms-2">
                                                <i className="fas fa-edit me-2"></i>Change Password
                                            </Link>
                                        </div>
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

export default AdminProfileMain;
