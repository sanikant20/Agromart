import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    // Fetched with API to list all categories in table
    useEffect(() => {
        const getCategory = async () => {
            try {
                let result = await fetch("http://localhost:5000/api/category");
                if (!result.ok) {
                    throw new Error("Error while fetching categories data");
                }
                let data = await result.json();
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error("Error in fetching categories", error);
            }
        };
        getCategory();
    }, []);

    const handleDelete = async (category) => {
        // Confirmation message
        const isConfirmed = window.confirm("Are you sure you want to delete this category?")

        if (!isConfirmed) {
            return;
        }

        try {
            let result = await fetch(`http://localhost:5000/api/delete/${category._id}`,
                {
                    method: "DELETE"
                }
            );
            result = await result.json();

            if (result) {
                window.alert("Category deleted successfully.");
                window.location.reload();
            } else {
                console.error("Error while deleting product");
            }

        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Network error. Please check your internet connection.", error);
            } else {
                console.error("Error fetching product details:", error.message);
            }
        }
    };


    return (
        <div className="col-md-12 col-lg-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category._id}</td>
                            <td><b>{category.categoryName}</b></td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/category/${category._id}`}>
                                    <i className="fas fa-pen" ></i>
                                </Link>

                                <Link>
                                    <i className="fas fa-trash" style={{ margin: "5px", padding: "2px", color: "red" }}
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            handleDelete(category)
                                        } }
                                    ></i>
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
