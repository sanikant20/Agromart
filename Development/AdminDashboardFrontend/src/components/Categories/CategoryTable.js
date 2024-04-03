import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoryPerPage = 4; // Change for items on current page 

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/category");
                if (!response.ok) {
                    throw new Error("Error while fetching categories data");
                }
                const data = await response.json();
                setCategories(data.allCategory);
            } catch (error) {
                console.error("Error in fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (category) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
        if (!isConfirmed) {
            return;
        }

        try {
            let result = await fetch(`http://localhost:5000/api/delete/${category._id}`, {
                method: "DELETE"
            });
            result = await result.json();

            if (result) {
                // Remove deleted category from state
                setCategories(prevCategories => prevCategories.filter(cat => cat._id !== category._id));
            } else {
                console.error("Error while deleting category");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Logic to paginate categories
    const indexOfLastCategory = currentPage * categoryPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="col-md-12 col-lg-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Category Description</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentCategories.map((category) => (
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
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleDelete(category)
                                        }}
                                    ></i>
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav className="float-end mt-4" aria-label="page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                            Previous
                        </Link>
                    </li>
                    {Array.from({ length: Math.ceil(categories.length / categoryPerPage) }).map((_, index) => (
                        <li className={`page-item ${currentPage === index + 1 && "active"}`} key={index}>
                            <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Link>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(categories.length / categoryPerPage) && "disabled"}`}>
                        <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                            Next
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default CategoryTable;
