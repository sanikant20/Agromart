// import React, { useEffect, useState } from "react";

// const OrderDetailInfo = ({ order }) => {

//     const [shipping, setShipping] = useState({}); 

//     useEffect(() => {
//         const getShippingDetail = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/shippingDetail/${order.userId}`);
//                 if (!response.ok) {
//                     throw new Error("Error in fetching API");
//                 }
//                 const result = await response.json();
//                 setShipping(result.response); // Set the response object directly
//                 console.log("Shipping data:", result.response);
//             } catch (error) {
//                 console.log("Error fetching shipping detail:", error.message);
//             }
//         };
//         if (order) {
//             getShippingDetail();
//         }
//     }, [order]);

//     return (
//         <div className="row mb-5 order-info-wrap">
//             {/* Display shipping details */}
//             <div className="col-md-6 col-lg-4">
//                 <article className="icontext align-items-start">
//                     <span className="icon icon-sm rounded-circle alert-success">
//                         <i className="text-success fas fa-user"></i>
//                     </span>
//                     <div className="text">
//                         <h6 className="mb-1"> <b>Customer:</b> </h6>
//                         <p className="mb-1">Name: {shipping.userName}</p>
//                     </div>
//                 </article>
//             </div>

//             <div className="col-md-6 col-lg-4">
//                 <article className="icontext align-items-start">
//                     <span className="icon icon-sm rounded-circle alert-success">
//                         <i className="text-success fas fa-truck-moving"></i>
//                     </span>

//                     <div className="text">
//                         <h6 className="mb-1"><b>Shipping Detail:</b> </h6>
//                         <p className="mb-1">
//                             Country: {shipping.country} <br />
//                             City: {shipping.city} <br />
//                             Postal Code: {shipping.postalCode} <br />
//                             Address: {shipping.address}
//                         </p>
//                     </div>
//                 </article>
//             </div>

//             <div className="col-md-6 col-lg-4">
//                 <article className="icontext align-items-start">
//                     <span className="icon icon-sm rounded-circle alert-success">
//                         <i className="text-success fas fa-calendar-alt"></i>
//                     </span>

//                     <div className="text">
//                         <h6 className="mb-1"><b>Shipping Date:</b></h6>
//                         <p className="mb-1">
//                             Created At: {new Date(shipping.createdAt).toLocaleDateString()} <br />
//                             Updated At: {new Date(shipping.updatedAt).toLocaleDateString()}
//                         </p>
//                     </div>
//                 </article>
//             </div>
//         </div>
//     );
// };

// export default OrderDetailInfo;

import React, { useEffect, useState } from "react";

const OrderDetailInfo = ({ order }) => {

    const [shipping, setShipping] = useState({});
    const [shippingError, setShippingError] = useState(false); // State to track if shipping details not available

    useEffect(() => {
        const getShippingDetail = async () => {
            try {
                // Extract user ID from the order prop
                const userId = order && order.user_id; // Use 'user_id' instead of 'userId'
                if (!userId) {
                    throw new Error("User ID not found in order data");
                }
                const response = await fetch(`http://localhost:5000/api/shippingDetail/${userId}`);
                if (!response.ok) {
                    throw new Error("Error in fetching API");
                }
                const result = await response.json();
                if (result.success) {
                    setShipping(result.response); // Set the response object directly
                    console.log("Shipping data:", result.response);
                } else {
                    setShippingError(true); // Set the shipping error flag
                }
            } catch (error) {
                console.log("Error fetching shipping detail:", error.message);
                setShippingError(true); // Set the shipping error flag
            }
        };
        // Check if order is not null or undefined before fetching shipping details
        if (order) {
            getShippingDetail();
        }
    }, [order]);

    return (
        <div className="row mb-5 order-info-wrap">
            {/* Display shipping details if available */}
            {!shippingError ? (
                <>
                    <div className="col-md-6 col-lg-4">
                        <article className="icontext align-items-start">
                            <span className="icon icon-sm rounded-circle alert-success">
                                <i className="text-success fas fa-user"></i>
                            </span>
                            <div className="text">
                                <h6 className="mb-1"> <b>Customer:</b> </h6>
                                <p className="mb-1">Name: {shipping.userName}</p>
                            </div>
                        </article>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <article className="icontext align-items-start">
                            <span className="icon icon-sm rounded-circle alert-success">
                                <i className="text-success fas fa-truck-moving"></i>
                            </span>

                            <div className="text">
                                <h6 className="mb-1"><b>Shipping Detail:</b> </h6>
                                <p className="mb-1">
                                    Country: {shipping.country} <br />
                                    City: {shipping.city} <br />
                                    Postal Code: {shipping.postalCode} <br />
                                    Address: {shipping.address}
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <article className="icontext align-items-start">
                            <span className="icon icon-sm rounded-circle alert-success">
                                <i className="text-success fas fa-calendar-alt"></i>
                            </span>

                            <div className="text">
                                <h6 className="mb-1"><b>Shipping Date:</b></h6>
                                <p className="mb-1">
                                    Created At: {new Date(shipping.createdAt).toLocaleDateString()} <br />
                                    Updated At: {new Date(shipping.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </article>
                    </div>
                </>
            ) : (
                // Display message if shipping details not available
                <div className="col-12 text-center">
                    <p style={{ fontWeight: 'bold', color: 'red' }}>Shipping details not available for this user.</p>
                </div>
            )}
        </div>
    );
};

export default OrderDetailInfo;

