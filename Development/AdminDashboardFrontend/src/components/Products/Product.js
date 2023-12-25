import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card card-product-grid shadow-sm">
        <Link to="#" className="img-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid product-image"
          />
        </Link>

        <div className="card-body">
          <Link to="#" className="title text-truncate product-name">
            {product.name}
          </Link>

          <div className="price mb-2">${product.price}</div>

          <div className="row mt-3">
            <div className="col-6">
              <Link
                // to={`/product/${product._id}/edit`}
                to={"/EditProduct"}
                className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-center p-2 pb-3 w-100"
              >
                <i className="fas fa-pen me-2"></i> Edit
              </Link>
            </div>

            <div className="col-6">
              <Link
                to="#"
                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 pb-3 w-100"
              >
                <i className="fas fa-trash-alt me-2"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
