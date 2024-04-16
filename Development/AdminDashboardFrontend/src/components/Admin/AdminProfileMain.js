import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AdminProfileMain = () => {
    const [user, setUser] = useState('');
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
            <section className="content-main">
                <form>
                    <div className="content-header d-flex justify-content-center">
                        <h2 className="content-title">Admin Profile</h2>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <div className="row mb-3 align-items-center">
                                        <div className="col-md-3">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                defaultValue={user.name}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3 align-items-center">
                                        <div className="col-md-3">
                                            <label htmlFor="address" className="form-label">Address:</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                defaultValue={user.location}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3 align-items-center">
                                        <div className="col-md-3">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                defaultValue={user.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="content-header">
                                            <Link to={`/editAdminInfo/${userID}`} className="btn btn-success text-white"> Edit Profile</Link>
                                        </div>

                                        <div className="content-header">
                                            <Link to={`/changePassword/${userID}`} className="btn btn-success text-white">Change Password</Link>
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
