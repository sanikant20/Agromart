import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserMain = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;  

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                if (!response.ok) {
                    throw new Error("Error while fetching users data");
                }
                const result = await response.json();
                const newUser = result.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUsers(newUser);
            } catch (error) {
                console.error("Error in fetching users data.");
            }
        };
        getUsers();
    }, []);

    const HandleUserSearch = async (event) => {
        try {
            const key = event.target.value;
            if (key) {
                const response = await fetch(`http://localhost:5000/api/searchUser/${key}`);
                if (!response.ok) {
                    throw new Error("Error in fetching API");
                }
                const result = await response.json();
                setUsers(result);
            }else{
                const response = await fetch("http://localhost:5000/api/users");
                if (!response.ok) {
                    throw new Error("Error while fetching users data");
                }
                const result = await response.json();
                setUsers(result.users);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while searching: " + error.message);
        }
    };

    // Logic to paginate users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">User's</h2>
            </div>

            <div className="card mb-4">
                <header className="card-header">
                    <div className="row gx-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="form-control p-2"
                                onChange={HandleUserSearch}
                            />
                        </div>
                        <div onChange={HandleUserSearch} className="col-lg-2 col-6 col-md-3">
                            <select className="form-control">
                                <option value=''>All User:</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </div>
                    </div>
                </header>

                {/* Card for user*/}
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <div className="col mb-3" key={user._id}>
                                    <div className="card card-user shadow-sm p-2">
                                        <div className="card-body">
                                            <h5 className="card-title">Role: {user.role}</h5>
                                            <div className="card-title text-muted">
                                                <p className="m-0">Name: {user.name}</p>
                                                <p className="m-0">Email: {user.email}</p>
                                                {/* <p>Email:
                                                    <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                                        {user.email}
                                                    </a>
                                                </p> */}
                                            </div>
                                        </div>
                                        <div className="mb-3 d-flex justify-content-center">
                                            <Link to={`/userDetails/${user._id}`} className="btn btn-primary text-white mr-2">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <caption><b>No user available...</b></caption>
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
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                                <li className={`page-item ${currentPage === index + 1 && "active"}`} key={index}>
                                    <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) && "disabled"}`}>
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
export default UserMain;