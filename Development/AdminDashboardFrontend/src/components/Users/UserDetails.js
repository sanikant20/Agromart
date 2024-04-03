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
            <section className="content-main">
                <form>
                    <div className="content-header d-flex justify-content-center">
                        <h2 className="content-title">User Detail</h2>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="admin_name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                                id="admin_name"
                                                value={users.name}
                                                style={{ textAlign: 'left' }}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="admin_role" className="form-label">
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Role"
                                                className="form-control"
                                                id="admin_role"
                                                value={users.role}
                                                readOnly
                                                style={{ textAlign: 'left' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="address" className="form-label">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                className="form-control"
                                                id="address"
                                                value={users.location}
                                                readOnly
                                                style={{ textAlign: 'left' }}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                className="form-control"
                                                id="email"
                                                value={users.email}
                                                readOnly
                                                style={{ textAlign: 'left' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <Link to={`/users/`} className="btn btn-danger text-white">
                                                Go Back
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
}

export default UserDetail;
