import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

            } catch (error) {
                console.error("Error in fetching users data.")
            }

        }

        getUsers();

    }, [])

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Customer</h2>
                <div>
                    <Link to="#" className="btn btn-primary">
                        <i className="material-icons md-plus"></i>
                        Create New
                    </Link>
                </div>
            </div>

            <div className="card mb-4">
                <header className="card-header">
                    <div className="row gx-3">


                        <div className="col-lg-4 col-md-6 me-auto">
                            <input type="text" placeholder="Search..." className="form-control" />
                        </div>

                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-control">
                                <option>Show 20</option>
                                <option>Show 30</option>
                                <option>Show 40</option>
                                <option>Show all</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-control">
                                <option>Status: all</option>
                                <option>Active only</option>
                                <option>Disable</option>
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
                                    <div className="card-header text-center">
                                        <img className="img-md img-avatar" src="/images/profile2.jpeg" alt="Admin pic" />
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title mt-5">{user.role}</h5>
                                        <div className="card-title text-muted">
                                            <p className="m-0">{user.name}</p>
                                            <p>
                                                <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                                    {user.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        {/* User card */}
                        {/* <div className="col">
                            <div className="card card-user shadow-sm">
                                <div className="card-header">
                                    <img className="img-md img-avatar" src="/images/1 logo.jpg" alt="User pic" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mt-5">User</h5>
                                    <div className="card-text text-muted">
                                        <p className="m-0">Customer</p>
                                        <p>
                                            <a href="mailto:user@gmail.com" target="_blank" rel="noopener noreferrer">
                                                user@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
