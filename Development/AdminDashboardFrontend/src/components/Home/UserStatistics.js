import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

// Registering chart elements with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Functional component for SaleStatistics
const SaleStatistics = () => {
    // State variables to hold total admin and total customer counts
    const [totalAdmin, setTotalAdmin] = useState('');
    const [totalCustomer, setTotalCustomer] = useState('');

    // Fetching total admin and total customer counts on component mount
    useEffect(() => {
        const getTotalAdminAndUser = async () => {
            try {
                // Fetching data from the backend API
                const response = await fetch("http://localhost:5000/api/total-admin-customer");
                if (!response.ok) {
                    throw new Error({ success: false, message: "Error in fetching total admin & user api" });
                }
                // Parsing response data
                const result = await response.json();
                console.log("Total admin - customer :", result);
                // Updating state with fetched data
                setTotalAdmin(result.totalAdmin);
                setTotalCustomer(result.totalCustomer);
            } catch (error) {
                console.log({ success: false, message: "Internal Server Error", error });
            }
        };
        // Calling the function to fetch data
        getTotalAdminAndUser();
    }, []);

    // Data for the bar chart
    const data = {
        labels: ['Admin', 'Customer'],
        datasets: [{
            label: 'Number of Users',
            data: [totalAdmin, totalCustomer],
            backgroundColor: ['green', 'blue'],
            borderColor: ['green', 'blue']
        }]
    };

    // Options for the bar chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart shows the number of admin and customer',
            },
        },
    };

    // Returning the JSX for the component
    return (
        <div className="col-xl-6 col-lg-12">
        <div className="card mb-4 shadow-sm">
            <article className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Users Statistics</h5>
                {/* Rendering the Bar chart */}
                <div style={{ width: "100%", height: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Bar
                        data={data}
                        options={options}
                        style={{ width: "100%", height: "350px", objectFit: "contain" }}
                    />
                </div>
            </article>
        </div>
    </div>
    
    );
};

export default SaleStatistics;
