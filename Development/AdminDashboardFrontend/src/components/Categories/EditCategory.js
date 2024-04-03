import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    // Fetched with api to get category details of single category.
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                let response = await fetch(`http://localhost:5000/api/category/${params.id}`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch category details. Status: ${response.status}`)
                }
                let data = await response.json();
                console.log(data);

                setCategoryName(data.categoryName);
                setDescription(data.description);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.error("Network error. Please check your internet connection.", error);
                } else {
                    console.error("Error fetching product details:", error.message);
                }
            }

        };
        getCategoryDetails();
    }, [params.id])


    // Fetched with api to update the category details
    const updateCategory = async () => {
        try {
            const update = await fetch(`http://localhost:5000/api/category/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ categoryName, description }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (update.ok) {
                let updated = await update.json();
                console.log(updated)
                alert("Category Updated successfully.")
                navigate("/categories")
            } else {
                console.error("Failed to update category.")
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Network error. Please check your internet connection.", error);
            } else {
                console.error("Error fetching product details:", error.message);
            }
        }

    }



    return (
        <div>
            <section className="content-main">
                <form>
                    <div className="content-header d-flex justify-content-center">
                        <h2 className="content-title">Edit Category</h2>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-3 row align-items-center">
                                        <label htmlFor="Category_Name" className="col-sm-4 col-form-label">
                                            Category Name
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                placeholder="category name"
                                                className="form-control"
                                                id="Category_Name"
                                                defaultValue={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                                style={{ textAlign: 'left' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="Category_description" className="col-sm-4 col-form-label">
                                            Description
                                        </label>
                                        <div className="col-sm-8">
                                            <textarea
                                                placeholder="Write description"
                                                className="form-control"
                                                id="Category_description"
                                                defaultValue={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows="3"
                                                style={{ textAlign: 'left' }}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="mb-3 d-flex justify-content-between">
                                        <Link to="/categories" className="btn btn-danger text-white">
                                            Go to Category
                                        </Link>
                                        <button type="button" onClick={updateCategory} className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </section>
        </div>
    );
}

export default EditCategory;
