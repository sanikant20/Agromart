import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = () => {
    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th style={{ width: "40%" }}>Product</th>
                    <th style={{ width: "20%" }}>Unit Price</th>
                    <th style={{ width: "20%" }}>Quantity</th>
                    <th style={{ width: "20%" }} className="text-end">Total</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <Link className="itemside" to="#">
                            <div className="left">
                                <img
                                    src="/images/1 logo.jpg"
                                    alt="Product"
                                    style={{ width: "40px", height: "40px" }}
                                    className="img-xs"
                                />
                            </div>
                            <div className="info">AGRO GEM RED KING ONION – 1KG</div>
                        </Link>
                    </td>
                    <td>$453</td>
                    <td>3</td>
                    <td className="text-end">$3425</td>
                </tr>

                <tr>
                    <td colSpan="4">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt>Subtotal:</dt>
                                <dd>$2,342</dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Shipping cost:</dt>
                                <dd>$20</dd>
                            </dl>

                            <dl className="dlist">
                                <dt>Grand Total:</dt>
                                <dd>
                                    <b>$4,342</b>
                                </dd>
                            </dl>

                            <dl className="dlist">
                                <dt className="text-muted">Status:</dt>
                                <dd>
                                    <span className="badge rounded-pill alert-success text-success">
                                        Payment done
                                    </span>
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>

    );
};

export default OrderDetailProducts;
