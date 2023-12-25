import React, { useEffect } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        console.log("Logout successfull.", localStorage.removeItem('token'))
        navigate('/login');
    }

    useEffect(() => {
        const handleDropdownToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const dropdownToggle = e.currentTarget;
            const dropdownMenu = dropdownToggle.nextElementSibling;

            if (dropdownMenu) {
                dropdownMenu.classList.toggle("show");
            }
        };

        $('[data-bs-toggle="dropdown"]').on("click", handleDropdownToggle);

        return () => {
            $('[data-bs-toggle="dropdown"]').off("click", handleDropdownToggle);
        };
    }, []);

    return (
        <header className="main-header navbar">
            <div className="col-search" style={{ marginLeft: "15px" }}>
                <form className="searchform">
                    <div className="input-group">
                        <input
                            list="search_terms"
                            type="text"
                            className="form-control"
                            placeholder="Search here"
                        />
                        <button className="btn btn-light bg" type="button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <datalist id="search_terms">
                        <option value="products" />
                        <option value="add products" />
                        <option value="users" />
                        <option value="category" />
                        <option value="delete" />
                    </datalist>
                </form>
            </div>
            <div className="col-nav">
                <ul className="nav">
                    <li className="dropdown nav-item" style={{marginRight: "130px"}}>
                        <Link
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            to={"/adminprofile"}
                        >
                            <img
                                className="img-xs rounded-circle"
                                src="/images/profile1.jpg"
                                alt="user"
                            />
                        </Link>

                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to={'/AdminProfile'}>Profile</Link>

                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </header>

    );
};

export default Header;
