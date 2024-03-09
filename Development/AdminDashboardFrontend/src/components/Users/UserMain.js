import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import TopTotal from "../Home/TopTotal";

const UserMain = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async (req, resp) => {
            try {
                let response = await fetch("http://localhost:5000/api/users");

                if (!response.ok) {
                    throw new Error("Error while fetching users data")
                }

                const result = await response.json();
                setUsers(result);
                // setTotalUsers(result.length);
            } catch (error) {
                console.error("Error in fetching users data.")
            }
        }
        getUsers();
    }, [])

    return (
        <section className="content-main">
            {/* <TopTotal totalUsers= {users.length}  /> */}

            <div className="content-header">
                <h2 className="content-title">Customer</h2>  
            </div>

            <div className="card mb-4">
                <header className="card-header">
                    <div className="row gx-3">


                        <div className="col-lg-4 col-md-6 me-auto">
                            <input type="text" placeholder="Search..." className="form-control" />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-control">
                                <option>Status:</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </div>
                    </div>
                </header>

                {/* Card for user*/}

                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">

                        {users.map((user) => (
                            <div className="col mb-3">
                                <div className="card card-user shadow-sm p-2">                             
                                    <div className="card-body">
                                        <h5 className="card-title mt-5">Role: {user.role}</h5>
                                        <div className="card-title text-muted">
                                            <p className="m-0">Name: {user.name}</p>
                                            <p>Email:
                                                <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                                    {user.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-between">
                                    <Link to={`/userDetails/${user._id}`} className="btn btn-primary text-white mr-2">
                                        View Details
                                    </Link>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Pagination */}
                    <nav className="float-end mt-4" aria-label="page navigation">
                        <ul className="pagination">
                            <li className="page-item disable">
                                <Link className="page-link" to="#">Previous</Link>
                            </li>
                            <li className="page-item active">
                                <Link className="page-link" to="#">1</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">Next</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </section >
    );
};
export default UserMain;
