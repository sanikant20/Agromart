import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {

    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <Link to="/" className="brand-wrap">
                        <img src="/images/1 logo.jpg"
                            className="logo"
                            alt="Agromart Dashboard Logo "
                            style={{ height: "100px", width: "100px" }}
                        />
                    </Link>
                    <div>
                        <button className="btn btn-icon btn-aside-minimize">
                            <i className="text-muted fas fa-stream"></i>
                        </button>
                    </div>
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

                        {/* <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/addProduct"
                                exact={true}
                            >
                                <i className="icon fas fa-plus-square"></i>
                                <span className="text">Add product</span>
                            </NavLink>
                        </li> */}


                        <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/category"
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

                        {/* <li className="menu-item">
                            <NavLink activeClassName="active"
                                className="menu-link"
                                to="/order"
                                exact={true}
                            >
                                <i className="icon fas fa-box-open"></i>
                                <span className="text">Orders Details</span>
                            </NavLink>
                        </li> */}

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

                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>

        </div>
    );
}

export default Sidebar;