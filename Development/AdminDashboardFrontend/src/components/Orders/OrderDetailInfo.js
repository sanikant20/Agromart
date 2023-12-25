import React from "react";

const OrderDetailInfo = () => {
    return (
        <div className="row mb-5 order-info-wrap">
    <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
            <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-user"></i>
            </span>

            <div className="text">
                <h6 className="mb-1">Customer</h6>
                <p className="mb-1">User Sani</p>
            </div>
        </article>
    </div>

    <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
            <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-truck-moving"></i>
            </span>

            <div className="text">
                <h6 className="mb-1">Order info</h6>
                <p className="mb-1">
                    Shipping: Sani <br />Payment Method: E-Sewa
                </p>
            </div>
        </article>
    </div>

    <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
            <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-map-marker-alt"></i>
            </span>

            <div className="text">
                <h6 className="mb-1">Delivery Location</h6>
                <p className="mb-1">
                    Address: Kalanki
                    <br />
                    Bhalubhairav Mandir
                </p>
            </div>
        </article>
    </div>
</div>

    );
};

export default OrderDetailInfo;
