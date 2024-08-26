import React, { useEffect } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear('token');
        console.log("Logout successful.");
        navigate('/login');
    }

    // getting the userID from the local storage
    var userID = JSON.parse(window.localStorage.getItem("user"))._id;

    // Dropdown toggle handler
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
            <div className="col-nav ms-auto">
                <ul className="nav d-flex align-items-center">
                    <li className="dropdown nav-item" style={{ marginRight: "130px" }}>
                        <Link
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            style={{ color: 'black', fontWeight: 'bold' }}>
                            Setting
                        </Link>

                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to={`/adminProfile/` + userID}>Profile</Link>
                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </header>

    );
};

export default Header;
