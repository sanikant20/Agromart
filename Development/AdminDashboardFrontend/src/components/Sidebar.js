import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <Link to="/" className="brand-wrap">
                        <img src="/logo.jpg"
                            className="logo"
                            alt="Agromart Logo "
                            style={{ height: "50px", width: "50px" }}
                        />
                    </Link>
                </div>

                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/"
                                exact={true}
                            >
                                <i className="icon fas fa-home"></i>
                                <span className="text">Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/products"
                                exact={true}
                            >
                                <i className="icon fas fa-shopping-bag"></i>
                                <span className="text">Products</span>
                            </NavLink>
                        </li>

                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/categories"
                                exact={true}
                            >
                                <i className="icon fas fa-warehouse"></i>
                                <span className="text">Categories</span>
                            </NavLink>
                        </li>

                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/orders"
                                exact={true}
                            >
                                <i className="icon fas fa-truck-moving"></i>
                                <span className="text">Orders</span>
                            </NavLink>
                        </li>

                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/users"
                                exact={true}
                            >
                                <i className="icon fas fa-user-circle"></i>
                                <span className="text">Users</span>
                            </NavLink>
                        </li>

                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/productReview"
                                exact={true}
                            >
                                <i className="icon fas fa-box-open"></i>
                                <span className="text">Product Review</span>
                            </NavLink>
                        </li>

                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>

        </div>
    );
}

export default Sidebar;