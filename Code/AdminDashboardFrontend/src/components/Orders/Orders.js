import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Date</th>
                    <th>Status</th>
                    <th scope="col" className="text-end">Action</th>
                </tr>
            </thead>
            <tbody>
                {/* For paid deliever */}
                <tr>
                    <td><b>AGRO GEM RED KING ONION – 1KG</b></td>

                    <td>user@example.com</td>
                    <td>$213</td>
                    <td>
                        <span className="nadge rounded-pill alter-success">Paid today at 2:32 AM</span>
                    </td>

                    <td>Nov 08 2023</td>
                    <td>
                        <span className="badge btn-success">Delivered</span>
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                        <Link to={`/order`} className="text-success">
                            <i className="fas fa-eye"></i>
                        </Link>
                    </td>
                </tr>


                {/* For not paid, not delivered */}
                <tr>
                    <td>
                        <b>AMRANTHUS (KGP) REMIK JYOTI 25 GM</b>
                    </td>
                    <td>user@example.com</td>
                    <td>$213</td>
                    <td>
                        <span className="nadge rounded-pill alter-danger">Not Paid</span>
                    </td>
                    <td>Nov 08 2023</td>
                    <td>
                        <span className="badge btn-danger">Not Delivered</span>
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                        <Link to={`/order`} className="text-success">
                            <i className="fas fa-eye"></i>
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Orders;
