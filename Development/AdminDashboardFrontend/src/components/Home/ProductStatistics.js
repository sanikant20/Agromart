import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Component to display statistics of in-stock and out-of-stock products using a Doughnut chart.
const ProductsStatics = () => {
    // State variables to store the number of in-stock and out-of-stock products
    const [inStockProducts, setInstockProducts] = useState('');
    const [outStockProducts, setOutStockProducts] = useState('');

    useEffect(() => {

        //  Fetches the number of in-stock and out-of-stock products from the API.

        const getInOutStockProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/in-out-stock-products");

                if (!response.ok) {
                    throw new Error({ success: false, message: "Error fetching stock product API" });
                }

                const result = await response.json();
                console.log("In-Out-Stock-Products", result);
                setInstockProducts(result.inStockProductsNumber);
                setOutStockProducts(result.outOfStockProductsNumber);
            } catch (error) {
                console.log({ success: false, message: "Internal Server Error" });
            }
        };
        getInOutStockProducts();
    }, []);

    // Data for the Doughnut chart
    const data = {
        labels: ['In Stock Products', 'Out of Stock'],
        datasets: [{
            label: 'Number of Products',
            data: [inStockProducts, outStockProducts],
            backgroundColor: ['green', 'red'],
            borderColor: ['green', 'red']
        }]
    };

    // Options for the Doughnut chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Donut Chart shows in-stock and out-of-stock product',
            },
        },
    };

    return (
        <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
                <article className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">Products Statistics</h5>
                    {/* Rendering the Doughnut chart */}
                    <div style={{ width: "100%", height: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    </div>
                </article>
            </div>
        </div>

    );
};

export default ProductsStatics;
