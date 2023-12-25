import React from "react";

const TopTotal = () => {
    return (
        <div className="row">

            {/* <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alter-primary">
                            <i class="text-primary fas fa-dollar-sign"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1"> Total Sales</h6>
                            <span>$43,432</span>
                        </div>
                    </article>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alter-success">
                            <i class="text-success fas fa-shopping-bag"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1"> Total Orders</h6>
                            <span>32</span>
                        </div>
                    </article>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alter-warning">
                            <i class="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1"> Total Products</h6>
                            <span>20</span>
                        </div>
                    </article>
                </div>
            </div> */}

            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-primary">
                            <i className="text-primary fas fa-dollar-sign"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Sales</h6>
                            <span>$43,432</span>
                        </div>
                    </article>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-success">
                            <i className="text-success fas fa-shopping-bag"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Orders</h6>
                            <span>32</span>
                        </div>
                    </article>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext d-flex align-items-center justify-content-center">
                        <span className="icon icon-sm rounded-circle alter-warning">
                            <i className="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text ms-2">
                            <h6 className="mb-1">Total Products</h6>
                            <span>20</span>
                        </div>
                    </article>
                </div>
            </div>


        </div>
    )
}

export default TopTotal;