import React from "react";
import { Link } from "react-router-dom";

const CategoryTable = () => {
    return (
        <div className="col-md-12 col-lg-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""></input>
                            </div>
                        </th>
                        <th>ID</th>
                        <th>name</th>
                        <th>Description</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""></input>
                            </div>
                        </td>
                        <td>1</td>
                        <td><b>Tools</b></td>
                        <td>Agricultural tool</td>
                        <td className="text-end">
                            <div className="dropdown">
                                <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                                    <i className="fas fa-ellipsis-h"></i>
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="#">Edit info</Link>
                                    <Link className="dropdown-item text-danger" to="#">Delete</Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default CategoryTable;
