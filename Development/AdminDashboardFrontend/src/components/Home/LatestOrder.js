import React from "react";
import { Link } from "react-router-dom";

const LatestOrder = () => {
    return (
        <div className="card-body">
            <h5 className="card-title">Latest Order</h5>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        {/* For Paid */}
                        <tr>
                            <td>
                                <b>User</b>
                            </td>
                            <td>admin@gmai.com</td>
                            <td>price $2342</td>

                            <td>
                                <span className="badge rounded-pill alter-success">
                                    Paid At today at 2:53 PM
                                </span>
                            </td>
                            <td>Today at 4:00 AM</td>
                            <td className="d-flex justify-content-end align-item-center">
                                <Link to={`/Order`} className="text-success">
                                    <i className="fas fa-eye"></i>
                                </Link>
                            </td>
                        </tr>

                        {/* For Not Paid */}
                        <tr>
                            <td>
                                <b>User</b>
                            </td>
                            <td>admin@gmai.com</td>
                            <td>price $2342</td>

                            <td>
                                <span className="badge rounded-pill alter-danger">
                                    Created At today at 2:53 PM
                                </span>
                            </td>
                            <td>Today at 4:00 AM</td>
                            <td className="d-flex justify-content-end align-item-center">
                                <Link to={`/Order`} className="text-danger">
                                    <i className="fas fa-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default LatestOrder;