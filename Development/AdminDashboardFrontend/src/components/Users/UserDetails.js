import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetail = () => {

    const [users, setUsers] = useState([]);
    const params = useParams()

    useEffect(() => {

        const getUsers = async () => {
            try {
                let response = await fetch(`http://localhost:5000/api/userData/${params.id}`);

                if (!response.ok) {
                    throw new Error("Error while fetching users data")
                }

                const result = await response.json();
                setUsers(result);

            } catch (error) {
                console.error("Error in fetching users data.")
            }

        }

        getUsers();

    }, [params.id])

    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">

                        <h2 className="content-title">User Profile</h2>
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
                                            placeholder="Name"
                                            className="form-control"
                                            id="admin_name"
                                            value={users.name}
                                        // onChange={(e) => setName(e.target.value)}
                                        // readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="admin_role" className="form-label">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            className="form-control"
                                            id="admin_role"
                                            value={users.role}
                                            // onChange={(e) => setRole(e.target.value)}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            className="form-control"
                                            id="address"
                                            value={users.location}
                                        // onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="form-control"
                                            id="email"
                                            value={users.email}
                                        // onChange={(e) => setEmail(e.target.value)}
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
                                            value={users.image}
                                        // onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>
                                    <Link to={`/users/`} className="btn btn-danger text-white">
                                        Go Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </section>
        </div>
    );
}

export default UserDetail;
