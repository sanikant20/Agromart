// import React from "react";
// import { Link } from "react-router-dom";

// const Product = ({ product }) => {

//   const deleteProduct = async () => {

//     const isConfirmed = window.confirm("Are you sure you want to delete this product?")

//     if (!isConfirmed) {
//       return;
//     }

//     try {
//       let result = await fetch(`http://localhost:5000/api/products/${product._id}`,
//         {
//           method: 'DELETE'
//         }
//       );
//       result = await result.json();

//       if (!result.ok) {
//         window.location.reload();
//       } else {
//         console.error("Error while deleting product");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
//       <div className="card card-product-grid shadow-sm">
//         <Link to="#" className="img-wrap">

//           <img
//             src={product.image}
//             // src={`data:image/png;base64,${product.image}`}
//             alt={product.name}
//             className="img-fluid product-image"
//           />

//         </Link>

//         <div className="card-body">
//           <Link to="#" className="title text-truncate product-name">
//             {product.name}
//           </Link>

//           <div className="price mb-2">NPR {product.price}</div>

//           <div className="row mt-3">
//             <div className="col-6">
//               <Link
//                 to={`/product/${product._id}`}
//                 className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-center p-2 pb-3 w-100"
//               >
//                 <i className="fas fa-pen me-2">Edit</i>
//               </Link>
//             </div>

//             <div className="col-6">
//               <button
//                 to="#"
//                 className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 pb-3 w-100"
//                 onClick={deleteProduct}
//               >
//                 <i className="fas fa-trash-alt me-2">Delete</i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
